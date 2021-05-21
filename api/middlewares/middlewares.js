const jwt = require('jsonwebtoken');

function checkTokenSetUser(req, res, next) {
  const authHeader = req.get('authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
          res.status(401);
          next(error);
        }  
        req.user = user;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
}

function isLoggedIn(req, res, next) {
  if(!req.user) {
    res.status(401);
    let error = new Error('You need to be logged in.')
    next(error);
  } else {
    next();
  }
}


module.exports = {
    checkTokenSetUser,
    isLoggedIn
};

