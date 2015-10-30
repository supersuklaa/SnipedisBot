
var snipfunc = require('./snipResponse-functions'); // response functions

module.exports = function (usertext) { 

  switch (usertext) {

    case '@SnipedisBot millon juilia saa hävetä?':
    case '@SnipedisBot millon juilia voi hävetä?':
    case '@SnipedisBot millon juilia pitää hävetä?':
      return 'Aina.';
      break;

    case '@SnipedisBot tee jotai':
      return 'e';
      break;

    case '@SnipedisBot isi ii':
      return 'cipitii';
      break;

    case '@SnipedisBot ou gii':
      return 'straight from da otherside';
      break;

    case '@SnipedisBot jaksaako':
      return snipfunc.jaksaako();
      break;

    case '/cam':
    case '/webcam':
      return snipfunc.cam();
      break;

    default:
      return 'En ymmärrä :(';

  }

}