const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionValidationSchema = require('./validation/transaction.schema');

const transactionSchema = new Schema(transactionValidationSchema);

const Transaction = mongoose.model('transactions',transactionSchema);

module.exports = Transaction;