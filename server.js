
var express        = require('express');
var bodyParser     = require('body-parser');
var request        = require('request');

var snipResponse   = require('./snipResponse');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var botToken = process.env.TELEGRAM_APIKEY;
var botURL = 'https://api.telegram.org/bot' + botToken;

app.post('/api/webhook', function (req, res) {

  // input the input

  var msg = req.body.message;

  var chat_id = msg['chat']['id'];
  var usertext = msg.text;
  var username = msg.from.username;

  // prepare the output

  var output = {};
  output.chat_id = chat_id;
  //output.text = '@' + username + ': '; // start the 'answer' with '@username: '
  output.text = snipResponse(username, usertext);

  // output the output

  request.post(botURL + '/sendMessage', {form: output},
    function (error, response, body) {
      if (!error) {

        res.status(200).send({});

      } else {

        res.status(500).send({});

      }
    });

});

app.listen(port);
console.log('App listening on port ' + port);