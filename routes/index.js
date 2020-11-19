
const { Router } = require('express');
const cubes = require('../controllers/cubes');
const { getCube } = require('../controllers/database')
const { getAllCubes } = require('../controllers/cubes')

const router = Router();

router.get('/', function (req, res) {
  getAllCubes((cubes) => {
    res.render('index', {
      title: 'Cube Workshop',
      cubes
    });
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

router.get('/details/:id', (req, res) => {

  getCube(req.params.id, (cube) => {

    res.render('details', {
      title: 'Details | Cube Workshop',
      ...cube 
    });
  });
});

router.get('*', function (req, res) {
  res.render('404', {
    title: 'Cube Workshop'
  });
})
module.exports = router; 
