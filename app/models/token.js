const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
    {
        tokenId: String,
        userId: String    
    }, 
        {versionKey: false}
);
module.exports = mongoose.model('Token', tokenSchema);
