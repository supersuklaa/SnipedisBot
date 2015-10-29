
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

  // Input the input

  var msg = req.body.message;

  var input = {};
  input.chat_id = msg['chat']['id'];
  input.text = msg.text;
  // input.command =  TODO  ! ! !
  input.username = msg.from.username;

  var output = {};
  output.chat_id = input.chat_id;

  output.text = '@' + input.username + ': '; // Start the 'answer' with '@username: '

  // Match input with output

  switch (input.text) {

    case '@SnipedisBot millon juilia saa hävetä?':
      output.text += 'Aina.';
      break;

    case '@SnipedisBot tee jotai':
      output.text += 'e';
      break;

    case '@SnipedisBot isi ii':
      output.text += 'cipitii';
      break;

    case '@SnipedisBot ou gii':
      output.text += 'straight from da otherside';
      break;

    case '@SnipedisBot jaksaako':
      var jaksaako = ['ei ehkä', 'vois', 'Ei ehkä jaksa', 'harkitsen mutten tiiä jaksaako',
                      'ehkä vois mut emt jaksaako', 'Ei jaksa', 'katotaan',
                      'en tiiä jaksaako', 'jaksaakohan', 'en oo päättäny vielä'];
      output.text += jaksaako[Math.floor((Math.random() * jaksaako.length))];
      break;

    case '@SnipedisBot ou gii':
      output.text += 'straight from da otherside';
      break;

    default:
      output.text += 'En ymmärrä :(';

  }

  // Output the output

  request.post(botURL + '/sendMessage', {form: output},
    function (error, response, body) {
      if (!error) {

        // TODO
        // ... something ?

        res.status(200).send({});

      }
    });

});

app.listen(port);
console.log('App listening on port ' + port);