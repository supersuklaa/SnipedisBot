
var fs        = require('fs'),
    request   = require('request'),
    calender  = require('./resources/kalenteri'),
    moment    = require('moment');

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

	var randomKey = Math.floor(Math.random() * textsplit.length);
	var randomVal = textsplit[randomKey];

	return randomVal;

}

var jaksaako = function (usertext) {

	// basically, respond something random

	// get everything after the first word

	var textArgs = usertext.substr(usertext.indexOf(' '));

	// random responds

	var randomArr = [
		'ei ehkä', 'vois', 'Ei ehkä jaksa',
		'harkitsen mutten tiiä jaksaako',
		'ehkä vois mut emt jaksaako', 'Ei jaksa',
		'katotaan', 'Jaksaneekohan', 'en tiiä jaksaako',
		'jaksaakohan', 'en oo päättäny vielä', 'pitäsköhä'];

	// moar responds if there is something after the first word

	if (textArgs) {
		randomArr.push(
			'ei ehkä jaksa' + textArgs,
			'en tiiä jaksaako' + textArgs,
			'ei varmaan jaksa' + textArgs);
	}

	// pick one random line

	var randomKey = Math.floor(Math.random() * randomArr.length);
	var randomVal = randomArr[randomKey];

	return randomVal;

}

var bobross = function () {

	// just picks one value from the 'randomArr' array
	// and returns it

	var randomArr = [
		'RUINED', 'SAVED IT', '420 PAINT IT', 'Charming little cabin',
		'Happy little trees'];

	var randomKey = Math.floor(Math.random() * randomArr.length);
	var randomVal = randomArr[randomKey];

	return randomVal;

}

/*
	T O D O ! !
*/

var cam = function () {

	var camurl = 'http://tietojohtajakilta.net/webcam/cam_1.jpg';
	var camfile = 'cam.jpg';

	request(camurl).pipe(fs.createWriteStream(camfile));

	return camfile;

}

var mikavitun = function (usertext) {

	// just find out if there is description for event

	usertext = usertext.toLowerCase();
	usertext = usertext.replace('mikä vitun ', '');

	var description, userevent;

	for (var i = calender.length - 1; i >= 0; i--) {
		if (calender[i].name.toLowerCase() == usertext) {
			description = calender[i].description;
			userevent = calender[i].name;

			break;
		}
	};

	if (description) {

		var paragraph = 'Kakattaa.'; // todo: get creative

		// add random paragraph to description
		description = description.replace(
			'\n\n', '\n\n' + paragraph + '\n\n');

		return description;

	} else if (userevent) {

		// if found event, but it didn't have a description

		return 'tuttu tapahtuma mut emt'; // todo: get creative

	} else {

		// if didn't even find event

		return 'emt'; // todo: get creative
	}

}

var mitatapahtuu = function (userdate) {

	// find out if there is a corresponding event for userdate

	var userevents = [];
	var randomArr = [];

	// change unixtimestamp to correspond .json-file's timestamp

	userdate = moment.unix(userdate).format("YYYY-MM-DD");

	// go tru kalenteri.json and get userdate's event

	for (var i = calender.length - 1; i >= 0; i--) {
		if (calender[i].date == userdate) {
			userevents.push(calender[i].name.toLowerCase());
		}
	};

	if (userevents.length > 0) {

		// there might be more than one event per day
		// so pick one randomly

		var eventKey = Math.floor(Math.random() * userevents.length);
		var userevent = userevents[eventKey];

		randomArr.push(
			'ois ' + userevent + ' mut emt jaksaako',
			'joku ' + userevent + '? emt kinostaaks',
			'öö joku ' + userevent + ' lol',
			'no olis ' + userevent + '? ei ehkä kiinnosta',
			'TÄNÄÄ RYYPÄTÄÄ, se ois nimittäi ' + userevent);

	} else {

		randomArr.push(
			'emt ei mitää kai',
			'ei mitää', 'vois nousta ehk',
			'emt', 'ensin palautus sitten pajautus',
			'vois nukkuu? tai emt jaksaaks',
			'kapinassa vois käyä muljulla jos jaksaa',
			'voisit mennä vaikka roskiin');

	}

	// return something random

	var randomKey = Math.floor(Math.random() * randomArr.length);
	var randomVal = randomArr[randomKey];

	return randomVal;

}

// exports

module.exports = {
	mitatapahtuu: mitatapahtuu,
	jaksaako: jaksaako,
	bobross: bobross,
	coinflip: coinflip,
	mikavitun: mikavitun,
	cam: cam
}