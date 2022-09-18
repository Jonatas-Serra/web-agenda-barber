# [Web] Agenda Barber
![CircleCI](https://img.shields.io/circleci/build/github/DiegoVictor/gofinances-web?style=flat-square&logo=circleci)
[![typescript](https://img.shields.io/badge/typescript-4.6.4-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/reactjs-18.2.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![styled-components](https://img.shields.io/badge/styled_components-5.1.1-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-8.21.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-24.9.0-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/gofinances-web?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/gofinances-web)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/DiegoVictor/gofinances-web/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>
This web version allow to a user to see your transactions' income, outcome and balance. All the resources used by this application comes from its [`API`](https://github.com/Jonatas-Serra/api-schedule-barber).

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [Configuring](#configuring)
    * [.env](#env)
    * [API](#api)
* [Usage](#usage)
* [Running the tests](#running-the-tests)
  * [Coverage Report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/gofinances-web/main/screenshots/dashboard.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/gofinances-web/main/screenshots/upload.png" width="49%"/>

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.
## Configuring
Configure your environment variables and remember to start the [API](https://github.com/DiegoVictor/gofinances-api) before to start this app.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
REACT_APP_API_URL|API's url with version (v1)|`http://localhost:3333/v1`

### API
Start the [API](https://github.com/DiegoVictor/gofinances-api) (see its README for more information). In case of any change in the API's `port` or `host` remember to update the [`.env`](#env) too.

# Usage
To start the app run:
```
$ yarn start
```
Or:
```
npm run start
```

# Running the tests
[Jest](https://jestjs.io) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage Report
To generate/update the coverage report:
```
$ yarn coverage
```
Or:
```
$ npm run coverage
```
> You can see the coverage report inside `tests/coverage`.