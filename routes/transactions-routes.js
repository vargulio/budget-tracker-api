const router = require('express').Router();
const Transaction = require('../models/transaction');

router.post('/addTransaction', (req, res)=> {
    if (req.session && req.session.id) {
        console.log("Request: ",req.body);
        res.send({})
    } else {
        res.status(400);
        res.send({})
    }
});

module.exports = router;
