const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { jwtSecret } = config;
const getJWT = require('../utils/get-jwt');

module.exports = function (req, res, next) { 

    const token = getJWT(req);
    if (!token) { next(); return; } 
    //check if this token is not in the blacklist
    jwt.verify(token, jwtSecret, function (err, decoded) {
        req.user = { _id: decoded.userId };
        res.locals.isLogged = !!req.user;
        next();
    });
};
