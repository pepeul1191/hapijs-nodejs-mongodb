const constants = require('./constants');

const demo = function (req, res) {
  console.log("middleware demo");
  return res.continue();
};

const csrf = function (req, res) {
  if (constants.data['ambiente_csrf'] == 'activo'){
    var key = constants.data.csrf['key'];
    var value = constants.data.csrf['value'];
    if(req.headers[key] != value){
      var rpta = JSON.stringify({
        tipo_mensaje: 'error',
        mensaje: [
          'No se puede acceder al recurso',
          'CSRF Token error'
      ]});
      //res(rpta).redirect('/error/access/505').takeover();
      res(rpta).code(500).takeover();
    }else{
      return res.continue();
    }
  }else{
    return res.continue();
  }
};

exports.demo= demo;
exports.csrf = csrf;
