
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const userController = require('../controllers/user');
const checkAuth = require('../middlewares/check-auth');

module.exports = (app) => {

  app.get('/', cubeController.getCubes);

  app.get('/about', function (req, res) {
    res.render('/about', { title: 'About | Cube Workshop'});
  });

  app.get('/register',checkAuth(false), userController.getRegister);
  app.post('/register', checkAuth(false), userController.postRegister); 
  
  app.get('/login' ,checkAuth(false), userController.getLogin);
  app.post('/login',checkAuth(false), userController.postLogin);

  app.get('/logout' ,checkAuth(true), userController.getLogout);

  app.get('/details/:id', cubeController.getCube);

  app.get('/create', checkAuth(true), cubeController.getCreateCube);
  app.post('/create',checkAuth(true), cubeController.postCreateCube);


  app.get('/edit/:id', checkAuth(true), cubeController.getEditCube);
  app.post('/edit/:id',checkAuth(true), cubeController.postEditCube);

  app.get('/delete/:id', checkAuth(true), cubeController.getDeleteCube);
  app.post('/delete/:id', checkAuth(true), cubeController.postDeleteCube);

  app.get('/attach/accessory/:id', checkAuth(true), accessoryController.getAttachAccessory);
  app.post('/attach/accessory/:id', checkAuth(true), accessoryController.postAttachAccessory);

  app.get('/create/accessory', checkAuth(true), accessoryController.getCreateAccessory);
  app.post('/create/accessory', checkAuth(true), accessoryController.postCreateAccessory);
  
  app.get('*', function (req, res) {
    res.render('404', { title: 'Cube Workshop'});
  });
}