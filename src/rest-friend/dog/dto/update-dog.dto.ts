import { z } from 'zod';

export const updateDogSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type UpdateDogDto = z.infer<typeof updateDogSchema>;
