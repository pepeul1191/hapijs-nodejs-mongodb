'use strict';
var middleware = require('../config/middlewares');
var async = require('async');
var models = require('../config/models');
var database = require('../config/database');

module.exports = [
  {
    method: ['POST'],
    path: 'crear',
    config: {
      auth: false,
      pre: [
        {
          method: middleware.csrf
        },
      ],
    },
    handler: function (req, res) {
      var data = JSON.parse(req.payload.data);
      var departamento = new models.Ubicacion({
        nombre: data.nombre,
        tipo: 'departamento',
        pais_id: database.mongoose.Types.ObjectId(data.pais_id),
      });
      departamento.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar el departamento',
              err.toString()
            ]
          }
          res(JSON.stringify(rpta)).code(500);
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado el departamento',
              createdDoc._id.toString()
            ]
          }
          res(JSON.stringify(rpta)).code(200);
        }
      });
    }
  },
  {
    method: ['POST'],
    path: 'editar',
    config: {
      auth: false,
      pre: [
        {
          method: middleware.csrf
        },
      ],
    },
    handler: function (req, res) {
      var data = JSON.parse(req.payload.data);
      var _id = data.id;
      models.Ubicacion.findById(_id, function(err, departamento){
        if (err){
          var rpta = JSON.stringify({
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el departamento a editar',
              err.toString()
            ]
          });
          res(rpta).code(500);
        }else{
          if(departamento == null){
            var rpta = JSON.stringify({
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            });
            res(rpta).code(404);
          }else{
            departamento.nombre = data.nombre;
            departamento.save(function (err, updatedDoc) {
              if (err){
                var rpta = JSON.stringify({
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el departamento',
                    err.toString()
                  ]
                });
                res(rpta).code(500);
              }else{
                var rpta = JSON.stringify({
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado el departamento',
                  ]
                });
                res(rpta).code(200);
              }
            });
          }
        }
      });
    }
  },
  {
    method: ['POST'],
    path: 'eliminar',
    config: {
      auth: false,
      pre: [
        {
          method: middleware.csrf
        },
      ],
    },
    handler: function (req, res) {
      var data = JSON.parse(req.payload.data);
      var eliminados = data['eliminados'];
      var error = false;
      var tests = [];
      async.each(eliminados, function(eliminado_id, callback){
        models.Ubicacion.findByIdAndRemove(eliminado_id, function(err, doc){
          if (err){
            callback(err);
            return;
          }else{
            callback();
          }
        });
      }, function(err){
        if(err){
          var rpta = JSON.stringify({
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en eliminar los departamentoes',
              err.toString()
            ]
          });
          res(rpta).code(500);
        }else{
           var rpta = JSON.stringify({
             'tipo_mensaje': 'success',
             'mensaje': [
               'Se ha registrado los cambios en los departamentoes',
             ]
           });
           res(rpta).code(200);
         }
      });
    }
  },
];
