const express = require('express');
const authRoutes = require('./routes/auth-routes');
const transactionRoutes = require('./routes/transactions-routes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');


const app = express();

/**
 * Only for development
 */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", " http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(cookieSession({
    name: 'biscuit',
    keys: ['superSecretniqStringKoitoNikojNqmaDaOtgatne'],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false
}));


mongoose.connect(keys.mongodb.dbURI, ()=> {
    console.log('connected to mongo db');
});

app.use(authRoutes);
app.use(transactionRoutes);

app.listen(3000, () => {
    console.log('App listening on port 3000');
});