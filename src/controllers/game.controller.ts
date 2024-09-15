import { Request, Response } from 'express';
import { startNewGame, validateGame } from '../services/game.service';
import { newGameQuerySchema, validateGameBodySchema } from '../schemas/request.schema';
import { State, Tick } from '../types/game.types';

// Type for query parameters in newGame
interface NewGameQuery {
  w: string;
  h: string;
}

// Type for request body in validateGameMoves
interface ValidateGameBody {
  state: State;
  ticks: Tick[];
}

// Controller for starting a new game (GET /new)
export const newGame = (req: Request<object, object, object, NewGameQuery>, res: Response) => {
  const { w: width, h: height } = newGameQuerySchema.parse(req.query);
  const gameState = startNewGame(width, height);
  res.status(200).json(gameState);
};

// Controller for validating game moves (POST /validate)
export const validateGameMoves = (
  req: Request<object, object, ValidateGameBody>,
  res: Response
) => {
  const { state, ticks } = validateGameBodySchema.parse(req.body);
  const updatedState = validateGame(state, ticks);
  res.status(200).json(updatedState);
};
