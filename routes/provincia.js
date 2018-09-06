'use strict';
var middleware = require('../config/middlewares');
var async = require('async');
var models = require('../config/models');
var database = require('../config/database');

module.exports = [
  {
    method: ['GET'],
    path: 'listar/{departamento_id}',
    config: {
      auth: false,
      pre: [
        {
          method: middleware.csrf
        },
      ],
    },
    handler: function (req, res) {
      models.Ubicacion.find({departamento_id: req.params.departamento_id}, function(err, documents){
        if (err){
          var rpta = JSON.parse({
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar las provincias del departamento',
              err.toString()
            ]
          });
          res(rpta).code(500);
        }else{
          if(documents == null){
            var rpta = JSON.parse({
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento buscado no se encuentra en la base de datos'
              ]
            });
            res(rpta).code(200);
          }else{
            res(JSON.stringify(documents)).code(200);
          }
        }
      }).select({ nombre: 1 });
    }
  },
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
      var provincia = new models.Ubicacion({
        nombre: data.nombre,
        tipo: 'provincia',
        departamento_id: database.mongoose.Types.ObjectId(data.departamento_id),
      });
      provincia.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar la provincia',
              err.toString()
            ]
          }
          res(JSON.stringify(rpta)).code(500);
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado la provincia',
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
      models.Ubicacion.findById(_id, function(err, provincia){
        if (err){
          var rpta = JSON.stringify({
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar la provincia a editar',
              err.toString()
            ]
          });
          res(rpta).code(500);
        }else{
          if(provincia == null){
            var rpta = JSON.stringify({
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            });
            res(rpta).code(404);
          }else{
            provincia.nombre = data.nombre;
            provincia.save(function (err, updatedDoc) {
              if (err){
                var rpta = JSON.stringify({
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar la provincia',
                    err.toString()
                  ]
                });
                res(rpta).code(500);
              }else{
                var rpta = JSON.stringify({
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado el provincia',
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
              'Se ha producido un error en eliminar las provincias',
              err.toString()
            ]
          });
          res(rpta).code(500);
        }else{
           var rpta = JSON.stringify({
             'tipo_mensaje': 'success',
             'mensaje': [
               'Se ha registrado los cambios en las provincias',
             ]
           });
           res(rpta).code(200);
         }
      });
    }
  },
];
