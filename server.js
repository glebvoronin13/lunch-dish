const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./src/server/routes');

const port = process.env.PORT || 8080;

UPLOAD_PATH = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_PATH)){
  fs.mkdirSync(UPLOAD_PATH);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

routes(app, express);

app.listen(port, () => {
  console.log('Magic is live on port:  ' + port);
});