var milloin = function (usertext) {

	// check if usertext starts with 'milloin on'

	usertext = usertext.toLowerCase();

	if (usertext.substring(0, 11) == 'milloin on ') return true;
	else return false;

}

var benis = function (usertext) {

	// check if usertext starts with 'benis'

	usertext = usertext.toLowerCase();

	if (usertext.substring(0, 5) == 'benis') return true;
	else return false;

}

var mitakaikkee = function (usertext) {

	// check if usertext starts with 'mitä kaikkee'

	usertext = usertext.toLowerCase();

	if (usertext.substring(0, 13) == 'mitä kaikkee ') return true;
	else return false;

}

var mikavitun = function (usertext) {

	// check if usertext starts with 'mikä vitun'

	usertext = usertext.toLowerCase();

	if (usertext.substring(0, 11) == 'mikä vitun ') return true;
	else if (usertext.substring(0, 7) == 'selitä ') return true;
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

var sori = function (usertext) {

	// check if usertext starts with 'kiitos' or something like that

	var textsplit = usertext.split(' ');
	var firstword = textsplit[0].toLowerCase();

	switch (firstword) {

		case 'sori':
		case 'anteeks':
		case 'anteeksi':
			return true;
			break;

		default:
			return false;

	}
}

var ensin = function (usertext) {

	// check if usertext starts with 'kiitos' or something like that

	var textsplit = usertext.split(' ');
	var firstword = textsplit[0].toLowerCase();

	if (firstword == 'ensin' && textsplit.length > 1) {

		return true;

	}

	return false;
}

var kiitos = function (usertext) {

	// check if usertext starts with 'kiitos' or something like that

	var textsplit = usertext.split(' ');
	var firstword = textsplit[0].toLowerCase();

	switch (firstword) {

		case 'kiitän':
		case 'kiitos':
		case 'kiitoksia':
		case 'kitos':
		case 'kiitti':
			return true;
			break;

		default:
			return false;

	}
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
		case 'jaksaaks':
		case 'jaksaneeko':
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
	mitakaikkee: mitakaikkee,
	kiitos: kiitos,
	sori: sori,
	milloin: milloin,
	mikavitun: mikavitun,
	ensin: ensin,
	benis: benis
}