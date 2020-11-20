const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

module.exports = (app) => {

    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({ extname: '.hbs' }));
    app.set('view engine', '.hbs');

    //TODO: Setup the body parser
    app.use(express.urlencoded({ extended: true })) //ако искаме да използваме json трябва да сетнем .json, но ние не сме стигнали тази стъпка да ползваме да json, когато пращаме данните, сега позлваме форми 

    //TODO: Setup the static files
    const staticFileFullPath = path.join(global.__basedir, 'static'); //може със и без /
    app.use(express.static(staticFileFullPath))
};