const jwtDecode = require('jwt-decode');

module.exports.authorize = (req, res, next) => {
  const { authorization } = req.headers;
  const user = jwtDecode(authorization);
  req.user = user;
  //
  // req.user = { email: "rachel@cwbar.com" }
  next();
};
