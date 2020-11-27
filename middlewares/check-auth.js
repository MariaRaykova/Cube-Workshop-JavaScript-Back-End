module.exports = function checkAuth(shouldBeAuthenticated) {

    return function (req, res, next) {
       
        const isNotAuthWhenIsRequired = shouldBeAuthenticated && !req.user;
        if ((isNotAuthWhenIsRequired) || (!shouldBeAuthenticated && req.user)) {
            next(new Error('UNAUTHORIZED'));
            return;
        }
        next();
    };
};
