const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;
const carsSchema = new Schema(
    {
        engine: String,
        year: Number,
        markId: {type: ObjectId, ref: 'Mark', required: true},
        carModelId: {type: ObjectId, ref: 'CarModel', required: true},
        carBodyId: {type: ObjectId, ref: 'CarBody', required: true},
    },
    {versionKey: false}
);
module.exports = mongoose.model('Car', carsSchema);
