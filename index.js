global.__basedir = __dirname;

const app = require('express')();
const config = require('./config/config');

const dbConnetionPromise = require('./config/database')();

require('./config/express')(app);
require('./config/routes')(app);

dbConnetionPromise.then(()=>{
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
})