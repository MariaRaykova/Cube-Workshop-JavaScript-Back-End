const mongoose = require('mongoose');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const saltRounds = config.saltRounds;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5 
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.comparePasswords = function(providedPassword) {
    return new Promise((resolve, reject) => { 
      bcrypt.compare( providedPassword, this.password, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result); 
        })
    })
}

userSchema.pre('save', function (done) {
    if (this.isNew || this.isModified(password)) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { done(err); return; }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { done(err); return; }
                this.password = hash;
                done();
            })
        })
    }
    done();
})
module.exports = new mongoose.model('user', userSchema); 
