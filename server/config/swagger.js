const swaggerAutogen = require('swagger-autogen');
const path = require('path')

const doc = {
  info: {
    title: 'My API',
    description: 'Auto-generated API documentation'
  },
  host: 'localhost:4000',
  schemes: ['http']
};

const output = './swagger-output.json';
const endpoints = [
  path.join(__dirname, '../server.js'),
//   path.join(__dirname, '../routes/*.js'),
];

swaggerAutogen()(output, endpoints, doc);

