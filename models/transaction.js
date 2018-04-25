const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: String,
    amount: Number,
    description: String,
    repetetive: Boolean,
    repeatInterval: Number,
    category: {
        type: String,
        enum: ['0','1','2','3','4','5','6','7'],
        default: '0'
    }
});

const Transaction = mongoose.model('transactions',transactionSchema);

module.exports = Transaction;