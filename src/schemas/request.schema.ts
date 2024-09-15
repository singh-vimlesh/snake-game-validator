import { z } from 'zod';
import { stateSchema, ticksSchema } from './game.schemas';

export const newGameQuerySchema = z.object({
  w: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 1, { message: 'Width must be greater than 0' }),
  h: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 1, { message: 'Height must be greater than 0' }),
});

export const validateGameBodySchema = z.object({
  state: stateSchema,
  ticks: ticksSchema,
});
