const config = require('../config/config');
const { authCookieName } = config;

module.exports = function getJWT(req){ 
    return req.cookies[authCookieName]
}
