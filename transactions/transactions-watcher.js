const Transaction = require('../models/transaction/transaction');
const mongoose = require('mongoose');
const keys = require('../config/keys');

process.on('message', (msg) => {
    console.log('Message from parent:', msg);
});


mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongo db FROM WATCHER');

});


setInterval(() => {
    Transaction.find({repetetive: true}).then(transactions => {

        console.log("BAHUREEEE: ", transactions);

        if (transactions && transactions.length > 0) {
            for (let transaction of transactions) {
                new Transaction({
                    userId: transaction.userId,
                    amount: transaction.amount,
                    description: transaction.description,
                    repetetive: false,
                    category: transaction.category,
                    creationDate: new Date()
                }).save().then(newTransaction => {
                    // console.log(newTransaction);
                }).catch(error => {

                    // console.log(error);
                });
            }

        }
    });
}, 10 * 1000);




