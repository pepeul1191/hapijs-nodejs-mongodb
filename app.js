var db = require('./config/database');

var blogSchema = new db.Schema({
  title:  String
});

var Blog = db.mongoose.model('Blog', blogSchema);

var blog = new Blog({title: 'hola'});

blog.save(function (err, doc) {
  if (err) return handleError(err);
  // saved!
  console.log(doc._id);
})