
const cubeController = require('../controllers/cube')
const accessoryController = require('../controllers/accessory')
const userController = require('../controllers/user')
const checkAuth = require('../middlewares/check-auth');
const userValidators = require('../validators/user');
const handleValidationErrors = require('../middlewares/handle-validation-errors')
const setValidationErrorViewName = require('../middlewares/set-validation-error-view-name');

module.exports = (app) => {

  app.get('/', cubeController.getCubes);

  app.get('/about', function (req, res) {
    res.render('/about', { title: 'Cube Workshop' })
  });

  app.get('/register',
    checkAuth(false),
    userController.getRegister
  );
  app.post('/register',
    checkAuth(false),
    setValidationErrorViewName('register'),
    userValidators.checkUsernameExistence,
    userValidators.repeatPasswordCheck,
    handleValidationErrors,
    userController.postRegister
  );

  app.get('/edit/:id', checkAuth(true), cubeController.getEditCube);
  app.post('/edit/:id', checkAuth(true), cubeController.postEditCube);

  app.get('/delete/:id', checkAuth(true), cubeController.getDeleteCube);
  app.post('/delete/:id', checkAuth(true), cubeController.postDeleteCube);

  app.get('/login', checkAuth(false), userController.getLogin);
  app.post('/login', checkAuth(false), userController.postLogin);

  app.get('/logout', checkAuth(true), userController.getLogout);

  app.get('/details/:id', cubeController.getCube);

  app.post('/create', checkAuth(true), cubeController.postCreateCube);
  app.get('/create', checkAuth(true), cubeController.getCreateCube);

  app.get('/details/:id', cubeController.getCube);

  app.get('/attach/accessory/:id', checkAuth(true), accessoryController.getAttachAccessory);
  app.post('/attach/accessory/:id', checkAuth(true), accessoryController.postAttachAccessory);

  app.get('/create/accessory', checkAuth(true), accessoryController.getCreateAccessory);//'/create/accessory' го видяхме от action в html-a на hbs na create-accessory
  app.post('/create/accessory', checkAuth(true), accessoryController.postCreateAccessory);

  app.get('*', function (req, res) {
    res.render('404', { title: 'Cube Workshop' })
  });
}