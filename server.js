var express = require('express');
var request = require('request');
var app = express();

var port = process.env.PORT || 8080;

var botToken = "171954933:AAExHESfOfNnGLkjWUTuZvTiutgi7gOcTO4";
var botURL = "https://api.telegram.org/bot" + botToken;

app.post('/api/webhook', function (req, res) {

  var msg = req.body;
  var chatid = msg['result'][0]['message']['chat']['id'];

  var data = {}
  data.chat_id = chatid;
  data.text = 'hi :)';

  request.post(botURL + '/sendMessage', {form: data})
});

app.listen(port);
console.log("App listening on port " + port);
