/**
 * Created by Ashish Goyal on 7/12/2017.
 */

/*const passport = require('passport');*/  /*it is an option just*/
//const User = require('../models/users');

module.exports = (app,passport)=> {
    app.get('/',(req, res)=> {
        res.render('index',{title: 'review application'});
    });

    app.get('/signup', (req,res) =>{
        //console.log("Ashish");
        res.render('users/signup',{title:'sign up'});
    });

    app.post('/signup',passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true
        }
    ));


   /* app.post('/signup', function(req, res, next) {
        console.log(req.url);
        passport.authenticate('local', function(err, user, info) {
            console.log("authenticate");
            console.log(err);
            console.log(user);
            console.log(info);
        })(req, res, next);
    });*/

    app.get('/login',(req,res)=> {
        res.render('users/login',{title: 'login'});
    })
};