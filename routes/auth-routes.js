const router = require('express').Router();
const verifyToken = require('../authenticate/verify_token');
const httpService = require('../shared/http-service');
const urls = require('../config/urls');
const User = require('../models/user-model');

/**
 * This endpoint waits for a token as a get parameter in the request
 * url. Then it makes a request to Google api to verify the token and
 * if it's valid makes another request to get the user data from
 * the google api.
 */
router.get('/login', (req, res)=> {
    console.log("Here: ", req.session);
    verifyToken(req.query.access_token).then(data => {

        httpService.get(urls.googleGetUserDataUrl + req.query.access_token).then(profile => {
            console.dir(profile);
            User.findOne({googleId: profile.id}).then((existingUser)=> {
                if (existingUser) {
                    console.log('user is already in store: ', existingUser);
                    req.session = {id: serializeUser(existingUser)};
                    res.send(existingUser);
                } else {
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        image: profile.image
                    }).save().then(newUser => {
                        console.log('new User created ', newUser);
                        req.session = {id: serializeUser(newUser)};
                        res.send(newUser);
                    });
                }
            });
        }).catch(error => {
            res.status(400);
            res.send(error);
        });

    }).catch(error => {

        res.status(400);
        res.send(error);
    })
});

router.get('/profile', (req, res)=> {

    deserializeUser(req.session.id).then(user => {
        console.log(user);
        console.log(req.session.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404);
            res.send({message: 'User was not found!'});
        }
    })
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.send({message: 'User successfuly logged out'});
});

function serializeUser(user) {
    return user.id;
}

function deserializeUser(userId) {
    return User.findOne({_id: userId});
}

module.exports = router;