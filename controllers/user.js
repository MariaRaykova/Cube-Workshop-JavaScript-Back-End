const userModel = require('../models/user');
const config = require('../config/config')
const { jwtSecret, authCookieName } = config;
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const signToken = promisify(jwt.sign); 

module.exports = {

  getRegister(req, res) {

    res.render('register', { title: 'Register | Cube Workshop' }); 
  },

  postRegister(req, res, next) {

    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      res.render('register', { errorMessage: 'Passwords don`t match' });
      return;
    }

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
        if (!match) { 
          res.render('register', { errorMessage: 'Wrong username or password' }); 
          return;
        }
        return signToken({ userId: user._id }, jwtSecret);
      })
      .then(jwtToken => { 
        res.cookie(cookieName, jwtToken, { httpOnly: true })
        res.redirect('/');
      })
      .catch(next);
  },

  getLogout(req, res) {

    res.cleardCookie(authCookieName); 
    res.render('/');
  }
}