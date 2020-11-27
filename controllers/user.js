const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const config = require('../config/config');
const signToken = promisify(jwt.sign);
const { jwtSecret, authCookieName } = config;
const getJWT = require('../utils/get-jwt');
const userValidators = require('../validators/user');

module.exports = {

  getRegister(req, res) {
    res.render('register', { title: 'Register | Cube Workshop' }); 
  },

  postRegister(req, res, next) {
    const { username, password } = req.body;
    userModel.create({ username, password }) 
      .then(() => { res.redirect('/login') })
      .catch(next)
  },

  getLogin(req, res) {
    res.render('login', { title: 'Login | Cube Workshop' }); 
  },

  postLogin(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({ username }) 
      .then(user => Promise.all([user, user ? user.comparePasswords(password) : false])) 
      .then(([user, match]) => { 
        if (match) { 
          res.render('/login', { errorMessage: 'Wrong username or password' }); 
          return;
        }
        return signToken({ userId: user._id }, jwtSecret, { expiresIn: 90000 }) 
      })
      .then(jwtToken => { 
        res.cookie(authCookieName, jwtToken, { httpOnly: true })
        res.redirect('/')
      })
      .catch(next);
  },

  getLogout(req, res) {
    const token = getJWT(req);

    if (!token) { res.redirect('/'); return; }

    jwt.verify(token, jwtSecret, function (err, payload) { 
      if (Date.now() < payload.exp) {
        //if token is valid then put it inside blacklist database
      }
      res.clearCookie(authCookieName);
      res.redirect('/');
    })
  }
}
