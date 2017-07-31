## Overview

This is an react isomorphic web app developed for [a code challenge](https://github.com/conde-nast-international/cnid-tech-tests#option-1), the app has the following architecture:

  * Initial page state is rendered on the server side, client app pick up the state in continuation of the initial render, keep acting as a single-page-app.
  * Client pick up the page data rendered on the server, it will not fetch any data unless server missed that.
  * App uses a universal routes across the client and server, thanks to [react-router](https://reacttraining.com/react-router/).
  * App components are created in FSC component (Functional Stateless Components) for simplification purpose.
  * App rendered result on different routes options are tested with [Jest snapshot](https://facebook.github.io/jest/docs/snapshot-testing.html) with API mocks.

## Run this app

`npm run server` will first creates a `build` directory with a production build of your app, then start the Express HTTP server on port 3001, you should be able to access the web app from [http://localhost:3001](http://localhost:3001)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Run this app's tests

`npm run test` will launch Jest as test runner which means the tests always run in a Node environment and not in a real browser. These tests are to  verify Virtual DOM structure is rendered properly as expected in each different routes, note that this is different from running tests in a real browser so some of the browser env dependencies are mocked, including fetch API and browser history. The test compares App running snapshot against last runs result living in the `src/__snapshots__` directory, where which the expected result is mandated.

