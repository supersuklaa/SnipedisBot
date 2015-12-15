
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

  console.log(msg);

  var chat_id = msg.chat.id;
  var usertext = msg.text;
  var userdate = msg.date;
  var username = msg.from.username;
  var usersticker = msg.sticker;

  // If user sends this one specific sticker, bot responds
  // with same sticker.

  // TODO make everything more beautiful regarding this

  // Snipedi sticker id

  var snipeti_id = 'BQADAgADzwoAAh1J_wABFyAPIKIKFDoC';

  // prepare the output

  var output = {};
  var method;

  if (usertext && snipResponse(usertext, userdate)) {

    output.chat_id = chat_id;
    // output.text = '@' + username + ': '; // start the 'answer' with '@username: '
    output.text = snipResponse(usertext, userdate);

    method = 'sendMessage';
    
  } else if (usersticker.file_id == snipeti_id) {

    output.chat_id = chat_id;
    output.sticker = usersticker.file_id;

    method = 'sendSticker';

  }

  // output the output

  request.post(botURL + '/' + method, {form: output},
    function (error, response, body) {
      if (!error) {

        res.status(200).send({});

        console.log(output);

      } else {

        res.status(500).send({});

        console.log(error);

      }
    });

});

app.listen(port);
console.log('App listening on port ' + port);