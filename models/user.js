const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config')
const saltRounds = config.saltRounds;

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})
userSchema.methods.comparePasswords = function (providedPassword) {
    
    return new Promise((resolve, reject) => { 
        bcrypt.compare(providedPassword, this.password, (err, result) => { 
            if (err) { reject(err); return; }
            resolve(result); 
        })
    })
}
userSchema.pre('save', function (done) { 
    const currUser = this;

    if (!this.isModified('password')) {
       done();
       return;
    }
    
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) { done(err); return; }
        bcrypt.hash(currUser.password, salt, (err, hash) => {
            if (err) { done(err); return; }
            currUser.password = hash;
            done();
        })
    })
})
module.exports = new mongoose.model('user', userSchema); 
