const fs = require('fs');
const path = require('path');

const getLatestImage = (dir) => {
  let files = fs.readdirSync(UPLOAD_PATH);
  files.sort( (a, b) => {
    const x = fs.statSync(path.join(dir, a)).mtime.getTime();
    const y = fs.statSync(path.join(dir, b)).mtime.getTime();
    if (x < y) return 1;
    if (x > y) return -1;
  } );
  return files[0];
};

module.exports.getLatestImage = getLatestImage;