const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth')

module.exports = (app) => {

    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({ extname: '.hbs' }));
    app.set('view engine', '.hbs');


    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true })) //ако искаме да използваме json трябва да сетнем .json, но ние не сме стигнали тази стъпка да ползваме да json, когато пращаме данните, сега позлваме форми 
    app.use(auth);
    //TODO: Setup the static files
    const staticFileFullPath = path.join(global.__basedir, 'static'); //може със и без /
    app.use(express.static(staticFileFullPath))

    app.use(function (err, req, res, next) {
        if (err.message === 'BAD_REQUEST') {
            res.status(400);
            return;
        }
        if (err.message === 'UNAUTHORIZED') {//хубаво е да си ги изнесем като константи а тук да не работим директно със стрингове 
            res.redirect('/')
            return;
        }
    })
};