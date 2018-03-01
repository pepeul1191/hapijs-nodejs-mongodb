/*
var models = require('./config/models');

var blog = new models.Blog(
  {
    title: 'hola', 
    author: 'mundo'
  }
);

blog.save(function (err, doc) {
  if (err) return handleError(err);
  // saved!
  console.log(doc._id);
});
*/

'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const server = new Hapi.Server();
const constants = require('./config/constants');

server.connection({
  host: 'localhost',
  port: 5000,
  routes: {
    cors: true,
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  }
});

server.ext('onPreResponse', function(request, reply){
  if (request.response.header) {
    request.response.header('Server', 'Ubuntu');
  }
  reply.continue();
});

server.on('response', function (request) {
  if (constants.data['ambiente'] == 'desarrollo'){
    console.log(
    	request.info.remoteAddress + ': ' + 
    	request.method.toUpperCase() + ' ' + 
    	request.url.path + ' --> ' + 
    	request.response.statusCode
    );
  }
});

server.register(
  [
    Inert,
  ], (err) => {
  server.start((err) => {
    console.log('Running web app at: ' + server.uri);
  });
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true,
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  config: {
    auth: false,
  },
  handler: function (request, reply) {
    reply('Error: URL vacía');
  }
});
