const promise = require('es6-promise');
const fetch = require('isomorphic-fetch');
const querystring = require('querystring');
const util = require('../util');
const constants = require('../constants');

const post = (req, res) => {
  console.log(req.body);
  if (req.body.challenge) {
    return res.send(req.body.challenge);
  }
  switch (true) {
    case (req.body.event.text === 'get'):
    case (req.body.event.text.toLowerCase() === 'What\'s for lunch?'.toLowerCase()):
      return replyWithImage( req, res );
    case (req.body.event.bot_id):
      return res.end();
    default:
      return res.end();
  }
};

module.exports.post = post;

const replyWithImage = (request, response) => {
  const file = util.getLatestImage(UPLOAD_PATH);
  const att = [{
    title: `Today's dish`,
    image_url: `https://${req.headers.host}/uploads/${file}`
  }];
  let attachments;
  try {
    attachments = JSON.stringify(att);
  } catch(e) {
    attachments = '';
  }
  const channel = res.body.event.channel;
  let body = {
    token: constants.SLACK_BOT_TOKEN,
    channel: channel,
    text: 'Test',
    type: 'message',
    attachments: attachments,
  };
  const messageString = querystring.stringify(body);
  fetch('https://slack.com/api/chat.postMessage',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: messageString
      }
    )
      .then((resp) => resp.json())
      .then(
        (res) => {
          return response.send(res);
        },
        (err) => {
          return response.send(err);
        }
      )
};

