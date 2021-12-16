const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    date: Date,
    amount: {type: Number},
    category:{type:String, },
    description: String

})


const accountSchema = new Schema({
    name: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    transactions: [transactionSchema]
})