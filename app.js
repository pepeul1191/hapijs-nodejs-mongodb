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
})