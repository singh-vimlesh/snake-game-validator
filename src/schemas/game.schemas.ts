import { z } from 'zod';

// Snake validation schema
export const snakeSchema = z.object({
  x: z.number().int().min(0),
  y: z.number().int().min(0),
  velX: z.number().int().min(-1).max(1), // Valid velocity: -1, 0, 1
  velY: z.number().int().min(-1).max(1), // Valid velocity: -1, 0, 1
});

// Fruit validation schema
export const fruitSchema = z.object({
  x: z.number().int().min(0),
  y: z.number().int().min(0),
});

// State validation schema
export const stateSchema = z.object({
  gameId: z.string(),
  width: z.number().int().min(1),
  height: z.number().int().min(1),
  score: z.number().int().min(0),
  fruit: fruitSchema,
  snake: snakeSchema,
});

// Ticks validation schema (array of movements)
export const tickSchema = z.object({
  velX: z.number().int().min(-1).max(1),
  velY: z.number().int().min(-1).max(1),
});

export const ticksSchema = z.array(tickSchema);
