var db = require('./database');

var Blog = db.mongoose.model('blogs',
  new db.Schema(
    {
      title:  String,
      author: String,
    }
  )
);

var Ubicacion = db.mongoose.model('ubicaciones',
  new db.Schema(
    {
      nombre:  String,
      tipo: String,
      pais_id: db.Schema.Types.ObjectId,
      departamento_id: db.Schema.Types.ObjectId,
      provincia_id: db.Schema.Types.ObjectId,
    }
  )
);

exports.Blog = Blog;
exports.Ubicacion = Ubicacion;
