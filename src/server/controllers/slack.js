const post = (req, res) => {
  console.log(req.body);
  if (req.body.challenge) {
    return res.send(req.body.challenge);
  }
};

module.exports.post = post;
