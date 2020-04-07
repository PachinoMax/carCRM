const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storageSchema = new Schema(
    {name: String}, {versionKey: false}
);
module.exports = mongoose.model('Storage', storageSchema);
