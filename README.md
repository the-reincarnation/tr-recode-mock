# tr-recode-mock
Mock endpoint for TR-Recode

## Downloading Schema
Download the latest schema and replace those in the folder (`schema\`)

### GraphQL Schema
Download GraphQL JSON Schema using [apollo-codegen](https://github.com/apollographql/apollo-codegen).
Apollo-codegen executes the introspection query to obtain the GraphQL schema.

```
apollo-codegen download-schema http://localhost:9000/graphql
```
Save as `schema\graphql.json`.

### Swagger Schema
Download directly from http://localhost:9000/swagger.json and save as `schema\swagger.json`.

## Setup
Depends on [swagger-mock-api](https://github.com/wjtan/swagger-mock-api) forked from https://github.com/dzdrazil/swagger-mock-api.

```
npm install
```

## Running
```
npm start
```
