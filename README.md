# Boilerplate for building APIs with Express, MongoDB and Docker

This project is a boilerplate providing an Express site connected to MongoDB using [mongoose](http://mongoosejs.com/). It uses [Ava](https://github.com/avajs/ava/blob/master/readme.md) for testing and everything runs in containers using Docker Compose.

## Usage

While you're testing you can just build the containers and keep the tests running:

```bash
npm run docker:build
npm run docker:test:watch
```

When you want to run the application in development mode, use the following commands:

```bash
npm run docker:build
npm run docker:dev
```

## Commands

Build the Docker images defined in the Docker Compose file:

```bash
npm run docker:build
```

Rebuild all images without using the cache (clean rebuild):

```bash
npm run docker:rebuild
```

Run the development environment (accessible through http://localhost:3000):

```bash
npm run docker:dev
```

Run the tests in Docker with coverage:

```bash
npm run docker:test
```

Run the tests and keep watching for changes:

```bash
npm run docker:test:watch
```
