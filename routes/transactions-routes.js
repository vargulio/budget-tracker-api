const router = require('express').Router();
const Transaction = require('../models/transaction/transaction');
const {checkSchema} = require('express-validator/check');
const transactionValidationSchema = require('../models/transaction/transaction.validationSchema');
const transactionCategories = require('../models/categories.enum');
const repeatIntervals = require('../models/repeat-intervals.enum');

router.post('/addTransaction', checkSchema(transactionValidationSchema), (req, res) => {
    console.log('Here: ', req.body);
    if (req.session && req.session.id && !req.validationErrors()) {
        new Transaction({
            userId: req.body.userId,
            amount: req.body.amount,
            description: req.body.description,
            repetetive: req.body.repetetive,
            repeatInterval: req.body.repeatInterval,
            category: req.body.category,
            startingDate: new Date(req.body.startingDate),
            creationDate: new Date()
        }).save().then(newTransaction => {
            res.send(newTransaction);
        }).catch(error => {
            res.status(400);
            res.send(error);
        });
    } else {
        res.status(400);
        res.send(req.validationErrors());
    }
});

router.get('/validationSchema', (req, res) => {
    res.send(transactionValidationSchema);
});

router.get('/getTransactionCategories', (req, res) => {
    res.send(transactionCategories);
});

router.get('/getRepeatIntervals', (req, res) => {
    res.send(repeatIntervals);
});

module.exports = router;
