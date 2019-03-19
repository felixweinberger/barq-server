module.exports.authorize = (req, res, next) => {
  req.user = { email: 'rachel@cwbar.com' };
  next();
};
