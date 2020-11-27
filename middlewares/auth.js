const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { jwtSecret, authCookieName, authHeaderName } = config;

module.exports = function (req, res, next) { //при всеки рекуест 

    const token = req.cookies[authCookieName] //|| req.headers[authHeaderName] //или може да използваме heder-a - ако имаме мобилно приложение, нямаме куукие и направо в рекуст хедъра сме сложили token-a - authHeaderName - направихме го в config/config
    if (!token) { next(); return; } //ако token-а го няма ще извикаме next и ще преценим какво ще правим и ще си ретърнем
    //ако съществува ще го декоднем:
    jwt.verify(token, jwtSecret, function (err, decoded) {//няма да го преобразуваме до промис, защото е прост файла, ще си го оставим с call back, kojto shte vzema err and decoded
        if (err) { next(err); return; }
        req.user = { _id: decoded.userId };
        res.locals.isLogged = !!req.user;
        next();
    });
};
