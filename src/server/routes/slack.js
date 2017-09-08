const slack = require('../controllers/slack');

module.exports = function(app, router) {
  router.route('/slack/receive')
      .post(slack.post)
};