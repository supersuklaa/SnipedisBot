
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

    case 'tee jotai':
      return 'e';
      break;

    case 'isi ii':
    case 'easy e':
    case 'easy-e':
      return 'cipitii';
      break;

    case 'ou gii':
    case 'og':
      return 'straight from da otherside';
      break;

    case 'jaksaako':
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