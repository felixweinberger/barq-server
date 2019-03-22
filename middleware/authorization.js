import jwt from 'jsonwebtoken';

const authorize = (req, res, next) => {
  const authorization = req.headers.authorization.split(' ')[1];
  const { user } = jwt.verify(authorization, process.env.JWT_SK);
  req.user = user;
  //
  // req.user = { email: "rachel@cwbar.com" }
  next();
};

export default authorize;
