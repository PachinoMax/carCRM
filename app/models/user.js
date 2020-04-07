const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;
const userSchema = new Schema(
    {
        name: String,
        password: String,
        role: {type: String, default:'user', enum:['user' ,'admin']},
        phone: Number

    }, 
        {versionKey: false}
);

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

module.exports = mongoose.model('User', userSchema);
