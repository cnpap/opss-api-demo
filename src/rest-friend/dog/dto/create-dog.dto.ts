import { z } from 'zod';

export const createDogSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateDogDto = z.infer<typeof createDogSchema>;
