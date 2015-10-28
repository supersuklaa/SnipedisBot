var express    = require('express');
var bodyParser = require('body-parser');
var request    = require('request');

var app = express();

// # Express middleware
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse json

var port = process.env.PORT || 8080;

var botToken = process.env.TELEGRAM_APIKEY;
var botURL = "https://api.telegram.org/bot" + botToken;

app.post('/api/webhook', function (req, res) {

  var msg = req.body.message;

  var data = {}
  data.chat_id = msg['chat']['id'];
  data.text = 'hi ;) ' + JSON.stringify(msg);

  console.log(JSON.stringify(msg));
  console.log(botToken);

  request.post(botURL + '/sendMessage', {form: data},
    function (error, response, body) {
      if (!error) {
        console.log(JSON.stringify(msg))
      }
    });

  res.status(200).send({});
});

app.listen(port);
console.log("App listening on port " + port);
