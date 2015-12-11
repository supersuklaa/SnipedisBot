
// In many cases, Snipeti returns randomly one value
// from an array. So this module does just that,

module.exports = function (input) {

	// Check if input is an array, and return one random value

	switch (input.constructor) {
		case Array:

			return input[Math.floor(Math.random() * input.length)];
			break;

		default:
			return input;
	}

}