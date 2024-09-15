
# Snake Game Validator

A stateless API for validating moves in a Snake game. The server handles game logic, ensures moves are valid, and returns updated game states. Built using Express, Zod, TypeScript, and Jest.

## Table of Contents

- [Snake Game Validator](#snake-game-validator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [`GET /new`](#get-new)
    - [`POST /validate`](#post-validate)
  - [Project Structure](#project-structure)
  - [Testing](#testing)
  - [Development](#development)
    - [Linting and Formatting](#linting-and-formatting)
  - [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/singh-vimlesh/snake-game-validator.git
    cd snake-game-validator
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add any necessary environment variables (see `.env.example`):
    ```bash
    # Example
    PORT=3000
    ```

## Usage

1. Start the development server:
    ```bash
    yarn dev
    ```

2. The API will run at `http://localhost:3000`.

3. To format code:
    ```bash
    yarn format
    ```

4. To lint the project:
    ```bash
    yarn lint
    ```

## API Endpoints

### `GET /new`

Creates a new game with a grid of specified dimensions.

**Query Parameters:**
- `w` (number, required): Width of the game board.
- `h` (number, required): Height of the game board.

**Response:**
- `200 OK`: Returns the initial game state.
- `400 Bad Request`: Invalid or missing width/height.

**Example Request:**
```bash
GET /new?w=10&h=10
```

### `POST /validate`

Validates a sequence of snake moves and updates the game state.

**Request Body:**
```json
{
  "state": { /* Current game state */ },
  "ticks": [/* Move sequence array */]
}
```

**Response:**
- `200 OK`: Valid move sequence, returns updated game state.
- `400 Bad Request`: Invalid request body.
- `404 Bad Request`: Invalid request body.
- `418 I'm a teapot`: Invalid move (e.g., snake goes out of bounds, 180-degree turn, etc.).

**Example Request:**
```bash
POST /validate
{
  "state": { /* current game state */ },
  "ticks": [/* moves array */]
}
```

## Project Structure

```bash
.
├── src
│   ├── config           # Application configuration files
│   ├── controllers      # API Controllers
│   ├── errors           # API customs errors
│   ├── middlewares      # Middleware functions (e.g., error handling)
│   ├── routes           # API Routes
│   ├── schemas          # Zod validation schemas
│   ├── services         # Business logic and validation services
│   ├── types            # Type definitions
│   ├── utils            # Utility functions
│   ├── app.ts           # Server setup for Express application, including middleware and route definitions
│   └── server.ts        # Starts the server and listens for incoming requests
├── tests                # Unit and integration tests
├── .env                 # Environment variables file
├── .eslint.config.mjs   # ESLint configuration file
├── .prettierrc          # Prettier configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## Testing

Run tests using Jest:

```bash
yarn test
```

To run specific test cases or suites, use Jest's options:

```bash
yarn test -- --watch  # To watch files and re-run tests on changes
```

## Development

### Linting and Formatting

Ensure code quality using ESLint and Prettier:

- **Lint:** Check for code issues:
    ```bash
    yarn lint
    ```

- **Format:** Automatically format code:
    ```bash
    yarn format
    ```

## License

This project is licensed under the MIT License.

