const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    date: {type: Date, required: true},
    amount: { type: Number, required: true},
    category: { type: String, enum: ['Bill', 'Deposit', 'ATM', 'Groceries', 'Misc'] },
    description: String

})


const accountSchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    transactions: [transactionSchema]
})

module.exports = mongoose.model('Account', accountSchema)