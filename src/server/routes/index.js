const menu = require('./menu');
const slack = require('./slack');

module.exports = function(app, express) {
  const router = express.Router();

  router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
  });

  menu(app, router);
  slack(app, router);

  app.use('/uploads', express.static(UPLOAD_PATH));
  app.use('/api', router);
};