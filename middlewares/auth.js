const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { jwtSecret, authHeaderName, authCookieName } = config;

module.exports = function () {

    const token = req.cookies[authCookieName] || req.headers[authHeaderName]
   
    if (!token) { next(); return; }
    
    jwt.verify(toker, jwtSecret, function (err, decoded) {
        if (err) { next(err); return; }
        req.user = { _id: decoded.userId };
        req.locals.isLogged = !!request.user;
        next();
    });
};