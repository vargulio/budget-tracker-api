const router = require('express').Router();
const Transaction = require('../models/transaction');
const transactionSchema = require('../models/validation/transaction.schema');

router.post('/addTransaction', (req, res)=> {
    if (req.session && req.session.id) {
        console.log("Request: ",req.body);
        new Transaction({
            userId: 'bahur',
            amount: 10,
            description: 'Poharchih 10 kinta za nishto,',
            repetetive: true,
            repeatInterval: 0,
            category: '12'
        }).save().then(newTransaction => {
            res.send(newTransaction);
        }).catch(error => {
            res.status(400);
            res.send(error);
        });
        console.log('Mainata ti');
    } else {
        res.status(400);
        res.send({})
    }
});

router.get('/validationSchema',(req,res) => {
    res.send(transactionSchema);
});

module.exports = router;
