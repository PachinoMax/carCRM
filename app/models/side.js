const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sideSchema = new Schema(
    {name: String}, {versionKey: false}
);
module.exports = mongoose.model('Side', sideSchema);
