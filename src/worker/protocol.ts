import { z } from 'zod';

// Workers receive computation-only batches. They never receive credentials, filesystem handles,
// database connections, or arbitrary renderer messages.
export const workerRequestSchema = z.discriminatedUnion('kind', [
  z
    .object({
      kind: z.literal('classify-metadata'),
      jobId: z.string().min(1).max(128),
      items: z
        .array(
          z
            .object({
              messageKey: z.string().min(1).max(512),
              sender: z.string().max(512),
              subject: z.string().max(2_000),
              labelIds: z.array(z.string().max(128)).max(100),
            })
            .strict(),
        )
        .max(100),
    })
    .strict(),
]);

export type WorkerRequest = z.infer<typeof workerRequestSchema>;
