const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carModelSchema = new Schema(
    {
        name: String,
        markId: {type: mongoose.Schema.Types.ObjectId, ref: 'Mark', required: true}
    },
    {versionKey: false}
);
module.exports = mongoose.model('CarModel', carModelSchema);
