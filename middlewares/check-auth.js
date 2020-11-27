module.exports = function checkAuth(shouldBeAuthenticated) {

    return function(req, res, next) {
        //ако трябва да сме аутентикирани, а няма такъв user значи не сме или друиия condition - не трябва да сме аутентикирани, а сме аутентикирани да редирк
        const isNotAuthWhenIsRequired = shouldBeAuthenticated && !req.user;
        if ((isNotAuthWhenIsRequired) || (!shouldBeAuthenticated && req.user)) {
          res.redirect(isNotAuthWhenIsRequired ? '/login' : '/');
            return;
        }
        next();
    };
};
