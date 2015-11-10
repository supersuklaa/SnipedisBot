
var fs        = require('fs'),
    request   = require('request'),
    kalenteri = require('./resources/kalenteri'),
    moment    = require('moment');

var coinflip = function (usertext) {

	// remove commas and ' vai '
	// then split string into array and return random value

	usertext = usertext.replace(/,/g, '').replace(/ vai /gi, ' ');

	var textsplit = usertext.split(' ');

	// add couple of random responses :--)

	if (textsplit.length > 3) textsplit.push('Ei noist mikää');
	if (textsplit.length > 2) textsplit.push('Kaikki', 'emt jaksaaks ny arpoo');

	var randomKey = Math.floor(Math.random() * textsplit.length);
	var randomVal = textsplit[randomKey];

	return randomVal;

}

var jaksaako = function (usertext) {

	// get everything after the first word

	var textArgs = usertext.substr(usertext.indexOf(' '));

	// random responds

	var randomArr = [
		'ei ehkä', 'vois', 'Ei ehkä jaksa', 'harkitsen mutten tiiä jaksaako',
		'ehkä vois mut emt jaksaako', 'Ei jaksa', 'katotaan', 'Jaksaneekohan',
		'en tiiä jaksaako', 'jaksaakohan', 'en oo päättäny vielä'];

	// moar responds if there is something after the first word

	if (usertext.indexOf(' ') > 0) {
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

var mitatapahtuu = function (userdate) {

	userdate = moment.unix(userdate).format("YYYY-MM-DD");
	var userevent;
	var randomArr = [];

	for (var i = kalenteri.length - 1; i >= 0; i--) {
		if (kalenteri[i].date == userdate) {
			userevent = kalenteri[i].name;
		}
	};

	if (userevent) {
		randomArr.push(
			'ois ' + userevent + ' mut emt jaksaako',
			'joku ' + userevent + '? emt kinostaaks');
	} else {
		randomArr.push(
			'emt ei mitää kai',
			'ei mitää');
	}

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
	cam: cam
}