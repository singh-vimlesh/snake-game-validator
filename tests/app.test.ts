import request from 'supertest';
import app from '../src/app';
import { GameErrorMessages } from '../src/errors/errorMessages';

describe('Snake Game API', () => {
  // Test the /new endpoint
  describe('GET /new', () => {
    it('should create a new game with valid width and height', async () => {
      const response = await request(app).get('/new?w=10&h=10');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('gameId');
      expect(response.body).toHaveProperty('width', 10);
      expect(response.body).toHaveProperty('height', 10);
      expect(response.body).toHaveProperty('fruit');
      expect(response.body).toHaveProperty('snake');
    });

    it('should return 400 for invalid width or height', async () => {
      const response = await request(app).get('/new?w=-1&h=10');
      expect(response.status).toBe(400);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors'); // Check if errors array exists
      expect(response.body.errors[0]).toHaveProperty('field', 'w');
      expect(response.body.errors[0]).toHaveProperty('message', 'Invalid');
      expect(response.body.errors[1]).toHaveProperty('message', 'Width must be greater than 0');
    });
  });

  // Test the /validate endpoint
  describe('POST /validate', () => {
    it('should validate a valid move sequence and update game state if reached to the fruit', async () => {
      const initialState = {
        gameId: 'test-game',
        width: 10,
        height: 10,
        score: 0,
        fruit: { x: 2, y: 0 },
        snake: { x: 0, y: 0, velX: 1, velY: 0 },
      };

      const ticks = [
        { velX: 1, velY: 0 }, // Move right
        { velX: 1, velY: 0 }, // Move right
      ];

      const response = await request(app).post('/validate').send({ state: initialState, ticks });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('score', 1); // Snake should reach the fruit and score should increment
      expect(response.body.fruit).not.toEqual(initialState.fruit); // New fruit generated
    });

    it(`should return 404 if moves are valid but didn't reached to the fruit`, async () => {
      const initialState = {
        gameId: 'test-game',
        width: 10,
        height: 10,
        score: 0,
        fruit: { x: 2, y: 0 },
        snake: { x: 0, y: 0, velX: 1, velY: 0 },
      };

      const ticks = [
        { velX: 1, velY: 0 }, // Move right
        { velX: 0, velY: 1 }, // Move up
      ];

      const response = await request(app).post('/validate').send({ state: initialState, ticks });
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', GameErrorMessages.FRUIT_NOT_FOUND);
    });

    it('should return 418 if the snake makes an invalid move (180-degree turn)', async () => {
      const initialState = {
        gameId: 'test-game',
        width: 10,
        height: 10,
        score: 0,
        fruit: { x: 2, y: 0 },
        snake: { x: 0, y: 0, velX: 1, velY: 0 },
      };

      const invalidTicks = [
        { velX: -1, velY: 0 }, // Invalid move, 180-degree turn
      ];

      const response = await request(app).post('/validate').send({ state: initialState, ticks: invalidTicks });
      expect(response.status).toBe(418);
      expect(response.body).toHaveProperty('error', GameErrorMessages.GAME_OVER_MESSAGE);
    });

    it('should return 418 if the snake makes an invalid move (diagonal)', async () => {
      const initialState = {
        gameId: 'test-game',
        width: 10,
        height: 10,
        score: 0,
        fruit: { x: 2, y: 0 },
        snake: { x: 0, y: 0, velX: 1, velY: 0 },
      };

      const invalidTicks = [
        { velX: 1, velY: 1 }, // Invalid diagonal move
      ];

      const response = await request(app).post('/validate').send({ state: initialState, ticks: invalidTicks });
      expect(response.status).toBe(418);
      expect(response.body).toHaveProperty('error', GameErrorMessages.GAME_OVER_MESSAGE);
    });

    it('should return 418 if the snake goes out of bounds', async () => {
      const initialState = {
        gameId: 'test-game',
        width: 10,
        height: 10,
        score: 0,
        fruit: { x: 5, y: 0 },
        snake: { x: 0, y: 0, velX: 1, velY: 0 },
      };

      const outOfBoundsTicks = [
        { velX: 1, velY: 0 }, // Move right
        { velX: 1, velY: 0 }, // Move right
        { velX: 1, velY: 0 }, // Move right
        { velX: 1, velY: 0 }, // Move right
        { velX: 0, velY: -1 }, // Move down (out of bounds)
      ];

      const response = await request(app).post('/validate').send({ state: initialState, ticks: outOfBoundsTicks });
      expect(response.status).toBe(418);
      expect(response.body).toHaveProperty('error', GameErrorMessages.GAME_OVER_MESSAGE);
    });

    it('should return 400 for an invalid request body', async () => {
      const response = await request(app).post('/validate').send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0]).toHaveProperty('message', 'Required');
    });
  });
});
