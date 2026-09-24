import { z } from 'zod';

const identifier = z
  .string()
  .trim()
  .min(1)
  .max(128)
  .regex(/^[a-zA-Z0-9_-]+$/);

export const scopedContextSchema = z
  .object({
    customerId: identifier,
    sessionId: identifier,
    accountId: identifier,
  })
  .strict();

export const messageIdentitySchema = scopedContextSchema
  .extend({
    messageId: z.string().trim().min(1).max(256),
  })
  .strict();

export const boundedQuerySchema = z
  .object({
    pageSize: z.number().int().min(1).max(100).default(25),
    cursor: z.string().min(1).max(512).optional(),
  })
  .strict();

export const jobProgressSchema = z
  .object({
    phase: z.enum(['queued', 'discovering', 'review', 'applying', 'paused', 'complete', 'failed']),
    processed: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
    pending: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
    failed: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
    totalIsEstimate: z.boolean(),
    lastActivityAt: z.string().datetime(),
  })
  .strict();

export const foundationStatusRequestSchema = z
  .object({
    operation: z.literal('foundation:get-status'),
    requestId: z.string().uuid(),
    context: scopedContextSchema,
    query: boundedQuerySchema.default({ pageSize: 25 }),
  })
  .strict();

export const ipcRequestSchema = z.discriminatedUnion('operation', [foundationStatusRequestSchema]);

const navigationItemSchema = z
  .object({
    id: z.enum(['sessions', 'mailboxes', 'rules', 'review', 'attachments', 'jobs', 'reports']),
    label: z.string().min(1).max(40),
  })
  .strict();

export const foundationStatusSchema = z
  .object({
    productName: z.literal('Mail Clean'),
    mode: z.literal('simulated'),
    sessionLabel: z.string().min(1).max(100),
    mailboxLabel: z.string().min(1).max(254),
    navigation: z.array(navigationItemSchema).max(10),
    capabilities: z
      .object({
        nodeInRenderer: z.literal(false),
        filesystemInRenderer: z.literal(false),
        attachmentContentDownloaded: z.literal(false),
      })
      .strict(),
  })
  .strict();

export const safeErrorSchema = z
  .object({
    code: z.enum(['INVALID_REQUEST', 'FORBIDDEN', 'NOT_FOUND', 'INTERNAL']),
    message: z.string().min(1).max(160),
    requestId: z
      .string()
      .min(1)
      .max(64)
      .regex(/^[a-zA-Z0-9-]+$/),
  })
  .strict();

export const foundationStatusResponseSchema = z.discriminatedUnion('ok', [
  z.object({ ok: z.literal(true), data: foundationStatusSchema }).strict(),
  z.object({ ok: z.literal(false), error: safeErrorSchema }).strict(),
]);

export type ScopedContext = z.infer<typeof scopedContextSchema>;
export type MessageIdentity = z.infer<typeof messageIdentitySchema>;
export type BoundedQuery = z.input<typeof boundedQuerySchema>;
export type FoundationStatus = z.infer<typeof foundationStatusSchema>;
export type FoundationStatusResponse = z.infer<typeof foundationStatusResponseSchema>;
export type IpcRequest = z.infer<typeof ipcRequestSchema>;

export const IPC_CHANNEL = 'mail-clean:request' as const;

export const SIMULATED_CONTEXT: ScopedContext = {
  customerId: 'simulated-customer',
  sessionId: 'simulated-session',
  accountId: 'simulated-mailbox',
};
