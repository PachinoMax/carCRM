const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

const detailSchema = new Schema(
    {
        name: String,
        description: String,
        state: String,
        carId: {type: ObjectId, ref: 'Car', required: true},
        sideId: {type: ObjectId, ref: 'Side', required: true},
        ownerId: {type: ObjectId, ref: 'User', required: true},
        cost_item: Number,
        storageId: {type: ObjectId, ref: 'Storage', required: true},
        analog: String
    },
    {versionKey: false}
);
module.exports = mongoose.model('Detail', detailSchema);
