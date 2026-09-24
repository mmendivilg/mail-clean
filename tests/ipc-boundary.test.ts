import { describe, expect, it, vi } from 'vitest';
import { SIMULATED_CONTEXT } from '../src/domain/ipc';
import { createFoundationHandler, type SenderIdentity } from '../src/main/ipc/handler';
import { createMailCleanApi } from '../src/preload/bridge';

const requestId = 'e91b1cd8-b264-4c92-9790-388a1f581487';
const allowedSender: SenderIdentity = {
  webContentsId: 7,
  frameUrl: 'file:///mail-clean/index.html',
  isMainFrame: true,
};

function createHandler(overrides: { ownsContext?: () => boolean | Promise<boolean> } = {}) {
  return createFoundationHandler({
    isAllowedSender: (sender) =>
      sender.webContentsId === 7 &&
      sender.frameUrl === 'file:///mail-clean/index.html' &&
      sender.isMainFrame,
    ownsContext: overrides.ownsContext ?? (() => true),
  });
}

function validRequest() {
  return {
    operation: 'foundation:get-status',
    requestId,
    context: SIMULATED_CONTEXT,
    query: { pageSize: 25 },
  };
}

describe('privileged IPC boundary', () => {
  it('rejects malformed and over-broad requests', async () => {
    const response = await createHandler()(allowedSender, {
      ...validRequest(),
      query: { pageSize: 10_000, unexpected: true },
    });

    expect(response).toEqual({
      ok: false,
      error: { code: 'INVALID_REQUEST', message: 'The request was rejected.', requestId },
    });
  });

  it('rejects unknown operations', async () => {
    const response = await createHandler()(allowedSender, {
      ...validRequest(),
      operation: 'shell:execute',
    });

    expect(response.ok).toBe(false);
    if (!response.ok) expect(response.error.code).toBe('INVALID_REQUEST');
  });

  it('rejects a context not owned by the active customer and session', async () => {
    const response = await createHandler({ ownsContext: () => false })(allowedSender, {
      ...validRequest(),
      context: { ...SIMULATED_CONTEXT, sessionId: 'another-session' },
    });

    expect(response.ok).toBe(false);
    if (!response.ok) expect(response.error.code).toBe('FORBIDDEN');
  });

  it.each([
    { ...allowedSender, webContentsId: 999 },
    { ...allowedSender, frameUrl: 'https://attacker.invalid' },
    { ...allowedSender, isMainFrame: false },
  ])('rejects an untrusted sender (%o)', async (sender) => {
    const response = await createHandler()(sender, validRequest());

    expect(response.ok).toBe(false);
    if (!response.ok) expect(response.error.code).toBe('FORBIDDEN');
  });

  it('sanitizes unexpected errors without leaking their text or stack', async () => {
    const response = await createHandler({
      ownsContext: () => {
        throw new Error('secret database path / customer subject');
      },
    })(allowedSender, validRequest());

    const serialized = JSON.stringify(response);
    expect(serialized).not.toContain('secret');
    expect(serialized).not.toContain('database path');
    expect(response).toEqual({
      ok: false,
      error: {
        code: 'INTERNAL',
        message: 'The operation could not be completed safely.',
        requestId,
      },
    });
  });

  it('completes one successful typed round trip through the preload bridge', async () => {
    const handler = createHandler();
    const invoke = vi.fn((request) => handler(allowedSender, request));
    const api = createMailCleanApi(invoke, () => requestId);

    const response = await api.foundation.getStatus({
      context: SIMULATED_CONTEXT,
      query: { pageSize: 25 },
    });

    expect(invoke).toHaveBeenCalledOnce();
    expect(response.ok).toBe(true);
    if (response.ok) {
      expect(response.data.mode).toBe('simulated');
      expect(response.data.capabilities).toEqual({
        nodeInRenderer: false,
        filesystemInRenderer: false,
        attachmentContentDownloaded: false,
      });
    }
  });
});
