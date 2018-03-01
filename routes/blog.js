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
      blog.save(function (err, createdBlog) {
        if (err) return handleError(err);
        reply(createdBlog._id.toString());
      });
    }
  },
  {
    method: ['GET', 'POST'],
    path: 'editar',
    config: {
      auth: false,
      pre: [
        { method: middleware.demo},
      ],
    },
    handler: function (request, reply) {
      var _id = request.query._id;
      var title = request.query.title;
      var author = request.query.author;
      models.Blog.findById(_id,function(err, blog){
        if (err) return handleError(err);
        blog.title = title;
        blog.author = author;
        blog.save(function (err, updatedBlog) {
          if (err) return handleError(err);
          reply(JSON.stringify(updatedBlog));
        });
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
      models.Blog.find({},function(err, blogs){
        reply(JSON.stringify(blogs));
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
      models.Blog.findOne({_id: _id},function(err, blog){
        reply(JSON.stringify(blog));
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
