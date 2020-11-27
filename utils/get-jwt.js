const config = require('../config/config');
const { authHeaderName, authCookieName } = config;

module.exports = function getJWT(req){ //подаваме рекуест, той ни трябва
    //проверяваме дали е в куукито или в хедъра и го връщаме 
    return req.cookies[authCookieName]// || req.headers[authHeaderName]
}
