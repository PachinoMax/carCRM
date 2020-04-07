const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carBodySchema = new Schema(
    {
        name: String,
        markId: {type: mongoose.Schema.Types.ObjectId, ref: 'Mark', required: true},
        carModelId:{type: mongoose.Schema.Types.ObjectId, ref: 'CarModel', required: true}
    },
    {versionKey: false}
);
module.exports = mongoose.model('CarBody', carBodySchema);
