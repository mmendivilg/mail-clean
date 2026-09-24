import type { MailCleanApi } from '../domain/api';
import {
  foundationStatusRequestSchema,
  foundationStatusResponseSchema,
  type IpcRequest,
} from '../domain/ipc';

export type InvokePrivileged = (request: IpcRequest) => Promise<unknown>;

export function createMailCleanApi(
  invoke: InvokePrivileged,
  createRequestId: () => string = () => globalThis.crypto.randomUUID(),
): MailCleanApi {
  return Object.freeze({
    foundation: Object.freeze({
      getStatus: async (input) => {
        const request = foundationStatusRequestSchema.parse({
          operation: 'foundation:get-status',
          requestId: createRequestId(),
          context: input.context,
          query: input.query ?? { pageSize: 25 },
        });
        return foundationStatusResponseSchema.parse(await invoke(request));
      },
    }),
  });
}
