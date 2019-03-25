import jwt from 'jsonwebtoken';

const authorize = (req, res, next) => {
  try {
    const authorization = req.headers.authorization.split(' ')[1];
    const { user, barId, staffCode } = jwt.verify(authorization, process.env.JWT_SK);
    req.user = user;
    req.barId = barId;
    req.staffCode = staffCode;
    next();
  } catch (err) {
    res.status(401).send('Error authorizing.');
  }
};

export default authorize;
