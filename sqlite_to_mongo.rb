require 'sequel'
require 'sqlite3'
require 'mongo'

# conexión a base de datos sqlite3

Sequel::Model.plugin :json_serializer
DB = Sequel.connect('sqlite://db/ubicaciones.db')

# conexión a base de datos mongodb

DB_MONGO = Mongo::Client.new('mongodb://127.0.0.1:27017/test')
Mongo::Logger.logger.level = Logger::FATAL

# modelos base de datos sqlite3

class Departamento < Sequel::Model(DB[:departamentos])

end

class Provincia < Sequel::Model(DB[:provincias])

end

class Distrito < Sequel::Model(DB[:distritos])

end

# funciones de migración

def borrar
  ubicaciones = DB_MONGO[:ubicaciones]
  ubicaciones.delete_many
end

def migracion
  # arreglos sql_id => mongo_id
  departamento_ids = []
  provincia_ids = []
  distrito_ids = []
  # collection ubicaciones
  ubicaciones = DB_MONGO[:ubicaciones]
  # insertar pais
  doc = {
    nombre: 'Perú',
    tipo: 'pais'
  }
  result = ubicaciones.insert_one(doc)
  pais_id = result.inserted_id
  # insertar departamentos
  departamentos = Departamento.all().to_a
  departamentos.each do |departamento|
   doc = {
     nombre: departamento.nombre,
     tipo: 'departamento',
     pais_id: BSON::ObjectId(pais_id),
   }
   result = ubicaciones.insert_one(doc)
   departamento_ids[departamento.id] = result.inserted_id
  end
  # insertar provincias
  provincias = Provincia.all().to_a
  provincias.each do |provincia|
   departamento_id = departamento_ids[provincia.departamento_id]
   doc = {
     nombre: provincia.nombre,
     tipo: 'provincia',
     departamento_id: departamento_id,
   }
   result = ubicaciones.insert_one(doc)
   provincia_ids.push[provincia.id] = result.inserted_id
  end
  # insertar distritos
  distritos = Distrito.all().to_a
  distritos.each do |distrito|
   provincia_id = provincia_ids[distrito.provincia_id]
   doc = {
     nombre: distrito.nombre,
     tipo: 'distrito',
     provincia_id: provincia_id,
   }
   result = ubicaciones.insert_one(doc)
  end
end

borrar
migracion
