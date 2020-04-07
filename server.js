const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/dbConfig');
const config = require('./config');
require('./app/models');
const app = express();
config.express(app);
config.routes(app);
let fixtures = require('./fixtures');


fixtures().then(() => {
    mongoose.connect(dbConfig.mongoUri, dbConfig.mongoOptions)
        .then(() => {
            app.listen(dbConfig.appPort, () => console.log('Server app running')
            );
        })
        .catch(error => console.error('Error connection to Database', error));
})
    .catch(error => console.error('Error fixtures', error));