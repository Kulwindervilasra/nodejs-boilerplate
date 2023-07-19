
Skeleton for Node.js applications written in TypeScript


## Purpose

Our main purpose with this Skeleton is to start server application with node js and typescript.

Try it!! I am happy to hear your feedback or any kind of new features.

## Common Features

- Quick start
- Integrated eslint, prettier and husky
- Global Error & Response Handler
- Simple and Standard scaffolding
- Based on Typescript Syntax
- Simple & Global Enviroment Configuration
- Request/Response Encryption & Decryption Implementation
- Easily Add new feature
- Integrated winston Logger
- Production Ready Skeleton
- Follwed Production Ready Best Practices: Security
- Added only used npm modules
- Swagger Documentation Support
- Unit & Integration Test Cases

## Core NPM Module

- [x] `express`, `@types/express`
- [x] `@types/node`
- [x] `typescript`
- [x] `dotenv`
- [x] `cors`
- [x] `helmet`
- [x] `http-status-codes`
- [x] `winston`, `@types/winston`



## Start The application in Development Mode

- Clone the Application `git clone https://github.com/Kulwindervilasra/nodejs-boilerplate.git`
- Install the dependencies `npm install`
- Start the application `npm run start:local`

## Start The application in Production Mode

- Install the dependencies `npm install`
- Create the build `npm run build`
- Start the application `npm run start:production`
- Before starting make sure to creat prod environment `.env.prod` file


## Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **wiki/**                         | You can add project documentation and insructions file here |
| **src/**                          | Source files |
| **src/abstractions**              | Abstarct classes and Interfaces  |
| **src/components**                | REST API Components & Controllers  |
| **src/environments**              | Application Environments Handling utility  |
| **src/lib**                       | Reusable utilises and library source code like a logger|
| **src/middleware/**               | Express Middlewares like error handler feature |
| **build/**                        | Compiled source files will be placed here |
| **tests/**                        | Test cases will be placed here |
| **tests/helpers/**                | Helpers for test cases will be placed here  |
| **tests/unit-tests/**             | Unit Test cases will be placed here  |
| **tests/integration-tests/**      | API routes (Integration) Test cases will be placed here|



## Encryption

Set the `APPLY_ENCRYPTION` environment variable to `true` to enable encryption.

## Global Environment Object

You can directly access the environment attributes in any component/file using global environment object. For more details please check file `src/global.ts`.

*Example*

To access the `applyEncryption` attribute from `Envionment` class to Response Handler, write `environment.applyEncryption`;

## Swagger API Documentation

The swagger documentation is available at the following url `${host}/docs`:  

[http://localhost:3146/docs](http://localhost:3146/docs)
## Default System Health Status API

- `${host}/api/status/system` - Return the system information in response
- `${host}/api/status/time` - Return the current time in response
- `${host}/api/status/usage` - Return the process and system memory usage in response
- `${host}/api/status/process` -  Return the process details in response
- `${host}/api/status/error` - Return the error generated object in response


## Notes

### 1. Why is my git pre-commit hook not executable by default?

- Because files are not executable by default; they must be set to be executable.

```
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

### 2. [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)

- Don’t use deprecated or vulnerable versions of Express
- Use TLS
- Use Helmet
- Use cookies securely
- Prevent brute-force attacks against authorization
- Ensure your dependencies are secure
- Avoid other known vulnerabilities
- Additional considerations

<hr/>

