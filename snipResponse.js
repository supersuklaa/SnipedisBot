
var snipcheck = require('./snipResponse-checks'), // response checks
    snipfunc  = require('./snipResponse-functions'); // response functions

module.exports = function (msg, cb) { 

  if (!msg || !msg.text) {
    cb(false, true);
    return;
  }

  var usertext = msg.text;
  var sniptext = '';

  usertext = usertext.replace(/@snipedisbot/gi, '');
  usertext = usertext.replace(/\?/gi, ''); // TODO: onko tämä hyvä ?
  usertext = usertext.trim();

  // check if usertext needs a closer look

  if (snipcheck.coinflip(usertext)) {
    sniptext = snipfunc.coinflip(usertext);

  } else if (snipcheck.jaksaako(usertext)) {
    sniptext = snipfunc.jaksaako(usertext);

  } else if (snipcheck.sori(usertext)) {
    sniptext = snipfunc.sori(usertext);

  } else if (snipcheck.ensin(usertext)) {
    sniptext = snipfunc.ensin(usertext);

  } else if (snipcheck.kiitos(usertext)) {
    sniptext = snipfunc.kiitos(usertext);

  } else if (snipcheck.mitakaikkee(usertext)) {
    sniptext = snipfunc.mitakaikkee(usertext, userdate);

  } else if (snipcheck.mikavitun(usertext)) {
    sniptext = snipfunc.mikavitun(usertext);

  } else if (snipcheck.milloin(usertext)) {
    sniptext = snipfunc.milloin(usertext);

  } else if (snipcheck.benis(usertext)) {
    sniptext = snipfunc.benis(usertext);

  } else {

    // responds which don't require analyzing of usertext

    usertext = usertext.toLowerCase();

    switch (usertext) {

      case 'millon juilia saa hävetä':
      case 'millon juilia voi hävetä':
      case 'millon juilia pitää hävetä':
        sniptext = 'Aina.';
        break;

      case '/bobross':
        sniptext = snipfunc.bobross();
        break;

      case 'tee jotai':
      case 'ime kullii':
      case 'ime kikkii':
      case 'mee roskii':
      case 'kerro satu':
        sniptext = 'e';
        break;

      case '/420':
        sniptext = snipfunc.weed(userdate);
        break;

      case 'isi ii':
      case 'easy e':
      case 'easy-e':
        sniptext = 'C-P-T';
        break;

      case 'ou gii':
      case 'og':
        sniptext = 'straight from da otherside';
        break;

      case '/kahvutti':
        sniptext = 'Keitä ite.';
        break;

      case 'lol':
        sniptext = 'lol';
        break;

      case 'iltaa':
      case 'iltua':
      case 'iltuu':
      case 'ehtoota':
      case 'moro':
      case 'illuttia':
      case 'iltamia':
        sniptext = snipfunc.iltaa();
        break;

      case 'mitä tänää':
      case 'mitä tänään':
        sniptext = snipfunc.mitatapahtuu(userdate);
        break;

      case 'mitä juuri nyt':
        snipfunc.juurinyt(function(aihe) {
          cb({
            "chat_id": msg.chat.id,
            "parse_mode": "HTML",
            "text": "<b>JUURI NYT</b>: " + aihe
          }, false);
        });
        return;
        break;

      case 'mitä huomenna':
        sniptext = snipfunc.mitatapahtuu(userdate + 86400); // seconds in 1 day
        break;

      default:
        sniptext = '';

    }

  }

  cb({
    "chat_id": msg.chat.id,
    "text": sniptext
  }, false);

}