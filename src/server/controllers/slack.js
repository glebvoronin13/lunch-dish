const promise = require('es6-promise');
const fetch = require('isomorphic-fetch');
const querystring = require('querystring');
const util = require('../util');

const post = (req, res) => {
  console.log(req.body);
  if (req.body.challenge) {
    return res.send(req.body.challenge);
  } else {
    return replyWithImage( req, res );
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
  let body = {
    token: 'xoxp-237354575379-238521105431-236808994576-dd750b0d1b1c519d1cefdbaf0aab03d0',
    channel: 'D6ZD4RTEF',
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

