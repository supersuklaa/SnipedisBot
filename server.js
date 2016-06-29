
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
  snipResponse(msg, function(ans, err) {
    if (!err) {
      request.post(botURL + '/sendMessage', {form: ans},
        function (error, response, body) {
          if (!error) {
            console.log(body);
          } else {
            console.log(error);
          }
        }
      );
    }
  });
  
  res.status(200).send({})

});

app.listen(port);
console.log('App listening on port ' + port);