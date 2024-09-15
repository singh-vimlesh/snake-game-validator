import { ZodError } from 'zod';

export const formatZodError = (error: ZodError) => {
  return error.errors.map((err) => {
    return {
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    };
  });
};
