module.exports = function isAuth(shouldBeAuthenticated) {

    return function (req, res, next) {

        const isNotAuthWhenIsRequired = shouldBeAuthenticated && !req.user;
      
        if ((isNotAuthWhenIsRequired) || (!shouldBeAuthenticated && req.user)) {
            req.redirect(isNotAuthWhenIsRequired ? '/login' : '/');
            return;
        }
        next();
    };
};