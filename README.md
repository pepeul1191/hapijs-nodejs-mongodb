## HapiJS NodeJS y MongoDB

Instlación de software y dependencias:

    $ npm install && npm install -g nodemon bower && bower install

Arrancar servicio:

    $ npm run start:prod {{puerto}}

Arrancer servicio con autoreload con cambios:

    $ npm run start:dev {{puerto}}

Consultas MongoDB:

+ SELECT tipo, nombre FROM ubicaciones WHERE pais_id = {{pais_id}}

    db.ubicaciones.find(
      {
        pais_id: ObjectId("5b907d815139f844031cc5a1")
      },
      {
        tipo: 1,
        nombre:1
      }
    )

+ Consultar recursivas a árbol similar a:

  ```
  SELECT * FROM vw_distrito_provincia_departamento WHERE nombre LIKE 'La%' LIMIT 0,10;
  ```

  ```
  db.ubicaciones.aggregate([
    {
      $match:{
        tipo: "distrito"
      }
    },
    {
      $lookup:{
        from: "ubicaciones",
        localField: "provincia_id",
        foreignField: "_id",
        as: "provincia"
      }
    },
    {
      $unwind: {
        path: "$provincia",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "ubicaciones",
        localField: "provincia.departamento_id",
        foreignField: "_id",
        as: "departamento",
      }
    },
    {
      $unwind: {
        path: "$departamento",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match:{
        "departamento.pais_id": ObjectId("5b90a5b1ef627560f1251e4d"),
        "nombre": /^La/
      }
    },
    { $project: {
        "_id": "$_id",
        "nombre": {
          $concat: [
            "$nombre",
            ", ",
            "$provincia.nombre",
            ", ",
            "$departamento.nombre"
          ]
        },
      }
    },
    {
      $limit: 10
    },
  ])
  ```

Almacenar función

~~~
db.system.js.save(
{
  _id: "buscarDistrito",
  value: function(pais_id, nombre){
    var docs = db.ubicaciones.aggregate([
      {
        $match:{
          tipo: "distrito"
        }
      },
      {
        $lookup:{
          from: "ubicaciones",
          localField: "provincia_id",
          foreignField: "_id",
          as: "provincia"
        }
      },
      {
        $unwind: {
          path: "$provincia",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "ubicaciones",
          localField: "provincia.departamento_id",
          foreignField: "_id",
          as: "departamento",
        }
      },
      {
        $unwind: {
          path: "$departamento",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match:{
          "departamento.pais_id": ObjectId(pais_id),
          "nombre": nombre
        }
      },
      { $project: {
          "_id": "$_id",
          "nombre": {
            $concat: [
              "$nombre",
              ", ",
              "$provincia.nombre",
              ", ",
              "$departamento.nombre"
            ]
          },
        }
      },
      {
        $limit: 10
      },
    ])
    return docs._batch;
  }
});
~~~

Llamar funcion

~~~
db.eval('buscarDistrito("5b90a5b1ef627560f1251e4d","La Victoria")');
~~~

### Migraciones SQL

Migraciones con DBMATE - ubicaciones:

    $ dbmate -d "db/migrations" -e "DATABASE_UBICACIONES" new <<nombre_de_migracion>>
    $ dbmate -d "db/migrations" -e "DATABASE_UBICACIONES" up

### Comandos backup de MongoDB

    $ mongodump --db ubicaciones --host localhost --port 27017 --out db

### Comandos restore de MongoDB

    $ mongorestore --db ubicaciones --host localhost --port 27017 db/ubicaciones

---

Fuentes:

+ http://mongoosejs.com/docs/models.html
+ https://github.com/davidenq/hapi-routes-loader
+ https://stackoverflow.com/questions/7653080/adding-to-an-array-asynchronously-in-node-js
+ https://stackoverflow.com/questions/31331606/how-can-i-add-a-middleware-in-my-route
+ https://hapijs.com/tutorials/routing?lang=en_US
+ https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
+ https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program
+ https://futurestud.io/tutorials/hapi-how-to-handle-404-responses-for-missing-routes
