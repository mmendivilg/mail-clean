import {
  foundationStatusResponseSchema,
  ipcRequestSchema,
  type FoundationStatus,
  type FoundationStatusResponse,
  type ScopedContext,
} from '../../domain/ipc';

export interface SenderIdentity {
  webContentsId: number;
  frameUrl: string;
  isMainFrame: boolean;
}

export interface FoundationHandlerDependencies {
  isAllowedSender(sender: SenderIdentity): boolean;
  ownsContext(context: ScopedContext): boolean | Promise<boolean>;
}

const status: FoundationStatus = {
  productName: 'Mail Clean',
  mode: 'simulated',
  sessionLabel: 'Foundation demo session',
  mailboxLabel: 'demo@example.invalid',
  navigation: [
    { id: 'sessions', label: 'Sessions' },
    { id: 'mailboxes', label: 'Mailboxes' },
    { id: 'rules', label: 'Rules' },
    { id: 'review', label: 'Review' },
    { id: 'attachments', label: 'Attachments' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'reports', label: 'Reports' },
  ],
  capabilities: {
    nodeInRenderer: false,
    filesystemInRenderer: false,
    attachmentContentDownloaded: false,
  },
};

function requestIdFromUnknown(value: unknown): string {
  try {
    if (typeof value !== 'object' || value === null || !('requestId' in value))
      return 'unavailable';
    const requestId = Reflect.get(value, 'requestId');
    return typeof requestId === 'string' && /^[a-zA-Z0-9-]{1,64}$/.test(requestId)
      ? requestId
      : 'unavailable';
  } catch {
    return 'unavailable';
  }
}

function failure(
  code: 'INVALID_REQUEST' | 'FORBIDDEN' | 'NOT_FOUND' | 'INTERNAL',
  message: string,
  requestId: string,
): FoundationStatusResponse {
  return foundationStatusResponseSchema.parse({
    ok: false,
    error: { code, message, requestId },
  });
}

export function createFoundationHandler(dependencies: FoundationHandlerDependencies) {
  return async (sender: SenderIdentity, rawRequest: unknown): Promise<FoundationStatusResponse> => {
    const fallbackRequestId = requestIdFromUnknown(rawRequest);

    try {
      if (!dependencies.isAllowedSender(sender)) {
        return failure(
          'FORBIDDEN',
          'This renderer is not permitted to make requests.',
          fallbackRequestId,
        );
      }

      const parsed = ipcRequestSchema.safeParse(rawRequest);
      if (!parsed.success) {
        return failure('INVALID_REQUEST', 'The request was rejected.', fallbackRequestId);
      }

      const request = parsed.data;
      if (!(await dependencies.ownsContext(request.context))) {
        return failure(
          'FORBIDDEN',
          'The requested session or mailbox is not available.',
          request.requestId,
        );
      }

      switch (request.operation) {
        case 'foundation:get-status':
          return foundationStatusResponseSchema.parse({ ok: true, data: status });
      }
    } catch {
      return failure('INTERNAL', 'The operation could not be completed safely.', fallbackRequestId);
    }
  };
}
