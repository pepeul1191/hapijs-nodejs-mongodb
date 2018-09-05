'use strict';
var middleware = require('../config/middlewares');
var constants = require('../config/constants');
var helpers = require('../config/helpers');
var errorHelper = require('../helpers/error_helper');

module.exports = [
  {
    method: 'GET',
    path: 'access/{numero_error}',
    config: {
      auth: false,
      pre: [
        {
          method: middleware.demo
        },
      ],
    },
    handler: function (request, reply) {
      console.log(errorHelper.accessCss());
      console.log(errorHelper.accessJs());
      var locals = {
        constants: constants.data,
        title: 'Error',
        helpers: helpers,
        csss: errorHelper.accessCss(),
        jss: errorHelper.accessJs(),
        error: {
          numero: 404,
          mensaje: 'Archivo no encontrado',
          descripcion: 'La página que busca no se encuentra en el servidor',
          icono: 'fa fa-exclamation-triangle'
        }
      };
      reply.view('error/access', locals);
    }
  },
];
