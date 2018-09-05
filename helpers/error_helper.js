var constants = require('../config/constants');

var accessCss = function() {
  var rpta = [];
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
      'bower_components/bootstrap/dist/css/bootstrap.min',
      'bower_components/font-awesome/css/font-awesome.min',
      'bower_components/swp-backbone/assets/css/constants',
      'assets/css/constants',
      'assets/css/error',
    ];
  }
  if(constants.data.ambiente_static == 'produccion'){
    rpta = [
      'dist/test.min'
    ];
  }
  return rpta;
}

var accessJs = function() {
  var rpta = [];
  if(constants.data.ambiente_static == 'desarrollo'){
    rpta = [
      'assets/js/error',
    ];
  }
  if(constants.data.ambiente_static == 'produccion'){
    rpta = [
      'assets/js/error',
    ];
  }
  return rpta;
}

exports.accessCss = accessCss;
exports.accessJs = accessJs;
