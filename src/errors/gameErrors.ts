import { GameErrorMessages } from './errorMessages';
export class GameError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const GameOverError = new GameError(GameErrorMessages.GAME_OVER_MESSAGE, 418);
export const FruitNotFoundError = new GameError(GameErrorMessages.FRUIT_NOT_FOUND, 404);
