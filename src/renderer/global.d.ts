import type { MailCleanApi } from '../domain/api';

declare global {
  interface Window {
    readonly mailClean: MailCleanApi;
  }
}

export {};
