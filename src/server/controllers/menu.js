const multer = require('multer');
const mime = require('mime');

const util = require('../util');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    switch (file.mimetype) {
      case 'image/png':
      case 'image/jpeg':
        return cb(null, true);
      default:
        req.fileValidationError = 'MIME TYPE ERR';
        return cb(null, false, new Error('goes wrong on the mimetype'));
    }
  }
}).single('image');


const get = (req, res) => {
  try {
    const file = util.getLatestImage(UPLOAD_PATH);
    let status = 200;
    let body = {
      payload: `//${req.headers.host}/uploads/${file}`,
      message: 'Success'
    };
    if (!file) {
      status = 404;
      body = {
        payload: '',
        message: 'File not found'
      }
    }
    res.status(status).json(body);
  } catch (err) {
    console.log(err);
    res.status(400).json({'message': 'Bad Request'});
  }
};

const post = (req, res) => {
  upload(req, res , function(err) {
    if (req.fileValidationError) {
      return res.status(500).json({'message': req.fileValidationError});
    }
    res.json({'message' : 'Success'})
  })
};

module.exports.get = get;
module.exports.post = post;