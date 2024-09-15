import { v4 as uuidv4 } from 'uuid';
import { randomNumber } from '../utils/randomNumber';
import { Fruit, Snake, State, Tick } from '../types/game.types';
import { FruitNotFoundError, GameOverError } from '../errors/game.errors';

export const startNewGame = (width: number, height: number) => {
  return {
    gameId: uuidv4(),
    width,
    height,
    score: 0,
    fruit: generateNewFruit(width, height),
    snake: { x: 0, y: 0, velX: 1, velY: 0 },
  };
};

export const validateGame = (state: State, ticks: { velX: number; velY: number }[]) => {
  const { snake, width, height } = state;
  let { fruit, score } = state;

  for (const tick of ticks) {
    if (!isValidMove(snake, tick)) {
      throw GameOverError;
    }
    // Update snake's position based on velocity
    snake.velX = tick.velX;
    snake.velY = tick.velY;
    snake.x += snake.velX;
    snake.y += snake.velY;

    if (isOutOfBounds(snake, width, height)) {
      throw GameOverError;
    }

    if (hasReachedFruit(snake, fruit)) {
      score++;
      fruit = generateNewFruit(width, height);
      return { gameId: state.gameId, width, height, score, fruit, snake };
    }
  }
  throw FruitNotFoundError;
};

const generateNewFruit = (width: number, height: number): Fruit => {
  return {
    x: randomNumber(width),
    y: randomNumber(height),
  };
};

const isValidMove = (snake: Snake, tick: Tick): boolean => {
  // Prevent 180-degree turns
  if ((snake.velX === 1 && tick.velX === -1) || (snake.velX === -1 && tick.velX === 1))
    return false;
  if ((snake.velY === 1 && tick.velY === -1) || (snake.velY === -1 && tick.velY === 1))
    return false;
  // Prevent diagonal move or no movement
  if (tick.velX === tick.velY) return false;

  return true;
};

const isOutOfBounds = (snake: Snake, width: number, height: number): boolean => {
  return snake.x < 0 || snake.x >= width || snake.y < 0 || snake.y >= height;
};

const hasReachedFruit = (snake: Snake, fruit: Fruit): boolean => {
  return snake.x === fruit.x && snake.y === fruit.y;
};
