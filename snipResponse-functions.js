
var fs        = require('fs'),
    request   = require('request'),
    calender  = require('./resources/kalenteri'),
    emoji     = require('node-emoji'),
    moment    = require('moment-timezone'),
    snipToss  = require('./snipToss');

moment.tz.setDefault('Europe/Helsinki');

var coinflip = function (usertext) {

	// not just a coinflip really
	// basically split the usertext and output
	// one of the words

	// remove commas and ' vai '
	// then split string into array

	usertext = usertext.replace(/,/g, '').replace(/ vai /gi, ' ');

	var textsplit = usertext.split(' ');

	// add couple of random responses

	if (textsplit.length > 3) textsplit.push('Ei noist mikää');
	if (textsplit.length > 2) textsplit.push('Kaikki', 'emt jaksaaks ny arpoo');

	return snipToss(textsplit);

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
			'ei varmaan jaksa' + textArgs);

	}

	return snipToss(responds);

}

var kiitos = function (usertext) {

	var responds = [
		'ei mitään', 'np', 'Ei tarvitse kiittää'];

	var output = snipToss(responds);

	// add funny emoji :)
	// check emojis: http://www.emoji-cheat-sheet.com/

	output += ' ' + emoji.get(':blush:');

	return output;

}

var sori = function (usertext) {

	var responds = [
		'Asia on jo käytännössä unohdettu',
		'Ei tarvitse pyytää anteeksi'];

	var output = snipToss(responds);

	// add funny emoji :)
	// check emojis: http://www.emoji-cheat-sheet.com/

	output += ' ' + emoji.get(':blush:');

	return output;


}

var bobross = function () {

	// just picks one value from the 'randomArr' array
	// and returns it

	var responds = [
		'Ruined', 'Saved it', 'Charming little cabin',
		'Happy little trees'];

	return snipToss(responds);

}

/*

	T O D O ! !


var cam = function () {

	var camurl = 'http://tietojohtajakilta.net/webcam/cam_1.jpg';
	var camfile = 'cam.jpg';

	request(camurl).pipe(fs.createWriteStream(camfile));

	return camfile;

}

*/

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

	var randomArr = [];

	if (userevents.length > 0) {

		// there might be more than one event per day
		// so pick one randomly

		var eventKey = Math.floor(Math.random() * userevents.length);
		var userevent = userevents[eventKey];

		randomArr.push(
			'ois ' + userevent + ' mut emt jaksaako',
			'joku ' + userevent + '? emt kinostaaks',
			'joku ' + userevent + ' ' + emoji.get(':hankey:') + emoji.get(':hankey:'),
			'öö joku ' + userevent + ' lol',
			'no olis ' + userevent + '? ei ehkä kiinnosta',
			'NO RYYPÄTÄÄ, se ois nimittäi ' + userevent);

	} else {

		// there was no event

		randomArr.push(
			'emt ei mitää kai', 'oisko se kerhotorstai',
			'ei mitää', 'emt', 'ensin palautus sitten pajautus',
			'vois nukkuu? tai emt jaksaaks',
			'kapinassa vois käyä muljulla jos jaksaa',
			'voisit mennä vaikka roskiin');

	}

	var randomKey = Math.floor(Math.random() * randomArr.length);
	var randomVal = randomArr[randomKey];

	return randomVal;

}

var weed = function () {

	var time = moment().format('HH:mm');

	switch (time) {

		case '16:20':
		case '4:20':
			return 'https://vimeo.com/62917133';
			break;

		default:
			var randomArr = [
				'Kello on ' + time + ' typerys',
				'Kello on ' + time + emoji.get(':hankey:'),
				'Ei vielä' + emoji.get(':hankey:') + ' kello on ' + time];

			var randomKey = Math.floor(Math.random() * randomArr.length);

			return randomArr[randomKey];
			
	}

}

// exports

module.exports = {
	weed: weed,
	mitatapahtuu: mitatapahtuu,
	jaksaako: jaksaako,
	bobross: bobross,
	coinflip: coinflip,
	kiitos: kiitos,
	sori: sori,
	mikavitun: mikavitun
}