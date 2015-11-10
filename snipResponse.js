
var snipcheck = require('./snipResponse-checks'), // response checks
    snipfunc  = require('./snipResponse-functions'); // response functions

module.exports = function (usertext, userdate) { 

  usertext = usertext.replace(/@snipedisbot /gi, '');
  usertext = usertext.replace('?', ''); // TODO: onko tämä hyvä ?

  // check if usertext corresponds to
  // - coinflip
  // - jaksaako
  // else do the usual stuff

  if (snipcheck.coinflip(usertext)) {

    return snipfunc.coinflip(usertext);

  } else if (snipcheck.jaksaako(usertext)) {

    return snipfunc.jaksaako(usertext);

  } else {

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

      case '420':
        return 'https://vimeo.com/62917133';
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

      case '/kahvutti':
        return 'Keitä ite.';
        break;

      case 'mitä tänää':
      case 'mitä tänään':
        return snipfunc.mitatapahtuu(usertext, userdate);
        break;

      case 'mitä huomenna':
        return snipfunc.mitatapahtuu(
          usertext, userdate + 86400); // seconds in 1 day
        break;

      default:
        return null;

    }

  }

}