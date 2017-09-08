const promise = require('es6-promise');
const fetch = require('isomorphic-fetch');
const querystring = require('querystring');
const util = require('../util');
const constants = require('../constants');

const post = (req, res) => {
  if (req.body.challenge) {
    return res.send(req.body.challenge);
  }
  switch (true) {
    case (req.body.event.bot_id):
    case (constants.SLACK_BOT_VERIFICATION_TOKEN !== req.body.token):
      return res.end();
    case (req.body.event.text === 'get'):
    case (req.body.event.text.toLowerCase() === 'What\'s for lunch?'.toLowerCase()):
    case (req.body.event.text.toLowerCase() === 'What is for lunch?'.toLowerCase()):
      return replyWithImage( req, res );
    default:
      return res.end();
  }
};

module.exports.post = post;

const replyWithImage = (request, response) => {
  const file = util.getLatestImage(UPLOAD_PATH);
  const channel = response.body.event.channel;
  let attachments = '';

  try {
    attachments = JSON.stringify(
        [{
          title: `Today's menu:`,
          image_url: `https://${request.headers.host}/uploads/${file}`
        }]
    );
  } catch(e) {
    attachments = '';
  }

  let body = {
    token: constants.SLACK_BOT_TOKEN,
    channel: channel,
    text: (file) ? '' : 'Sorry, there is no menu',
    type: 'message',
    attachments: (file) ? attachments : '',
  };
  fetch(constants.API.CHAT_POST_MESSAGE,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify(body)
      }
  )
  .then((resp) => resp.json())
  .then(
    (res) => {
      return response.send(res);
    },
    (err) => {
      return response.end(err);
    }
  )
};

