const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        maxlength: 256
    },
    repetetive: {
        type: Boolean,
        required: true
    },
    repeatInterval: {
        type: Number,
        required: function () {
            return this.repetetive;
        },
        min: 0,

    },
    startingDate: {
        type: String,
        required: function () {
            return this.repetetive;
        }
    },
    category: {
        type: String,
        enum: ['0', '1', '2', '3', '4', '5', '6', '7'],
        default: '0',
        required: true
    }
});

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;