const multer = require('multer');
const mime = require('mime');

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
      case 'image/pnga':
        cb(null, true);
      default:
        req.fileValidationError = 'MIME TYPE ERR';
        return cb(null, false, new Error('goes wrong on the mimetype'));
    }
  }
}).single('image');


const get = (req, res) => {
  res.json({'sss' : 'sadada'});
};
const post = (req, res) => {
  upload(req, res , function(err) {
    if (req.fileValidationError) {
      return res.status(500).json({'Message': req.fileValidationError});
    }
    res.json({'sss' : 'sadada'})
  })
};

module.exports.get = get;
module.exports.post = post;