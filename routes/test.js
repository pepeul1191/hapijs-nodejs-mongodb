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
];
