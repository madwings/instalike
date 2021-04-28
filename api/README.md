## Running the application

The application can be started for development with:
```bash
yarn start:dev
or
yarn debug
```

## Tests

Tests are written with `jest`. We adopt the following convention for naming tests:
- the filenames for unit tests are named `*.test.js`,
- the filenames for integration tests are named `*.spec.js`

This way we can run the unit tests concurrently:
```bash
jest '(/__tests__/.*\\.test)\\.js$'
```

and the integration tests can be run serially:
```bash
jest '(/__tests__/.*\\.spec)\\.ts$' --runInBand
```

or concurrently:
```bash
jest '(/__tests__/.*\\.spec)\\.js$'
```

### Running Tests

The tests can be executed with in test mode (`NODE_ENV` is set to `test` automatically):
```bash
yarn test:quick
```

To run the test with coverage:
```bash
yarn test
```

## Endpoints

GET /

GET /health

GET /info

GET /block/list

GET /block/details/:block_hash