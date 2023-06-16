const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('./exceptions');
const { users: usersMessage } = require('./response-message');

// JWT Token Verification
const verifyToken = (req, res, next) => {
  const authTokenHeader = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;
  if (!authTokenHeader) throw new AuthenticationError(usersMessage.tokenRequired);

  // Get the authorization token from the header
  const token = authTokenHeader.split(' ')[1];
  if (token == null) throw new AuthenticationError(usersMessage.invalidToken);

  // Verify token
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) throw new AuthenticationError(`${usersMessage.invalidToken} // ${err}`);
    req.user = user;
    next()
  });
};

// Authorization for admin-only endpoints
const verifyAccess = (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') throw new AuthenticationError(usersMessage.unauthorizedAccess);
  next();
};

module.exports = { verifyToken, verifyAccess };