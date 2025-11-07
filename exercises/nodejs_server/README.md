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

## Docker

Build and run with Docker:

```bash
# Build the image
docker build -t nodejs-server .

# Run the container
docker run --rm -p 3000:3000 nodejs-server

# Visit http://localhost:3000
```

## GitHub Actions

This project includes GitHub Actions workflow templates for CI/CD exercises. See [`.github/workflows/README.md`](.github/workflows/README.md) for details.

Available workflows:
- **Exercise 1**: First workflow with basic checks
- **Exercise 2**: Automated testing with npm test
- **Exercise 3**: Docker build and push to GHCR
- **Complete CI/CD**: Full pipeline combining all exercises

## Project Structure

```
nodejs_server/
├── .github/
│   └── workflows/     # GitHub Actions workflow templates
├── server.js          # Main application file
├── server.test.js     # Test file
├── package.json       # Project dependencies and scripts
├── Dockerfile         # Docker container definition
├── Makefile          # Optional Makefile for common tasks
├── .nvmrc            # Node.js version specification
├── .editorconfig     # Editor configuration for consistent coding style
├── .gitignore        # Git ignore rules
└── README.md         # This file
```
