
var mikavitun = function (usertext) {

	// check if usertext starts with 'mikä vitun'

	usertext = usertext.toLowerCase();

	if (usertext.substring(0, 10) == 'mikä vitun') return true;
	else return false;

}

var coinflip = function (usertext) {

	// split text into words
	// check if second to last is 'vai'

	// 'textcount > 2' only prevents bot reacting if
	// someone says 'vai vai'

	var textsplit = usertext.split(' ');
	var textcount = textsplit.length;
	var secondtolast = textsplit[textcount - 2];

	if (textcount > 2 && secondtolast.toLowerCase() == 'vai') return true;
	else return false;

}

var jaksaako = function (usertext) {

	// check if usertext starts with 'jaksaako' or something like that

	var textsplit = usertext.split(' ');
	var firstword = textsplit[0].toLowerCase();

	switch (firstword) {

		case 'jaksaako':
		case 'jaksaakohan':
		case 'jaksaisko':
		case 'jaksasko':
			return true;
			break;

		default:
			return false;

	}

}

// exports

module.exports = {
	jaksaako: jaksaako,
	coinflip: coinflip,
	mikavitun: mikavitun
}