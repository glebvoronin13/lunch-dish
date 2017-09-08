const post = (req, res) => {
  if (req.body.challenge) {
    return res.send(req.body.challenge);
  }
};

module.exports.post = post;
