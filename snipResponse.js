
var snipcheck = require('./snipResponse-checks'), // response checks
    snipfunc  = require('./snipResponse-functions'); // response functions

module.exports = function (usertext, userdate) { 

  usertext = usertext.replace(/@snipedisbot/gi, '');
  usertext = usertext.replace(/\?/gi, ''); // TODO: onko tämä hyvä ?
  usertext = usertext.trim();

  // check if usertext needs a closer look

  if (snipcheck.coinflip(usertext)) {
    return snipfunc.coinflip(usertext);

  } else if (snipcheck.jaksaako(usertext)) {
    return snipfunc.jaksaako(usertext);

  } else if (snipcheck.sori(usertext)) {
    return snipfunc.sori(usertext);

  } else if (snipcheck.ensin(usertext)) {
    return snipfunc.ensin(usertext);

  } else if (snipcheck.kiitos(usertext)) {
    return snipfunc.kiitos(usertext);

  } else if (snipcheck.mitakaikkee(usertext)) {
    return snipfunc.mitakaikkee(usertext, userdate);

  } else if (snipcheck.mikavitun(usertext)) {
    return snipfunc.mikavitun(usertext);

  } else if (snipcheck.milloin(usertext)) {
    return snipfunc.milloin(usertext);

  } else {

    // responds which don't require analyzing of usertext

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
      case 'ime kikkii':
      case 'mee roskii':
      case 'kerro satu':
        return 'e';
        break;

      case '/420':
        return snipfunc.weed(userdate);
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

      case 'lol':
        return 'lol';
        break;

      case 'iltaa':
        return snipfunc.iltaa();
        break;

      case 'mitä tänää':
      case 'mitä tänään':
        return snipfunc.mitatapahtuu(userdate);
        break;

      case 'mitä huomenna':
        return snipfunc.mitatapahtuu(userdate + 86400); // seconds in 1 day
        break;

      default:
        return null;

    }

  }

}