'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import SwaggerMock from 'swagger-mock-api';
import { graphql, buildClientSchema } from 'graphql';
import { graphiqlExpress } from 'graphql-server-express';
import { mockServer, makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import Chance from 'chance';

import schemaJSON from './schema/graphql.json';

const MAX_INT = -(1 << 31) + 1;
const PORT = 9000;

const app  = express().use('*', cors());

// Build schema object
const schema = buildClientSchema(schemaJSON.data);

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });

// Create mock query server
const chance = new Chance();
const server = mockServer(schema, {
  Int: () => chance.integer({ min: 0, max: MAX_INT }),
  Long: () => chance.integer({ min: 0, max: Number.MAX_SAFE_INTEGER}),
});

app.get('/', function (req, res) {
  res.send('TR-Recode Mock Endpoint!');
});

// graphiql UI
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// GraphQL Endpoint
app.post('/graphql', bodyParser.json(), (req, res) => {
    // execute GraphQL!
    server.query(req.body.query, req.body.variables)
          .then((result) => {
              res.send(JSON.stringify(result, null, 2));
          });
});

// Swagger endpoint
app.use(SwaggerMock({
  swaggerFile: './schema/swagger.json',
  watch: true
}));

app.listen(PORT, function() {
    console.log('TR-Recode-Mock is now running at http://localhost:' + PORT);
});

