'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
const server = new Hapi.Server();
const HRL = require('hapi-routes-loader');
const Vision = require('vision');
const Ejs = require('ejs');
const constants = require('./config/constants');

server.connection({
  host: 'localhost',
  port: process.argv[2],
  routes: {
    cors: true,
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  }
});

console.log('> Aplicación HapiJS ejecutándose en el puerto ' + process.argv[2]);

server.ext('onPreResponse', function(request, reply){
  if (request.response.header) {
    request.response.header('Server', 'Ubuntu;hapi.js');
    request.response.header('x-powered-by', 'hapi.js;Node.js');
  }
  reply.continue();
});

server.on('response', function (request) {
  if (constants.data['ambiente_log'] == 'activo'){
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
    Vision,
    {
      register: HRL,
      options: {
      	dirname: __dirname, //must be a string with a root path
      	pathRoutes: '/routes'
    	}
    },
  ],
  (err) => {
	 	if (typeof err !== 'undefined') {
	 		console.log(err);
		}else{
			server.views({
		    engines: {
		      html: Ejs,
		    },
		    path: __dirname + '/views',
		    layout: false
		  });
			server.start((err) => {
			  console.log('Running HapiJs web app');
			});
		}
	}
);
/*
//handler de archivos estáticos, usar si no se usa not_found Handler
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
*/
//not_found Handler
server.route({
  method: [ 'GET', 'POST' ],
  path: '/{any*}',
  handler: (req, res) => {
    var rpta = JSON.stringify({
      tipo_mensaje: 'error',
      mensaje: [
        'No se puede encontrar el recurso',
        'Error 404'
    ]});
    res(rpta).code(404).takeover();
  }
});

server.route({
  method: 'GET',
  path: '/',
  config: {
    auth: false,
  },
  handler: function (request, reply) {
    reply('Error: URL vacía').code(400);
  }
});
