
var fs        = require('fs'),
    request   = require('request'),
    calender  = require('./resources/kalenteri'),
    emoji     = require('node-emoji'),
    moment    = require('moment-timezone'),
    cheerio   = require('cheerio'),
    snipToss  = require('./snipToss');

moment.tz.setDefault('Europe/Helsinki');

var juurinyt = function () {

	var output = [];

	url = 'http://www.iltalehti.fi/';

	request(url, function(error, response, html) {
		if(!error){

			var $ = cheerio.load(html);

			$( ".juurinyt > p > a" ).each(function( index ) {
				console.log( index + ": " + $( this ).text() );
				output.push($( this ).text());
			});

		}

		return "<b>JUURI NYT:</b> " + snipToss(output);

	});
}

var coinflip = function (usertext) {

	// not just a coinflip really
	// basically split the usertext and output
	// one of the words

	// remove commas and ' vai '
	// then split string into array

	usertext = usertext.replace(/,/g, '').replace(/ vai /gi, ' ');

	var choices = usertext.split(' ');

	// add couple of random responses

	if (choices.length > 3) choices.push('Ei noist mikää');
	if (choices.length > 2) choices.push('Kaikki', 'emt jaksaaks ny arpoo');

	return snipToss(choices);

}

var jaksaako = function (usertext) {

	// basically, respond something random

	// random responds

	var responds = [
		'ei ehkä', 'vois', 'Ei ehkä jaksa',
		'harkitsen mutten tiiä jaksaako',
		'ehkä vois mut emt jaksaako', 'Ei jaksa',
		'katotaan', 'Jaksaneekohan', 'en tiiä jaksaako',
		'jaksaakohan', 'en oo päättäny vielä', 'pitäsköhä',
		emoji.get(':hankey:') + ' ei jaksa'];

	// moar responds if there is something after the first word

	if (usertext.indexOf(' ') > 0 ) {

		var textArgs = usertext.substr(usertext.indexOf(' '));
		responds.push(
			'ei ehkä jaksa' + textArgs,
			'en tiiä jaksaako' + textArgs,
			'ei varmaan jaksa' + textArgs,
			'vois ehk' + textArgs);

	}

	return snipToss(responds);

}

var kiitos = function (usertext) {

	// check emojis: http://www.emoji-cheat-sheet.com/

	var responds = [
		'ei mitään ' + emoji.get(':blush:'),
		'np ' + emoji.get(':blush:'),
		'Ei tarvitse kiittää ' + emoji.get(':blush:')];

	return snipToss(responds);

}

var ensin = function (usertext) {

	return 'sitten pajautus';

}

var sori = function (usertext) {

	// check emojis: http://www.emoji-cheat-sheet.com/

	var responds = [
		'Asia on jo käytännössä unohdettu ' + emoji.get(':blush:'),
		'Ei tarvitse pyytää anteeksi ' + emoji.get(':blush:')];

	return snipToss(responds);


}

var bobross = function () {

	// just picks one value from the 'randomArr' array
	// and returns it

	var responds = [
		'Ruined', 'Saved it', 'Charming little cabin',
		'Happy little trees'];

	return snipToss(responds);

}

var milloin = function (usertext) {

	// just find out if date for event

	usertext = usertext.toLowerCase();

	// go through calender and find event and date

	var eventdate, userevent;

	for (var i = calender.length - 1; i >= 0; i--) {
		if (usertext.indexOf(calender[i].name.toLowerCase()) > 0) {
			userevent = calender[i].name;
			eventdate = calender[i].date;

			break; // stop looping after date is found
		}
	};

	if (userevent) {
		return userevent + ' on ' + eventdate;
	} else {
		return 'emt ei oo kerrottu';
	}

}

var iltaa = function () {

	// just picks one value from the 'randomArr' array
	// and returns it

	var responds = [
		'iltaa', 'moro', 'Moro!', 'iltamia', 'Moro',
		'iltua', 'iltumia', 'illuttia', 'iltuuta',
		'iltamia', 'iltuu'];

	return snipToss(responds);

}

var benis = function () {

	// just picks one value from the 'randomArr' array
	// and returns it

	var responds = [
		':D', ':DDDDd', '>:D', ':DDDDDDD', 'BENIS :D :D',
		':DDD BENIS'];

	return snipToss(responds);

}

