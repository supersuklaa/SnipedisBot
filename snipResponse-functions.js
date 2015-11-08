
var fs       = require('fs');
var request  = require('request');

var jaksaako = function () {

	// just picks one value from the 'randomArr' array
	// and returns it

	var randomArr = [
		'ei ehkä', 'vois', 'Ei ehkä jaksa', 'harkitsen mutten tiiä jaksaako',
		'ehkä vois mut emt jaksaako', 'Ei jaksa', 'katotaan',
		'en tiiä jaksaako', 'jaksaakohan', 'en oo päättäny vielä'];

	var randomKey = Math.floor(Math.random() * randomArr.length);
	var randomVal = randomArr[randomKey];

	return randomVal;

}

var coinflip = function (usertext) {

	// remove commas and ' vai '
	// then split string into array and return random value

	usertext = usertext.replace(/,/g, '').replace(/ vai /gi, ' ');

	var textsplit = usertext.split(' ');

	if (textsplit.length > 3) textsplit.push('Ei noist mikää');
	if (textsplit.length > 2) textsplit.push('Kaikki');

	var randomKey = Math.floor(Math.random() * textsplit.length);
	var randomVal = textsplit[randomKey];

	return randomVal;

}

var coinflipCheck = function (usertext) {

	var textsplit = usertext.split(' ');
	var textcount = textsplit.length;
	var secondlastword = textsplit[textcount - 2].toLowerCase();

	if (secondlastword == 'vai' && textcount > 2) return true;
	else return false;

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

// exports

module.exports = {
	jaksaako: jaksaako,
	bobross: bobross,
	coinflip: coinflip,
	coinflipCheck: coinflipCheck,
	cam: cam
}