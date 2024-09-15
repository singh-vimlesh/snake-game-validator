import { z } from 'zod';
import { snakeSchema, fruitSchema, stateSchema, tickSchema } from '../schemas/game.schemas';

// Extract types from Zod schemas
export type Snake = z.infer<typeof snakeSchema>;
export type Fruit = z.infer<typeof fruitSchema>;
export type State = z.infer<typeof stateSchema>;
export type Tick = z.infer<typeof tickSchema>;
