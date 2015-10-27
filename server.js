var express    = require('express');
var bodyParser = require('body-parser');
var request    = require('request');

var app = express();

// # Express middleware
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse json

var port = process.env.PORT || 8080;

var botToken = "171954933:AAExHESfOfNnGLkjWUTuZvTiutgi7gOcTO4";
var botURL = "https://api.telegram.org/bot" + botToken;

app.post('/api/webhook', function (req, res) {
/*
  var msg = req.body;
  //request(botURL + '/getupdates', function (error, response, body) {

    console.log(msg);

    var chatid = msg['result'][0]['message']['chat']['id'];
*/
    var msg = req.body.message;
    
    console.log(req.body);

    var data = {}
    data.chat_id = 28837686;
    data.text = 'hi ' + ;

    //request.post(botURL + '/sendMessage', {form: data});

  //})
});

app.listen(port);
console.log("App listening on port " + port);
