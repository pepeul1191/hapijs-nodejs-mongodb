var db = require('./database');

var Blog = db.mongoose.model('blogs',
  new db.Schema(
    {
      title:  String,
      author: String,
    }
  )
);

var Pais = db.mongoose.model('paises',
  new db.Schema(
    {
      nombre:  String,
      tipo: String,
    }
  )
);

exports.Blog = Blog;
exports.Pais = Pais;
