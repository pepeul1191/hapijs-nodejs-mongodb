'use strict';
var middleware = require('../config/middleware');
var models = require('../config/models');

module.exports = [
  {
    method: ['GET', 'POST'],
    path: 'crear',
    config: {
      auth: false,
      pre: [
        { method: middleware.demo},
      ],
    },
    handler: function (request, reply) {
      var title = request.query.title;
      var author = request.query.author;
      var blog = new models.Blog(
        {
          title: title, 
          author: author
        }
      );
      blog.save(function (err, doc) {
        if (err) return handleError(err);
        reply(doc._id.toString());
      });
    }
  },
  {
    method: ['GET'],
    path: 'listar',
    config: {
      auth: false,
      pre: [
        { method: middleware.demo},
      ],
    },
    handler: function (request, reply) {
      models.Blog.find({},function(err, docs){
        reply(JSON.stringify(docs));
      });
    }
  },
  {
    method: ['GET'],
    path: 'obtener',
    config: {
      auth: false,
      pre: [
        { method: middleware.demo},
      ],
    },
    handler: function (request, reply) {
      var _id = request.query._id;
      models.Blog.findOne({_id: _id},function(err, doc){
        reply(JSON.stringify(doc));
      });
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
      reply.view('test/index');
    }
  },
];
