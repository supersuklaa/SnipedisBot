
var express      = require('express');
var bodyParser   = require('body-parser');
var request      = require('request');

var snipResponse = require('./snipResponse');
var snipToss     = require('./snipToss');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var botToken = process.env.TELEGRAM_APIKEY;
var botURL = 'https://api.telegram.org/bot' + botToken;

app.post('/api/webhook', function (req, res) {

  // input the input

  var msg = req.body.message;

  console.log(msg);

  if (msg) {
    var chat_id = msg.chat.id;
    var usertext = msg.text;
    var userdate = msg.date;
    var username = msg.from.username;
    var usersticker = msg.sticker;
  }

  var output = {};
  var method;

  if (usertext && snipResponse(usertext, userdate)) {

    output.chat_id = chat_id;
    output.text = snipResponse(usertext, userdate);

    method = 'sendMessage';
    
  }

  // output the output

  request.post(botURL + '/' + method, {form: output},
    function (error, response, body) {
      if (!error) {

        console.log(body);

      } else {

        console.log(error);

      }
    });

  res.status(200).send({})

});

app.listen(port);
console.log('App listening on port ' + port);