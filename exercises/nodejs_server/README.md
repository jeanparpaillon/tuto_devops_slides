# Sample Node.js Server

A simple Node.js HTTP server built with Express for DevOps tutorial purposes.

## Features

- Serves a simple "Hello World" message with the current date and time
- Uses Express.js framework
- Includes npm scripts for development, testing, and running
- Follows best practices with .nvmrc, .editorconfig, and proper linting

## Prerequisites

- Node.js 20 or higher (see `.nvmrc`)
- npm or pnpm

## Installation

```bash
npm install
# or
make install
```

## Usage

### Development mode (with auto-reload)

```bash
npm run dev
# or
make dev
```

### Production mode

```bash
npm start
# or
make start
```

The server will start on `http://localhost:3000` by default. You can change the port by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## Testing

```bash
npm test
# or
make test
```

## API Endpoints

- `GET /` - Returns "Hello World, it is [current date and time]"

## Project Structure

```
nodejs_server/
├── server.js          # Main application file
├── server.test.js     # Test file
├── package.json       # Project dependencies and scripts
├── Makefile          # Optional Makefile for common tasks
├── .nvmrc            # Node.js version specification
├── .editorconfig     # Editor configuration for consistent coding style
├── .gitignore        # Git ignore rules
└── README.md         # This file
```
