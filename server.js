var express = require('express');
var request = require('request');
var app = express();

var port = process.env.PORT || 8080;

var botToken = "171954933:AAExHESfOfNnGLkjWUTuZvTiutgi7gOcTO4";
var botURL = "https://api.telegram.org/bot" + botToken;

app.get('/api/webhook', function (req, res) {
  request(botURL + '/getupdates', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.send(data['result'][0]['message']['text']);
    }
  })
});

app.listen(port);
console.log("App listening on port " + port);
