
var snipfunc = require('./snipResponse-functions'); // response functions

module.exports = function (usertext) { 

  // lowercase the text and remove '@snipedisbot '

  usertext = usertext.toLowerCase().replace('@snipedisbot ', '');
  usertext = usertext.replace('?', '').replace(',', '');

  var textsplit = usertext.split(" ");
  var textcount = textsplit.length;

  if (textsplit[textcount - 1] == 'vai') {
    textsplit.splice(textcount - 2, 1);

    console.log(textsplit);

    return snipfunc.coinflip(textsplit);
  }

  else {

    switch (usertext) {

      case 'millon juilia saa hävetä':
      case 'millon juilia voi hävetä':
      case 'millon juilia pitää hävetä':
        return 'Aina.';
        break;
  /*
      case '/420':
        return snipfunc.nextEpisode();
        break;
  */
      case '/bobross':
        return snipfunc.bobross();
        break;

      case 'tee jotai':
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
        return null;

    }

  }

}