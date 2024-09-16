import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { GameError } from '../errors/gameErrors';
import { formatZodError } from '../utils/formatZodError';

export const errorHandler = (
  err: Error | GameError | z.ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ errors: formatZodError(err) });
  }

  if (err instanceof GameError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error('Unexpected error:', err);
  return res.status(500).json({ error: 'Internal server error' });
};
