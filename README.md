# e-commerce serverless API
- This is a code repository to store a little example of an API built with *serverless-offline*, **the purpose of this repository is not to be used as a base of an ONLINE serverless API**.
- It is just a sample of how the code for serverless APIs should be.
- Built using **Serverless** framework with **node.js/Typescript** to run locally with **serverless-offline**.

## Pre-Requisites

1. Install project dependencies:
```shell 
npm i
```

## How to Run
After pre-requisites are fulfilled, run the following command from terminal inside the root folder:
```shell
npm run start-server
```
If completed successfully, the endpoints will be shown in your terminal, use a tool like *curl* or *Postman* to test them. You can check the [documentation](./API_DOC.md) file to see information about the routes.
## Folder Structure

### Inside *src/api*:
* **builders**: A builder is a special kind of class that's take care of the construction of an object.
* **decorators**: Use this folder to store some useful decorators to avoid duplicated code.
* **dtos**: This folder is used to store all objects that can represent a request body or a response body.
* **handlers**: A handler is responsible for parsing and extracting relevant information from the event (request), to direct it to the correct service and to parse the response sent. Each route in serverless.yml file must have a Handler file. The `ServerlessHandler` class is a base class with some useful functions to be used by others handlers.
* **services**: A Service is responsible for the business logic.
* **utils**: This folder should store the utils functions.

## Testing
The libs used for testing are *jest* and *supertest*.

### Running the tests:
#### Running all available tests (e2e and unit) with the follow command:
```shell
npm test
```
#### Running only unit or e2e tests:
- This command runs only the unit tests cases.
```shell
npm run test-e2e
```
- This command starts the server and runs end-to-end tests cases.
```shell
npm run test-e2e
```


