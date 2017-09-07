const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Magic is live on port:  ' + port);
});