var mitakaikkee = function (usertext, userdate) {

	// check if there is more than one event on a date

	usertext = usertext.toLowerCase();

	// add one day to userdate if usertext includes 'huomenna'

	if (usertext.indexOf('huomenna') > 0) userdate += 86400;
	else if (usertext.indexOf('eilen') > 0) userdate -= 86400;

	// change userdate's unixtimestamp -> 'YYYY-MM-DD'

	userdate = moment.unix(userdate).format('YYYY-MM-DD');

	// go through calender and get userdate's event

	var userevents = [];

	for (var i = calender.length - 1; i >= 0; i--) {
		if (calender[i].date == userdate) {
			userevents.push(calender[i].name.toLowerCase());
		}
	};

	// return something (almost) random

	var responds = [];

	if (userevents.length > 0) {

		// playing with loops and clauses
		// so snipedi can return a sensible list of events

		var respond = '';

		for (var i = 0; i < userevents.length; i++) {

			respond += userevents[i];

			if (i + 2 == userevents.length) {
				respond += ' ja ';
				continue;

			} else if (i + 1 == userevents.length) {
				break;

			} else {
				respond += ', ';
				
			}

		}

		// TODO: get creative with responds

		responds.push(respond);

		return snipToss(responds);

	} else {

		return 'ei mitään :)';

	}

}

var mikavitun = function (usertext) {

	// just find out if there is description for event

	usertext = usertext.toLowerCase();

	// go through calender and find event and description

	var description, userevent;

	for (var i = calender.length - 1; i >= 0; i--) {
		if (usertext.indexOf(calender[i].name.toLowerCase()) > 0) {
			userevent = calender[i].name;
			description = calender[i].description;

			break; // stop looping after description is found
		}
	};

	// if description was found, return it 

	if (userevent && description) {

		// add random paragraph to description
		var paragraph = 'Kakattaa.'; // todo: get creative

		description = description.replace(
			'\n\n', '\n\n' + paragraph + '\n\n');

		return description;

	}

	else if (userevent && !description) {

		// if event was found, but it didn't have a description
		return 'emt ei oo kerrottu'; // todo: get creative

	}

	else {

		// if didn't even find a event
		return null;
		// todo: get creative? atm bot doesn't even respond

	}

}

var mitatapahtuu = function (userdate) {

	// find out if there is a corresponding event for userdate

	var weekday = moment.unix(userdate).weekday();

	// change userdate's unixtimestamp -> 'YYYY-MM-DD'

	userdate = moment.unix(userdate).format('YYYY-MM-DD');

	// go through calender and get userdate's event

	var userevents = [];

	for (var i = calender.length - 1; i >= 0; i--) {
		if (calender[i].date == userdate) {
			userevents.push(calender[i].name.toLowerCase());
		}
	};

	if (weekday == 4) userevents.push('kerhotorstai');

	// return something (almost) random

	var responds = [];

	if (userevents.length > 0) {

		// there might be more than one event per day
		// so pick one randomly

		var userevent = snipToss(userevents);

		responds.push(
			'ois ' + userevent + ' mut emt jaksaako',
			'joku ' + userevent + '? emt kinostaaks',
			'joku ' + userevent + ' ' + emoji.get(':hankey:') + emoji.get(':hankey:'),
			'öö joku ' + userevent + ' lol',
			'no olis ' + userevent + '? ei ehkä kiinnosta',
			'NO RYYPÄTÄÄ, se ois nimittäi ' + userevent);

	} else {

		// there was no event

		responds.push(
			'emt ei mitää kai',
			'ei mitää', 'emt', 'ensin palautus sitten pajautus',
			'vois nukkuu? tai emt jaksaaks',
			'kapinassa vois käyä muljulla jos jaksaa',
			'voisit mennä vaikka roskiin');

	}

	return snipToss(responds);

}

var weed = function (userdate) {

	var time = moment.unix(userdate).format('HH:mm');

	switch (time) {

		case '16:20':
		case '4:20':
			return 'https://vimeo.com/62917133';
			break;

		default:
			var responds = [
				'Kello on ' + time + ' typerys',
				'Kello on ' + time + emoji.get(':hankey:'),
				'Ei vielä' + emoji.get(':hankey:') + ' kello on ' + time];

			return snipToss(responds);
			
	}

}

// exports

module.exports = {
	weed: weed,
	iltaa: iltaa,
	mitatapahtuu: mitatapahtuu,
	jaksaako: jaksaako,
	bobross: bobross,
	coinflip: coinflip,
	kiitos: kiitos,
	sori: sori,
	mitakaikkee: mitakaikkee,
	milloin: milloin,
	mikavitun: mikavitun,
	ensin: ensin,
	benis: benis,
	juurinyt: juurinyt
}