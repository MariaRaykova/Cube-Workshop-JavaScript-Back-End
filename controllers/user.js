const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const config = require('../config/config');

const signToken = promisify(jwt.sign);
const { jwtSecret, authCookieName } = config;

module.exports = {

getRegister(req, res) {
    res.render('register', { title: 'Register | Cube Workshop' }); //щом сме стигнали до тук значи не е логнат , isLogged: false ама няма да го слагаме за сега, само един път ще го сменим на труе като се логне
  },
postRegister(req, res, next){
  const { username, password, repeatPassword } = req.body;
   if(password !== repeatPassword){
     res.render('register', { errorMessage: 'Passwords don`t match'});
     return;
   }
    userModel.create({ username, password }) //това ще мине през save hook-a, ще ни хешира паролата
    .then(()=>{ res.redirect('/login') })
    .catch(next)
  },
 
getLogin(req, res) {

     res.render('login', { title: 'Login | Cube Workshop' }); //щом сме стигнали до тук значи не е логнат , isLogged: false ама няма да го слагаме за сега, само един път ще го сменим на труе като се логне
  
  },
  postLogin(req, res, next){
    const { username, password } = req.body;
    userModel.findOne({username}) //търсим потребител с този username FindOne, защото иначе ще върне масив
    .then(user => Promise.all([ user, user ? user.comparePasswords(password) : false])) //функцията, която си написахме в models/user.js, ако няма върни false. Вмъкнахме Promise.all za da moje da vurnem dve neshta - user i proverkata s fnkciqta
    .then(([user, match]) =>{ //дали се е мачнала//добавяме и user-a, който взехме от promise.all горе 
      if(match){ //ако не е мачнала
        res.render('/login', { errorMessage: 'Wrong username or password'}); //ако напишем само парола ще издадем, че имаме такъв потребител
        return;
      }
      return signToken({userId: user._id}, jwtSecret, {expiresIn: 90000} ) //sign има възможност да работи асинхронно и го правим..ще добавим promisify
    })
    .then(jwtToken =>{ //създадохме токен-а и го вземеме в then-a защото го направихме като промис
      res.cookie(authCookieName, jwtToken, {httpOnly: true}) 
      res.redirect('/')
    }) 
    .catch(next);
  },
  getLogout(req, res){
    res.clearCookie(authCookieName);
    res.redirect('/');
  }
}
