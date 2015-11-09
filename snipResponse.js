
var snipfunc = require('./snipResponse-functions'); // response functions

module.exports = function (usertext) { 

  usertext = usertext.replace(/@snipedisbot /gi, '');
  usertext = usertext.replace('?', ''); // TODO: onko tämä hyvä ?

  // check if usertext corresponds to coinflip
  // else do the usual stuff

  if (snipfunc.coinflipCheck(usertext)) {

    return snipfunc.coinflip(usertext);

  else {

    usertext = usertext.toLowerCase();

    switch (usertext) {

      case 'millon juilia saa hävetä':
      case 'millon juilia voi hävetä':
      case 'millon juilia pitää hävetä':
        return 'Aina.';
        break;

      case '/bobross':
        return snipfunc.bobross();
        break;

      case 'tee jotai':
      case 'ime kullii':
        return 'e';
        break;

      case 'isi ii':
      case 'easy e':
      case 'easy-e':
        return 'C-P-T';
        break;

      case 'ou gii':
      case 'og':
        return 'straight from da otherside';
        break;

      case 'jaksaako':
      case 'mee roskii':
        return snipfunc.jaksaako();
        break;

      case '/kahvutti':
        return 'Keitä ite.';
        break;
  /*
      case '/420':
        return snipfunc.nextEpisode();
        break;

      case '/cam':
      case '/webcam':
        return snipfunc.cam();
        break;
  */
      default:
        return null;

    }

  }

}