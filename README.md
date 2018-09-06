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

### Mmigraciones

Migraciones con DBMATE - ubicaciones:

    $ dbmate -d "db/migrations" -e "DATABASE_UBICACIONES" new <<nombre_de_migracion>>
    $ dbmate -d "db/migrations" -e "DATABASE_UBICACIONES" up

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
