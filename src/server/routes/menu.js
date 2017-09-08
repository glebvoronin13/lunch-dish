const menu = require('../controllers/menu');

module.exports = function(app, router) {
  router.route('/menu')
      .get(menu.get)
      .post(menu.post)
};