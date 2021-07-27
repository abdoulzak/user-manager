// @ts-nocheck
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //console.log(jwt.verify(req.headers.authorization, 'Saving_Money_Secret_Token'));
  //console.log(req.body);
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'Saving_Money_Secret_Token');
    const userId = decodedToken.userId;
    if (req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};