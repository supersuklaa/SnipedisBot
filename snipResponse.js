
var snipfunc = require('./snipResponse-functions'); // response functions

module.exports = function (usertext) { 

  // strip '@SnipedisBot ' from text and lowercase the rest

  usertext = usertext.replace('@SnipedisBot ', '');
  usertext = usertext.toLowerCase();

  switch (usertext.toLowerCase()) {

    case 'millon juilia saa hävetä?':
    case 'millon juilia voi hävetä?':
    case 'millon juilia pitää hävetä?':
      return 'Aina.';
      break;

    case '@SnipedisBot tee jotai':
      return 'e';
      break;

    case '@SnipedisBot isi ii':
    case '@SnipedisBot easy e':
    case '@SnipedisBot easy-e':
      return 'cipitii';
      break;

    case '@SnipedisBot ou gii':
    case '@SnipedisBot og':
      return 'straight from da otherside';
      break;

    case '@SnipedisBot jaksaako':
      return snipfunc.jaksaako();
      break;
/*
    case '/cam':
    case '/webcam':
      return snipfunc.cam();
      break;
*/
    case '/kahvutti':
      return 'Keitä ite.';
      break;

    default:
      return 'En ymmärrä :(';

  }

}