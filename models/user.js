const mongoose = require('mongoose');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const saltRounds = config.saltRounds;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        //minLength: 6 - можем да сложим, validate също може да сложим

    }
})

userSchema.methods.comparePasswords = function(providedPassword) {//можем да създадем и закачим доп метод, който на всяка една инстания на юзър се закача този доп метод и дава възможност да го извикваме 
    //providedPassword - това ще е паролата, която като сме се логнали сме взели от формата. ще я криптираме, за да може да сравним двата ринга?
    //след като сме хеширали паролата ще използваме функцията compare, за да ги сравним

    return new Promise((resolve, reject) => { //за да не слагаме пак call back..за разнообразия
      bcrypt.compare( providedPassword, this.password, function (err, result) { //this.password ни е текущата парола, provided която ни едадена
            if (err) {
                reject(err);
                return;
            }
            resolve(result); //ще ни върне true или false
        })
    })
}
userSchema.pre('save', function (done) { //да си направим този pre hook, само че през save hook, който ни дава възможност да направим нещо преди да запазим потребителя
    //done е call back , който извикваме като приключат асинхронните операции
    if (this.isNew || this.isModified(password)) {//ако текущия потребител е нов или си е променил паролата, от mongoose идват тези функции ли са методи ли са
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { done(err); return; }
            bcrypt.hash(this.password, salt, (err, hash) => {//хубаво е saltRound=10 да е седи в конфигурацията на нашето приложение и този sault да се пази в отд таблица
                //ще получим hash = което ни е хешираната парола
                if (err) { done(err); return; }
                this.password = hash;
                done();//това е в случая, когато потребителя е нов или паролата е променена
            })
        })
    }
    done();//това е в случая, когато потребителя НЕ Е нов или паролата НЕ е променена
})
module.exports = new mongoose.model('user', userSchema); //mongoose автоматично ще ни направи в множествено число..не го разбрах
