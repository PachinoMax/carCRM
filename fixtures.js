const mongoose = require('mongoose');
const dbConfig = require('./config/dbConfig');

const User = require('./app/models/user');

const run = async () => {
    await mongoose.connect(dbConfig.mongoUri, dbConfig.mongooseOptions);
    const connection = mongoose.connection;

    const user = await User.create(
        {
            name: 'Admin',
            password: 'Admin123',
            role: 'admin'
        }
    );
    await user.save();
    return connection.close();
};

module.exports = run;