
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

	usertext = usertext.replace(', ', ' ');

	var textsplit = usertext.split(" ");
	var textcount = textsplit.length;

	textsplit.splice(textcount - 2, 1);

	var randomKey = Math.floor(Math.random() * textcount);
	var randomVal = textsplit[randomKey];

	return randomVal;

}

var coinflipCheck = function (usertext) {

	var textsplit = usertext.split(" ");
	var textcount = textsplit.length;

	if (textsplit[textcount - 2] == 'vai') return true;
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