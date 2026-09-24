import type { BoundedQuery, FoundationStatusResponse, ScopedContext } from './ipc';

export interface MailCleanApi {
  foundation: {
    getStatus(input: {
      context: ScopedContext;
      query?: BoundedQuery;
    }): Promise<FoundationStatusResponse>;
  };
}
