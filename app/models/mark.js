const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markSchema = new Schema(
    {name: String}, {versionKey: false}
);
module.exports = mongoose.model('Mark', markSchema);
