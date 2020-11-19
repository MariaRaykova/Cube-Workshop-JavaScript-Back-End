
const {Router} = require('express');

    const router = Router(); 

     router.get('/', function (req, res) { 
      res.render('index', {
        title: 'Cube Workshop'
      }); 
    })

    router.get('/about', function (req, res) { 
      res.render('about', {
        title: 'About | Cube Workshop'
      }); 
    })

    router.get('/create', function (req, res) { 
      res.render('create', {
        title: 'Create Cube | Cube Workshop'
      }); 
    })

    router.get('/details/:id', function (req, res) { 
      res.render('details', {
        title: 'Details | Cube Workshop'
      }); 
    })

    router.get('*', function (req, res) {  
      res.render('404', {
        title: 'Cube Workshop'
      }); 
    })
    module.exports = router; 
