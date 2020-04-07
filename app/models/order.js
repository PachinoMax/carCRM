const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

const orderSchema = new Schema(
    {
        date: Date,
        description: String,
        detailId: {type: ObjectId, ref: 'Detail', required: true},
        userId: {type: ObjectId, ref: 'User', required: true},
        count: Number,
        sum: Number,
        is_debt: Boolean,
        debt_date: Date
    },
    {versionKey: false}
);
module.exports = mongoose.model('Order', orderSchema);
