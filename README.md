# scalar-integration-tests

## Getting Started

The following steps should help you get started

### Installation

```sh
$ nvm use
$ npm install
```

### Scalar setup

In order for the tests to work properly, you'll need a valid url where scalar is being hosted. You will also need to create a test-user for cypress to run the tests. This test user should be given super user permissions in order to delete the book, otherwise you will need to manually delete the "Cypress Test Book" after running the test suite.

### Configuration

An example configuration file has been provided as `cypress/config/scalarConfig.json.example`. Copy the example file to the same directory as `cypress/config/scalarConfig.json` and update `baseUrl` with the url of your scalar instance, as well as `testUser` and `testPassword` with your test user's credentials.

Tests are found under the `cypress/integration` directory.

### Running the tests

To open the tests using the cypress gui:

```sh
$ npm run open:scalar:dev
```

To run the tests in "headless" mode:

```sh
$ npm run run:scalar:dev
```

## Notes

- The tests are as reliable as scalar itself and your network connection. They are not unit tests, and will not always produce the same results.
- The final test is to delete the test book that is created during the tests. Sometimes, that step may fail. In that case you will need to manually clean up the test book that was created.

### What has been omitted?

1. Tests that involve clicking and dragging. Clicking and dragging was not so simple to solve for these tests. So I ommited anything where that was involved, which includes annotation tests, and rearranging ordered lists (like the table of contents)

2. Anonymous user visits a book. I'm not sure that is totally necessary.
