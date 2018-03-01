'use strict';
//var middleware = require('../config/middleware');

module.exports = [
  {
    method: 'GET',
    path: 'conexion',
    config: {
      auth: false,
      pre: [
        //{ method: middleware.demo},
      ],
    },
    handler: function (request, reply) {
      reply('ok');
    }
  },
  {
    method: 'GET',
    path: 'view',
    config: {
      auth: false,
      pre: [
        //{ method: middleware.demo},
      ],
    },
    handler: function (request, reply) {
      var locals = { 
        title: 'Test EJS Title' 
      };
      reply.view('test/index', locals);
    }
  },
];
