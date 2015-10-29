
var express    = require('express');
var bodyParser = require('body-parser');
var request    = require('request');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var botToken = process.env.TELEGRAM_APIKEY;
var botURL = 'https://api.telegram.org/bot' + botToken;

app.post('/api/webhook', function (req, res) {

  var msg = req.body.message;

  var input = {};
  input.chat_id = msg['chat']['id'];
  input.text = msg.text;
  input.command = input.text; // ! ! !  TODO  ! ! !
  input.username = msg.from.username;

  var output = {};
  output.chat_id = input.chat_id;

  switch (input.command) {
    case '@SnipedisBot millon käyttäjää @juili saa hävetä?':
      output.text = '@' + input.username + ': Aina.';
    case '@SnipedisBot tee jotai':
      output.text = 'e';
  }

  request.post(botURL + '/sendMessage', {form: output},
    function (error, response, body) {
      if (!error) {

        // TODO
        // ... something ?

      }
    });

  res.status(200).send({});

});

app.listen(port);
console.log('App listening on port ' + port);