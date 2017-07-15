/**
 * Created by Ashish Goyal on 7/13/2017.
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users');

    //const User = require('../models/users');
    /*const users = require('../models/users');*/
passport.serializeUser(function (user, done) {
    //console.log("Ashish");
    done(null, user.id);
    //console.log("Ashish");
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
});

    passport.use('local',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) =>{
        User.findOne({'email': email}, function (err, user) {
            if (err) {
                //console.log("Ashish");
                return done(err);
            }
            if (user) {
                console.log("Ashish");
                done(null, false);
            }


            const newUser = new User();

            newUser.fullname = req.body.fullname;
            newUser.email = req.body.email;
            newUser.password = newUser.encryptPassword(req.body.password);

            newUser.save(function (err) {
                console.log("Ashish");
                return done(null, newUser);
            })
        })
    }));

    passport.use('local.login',new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }
    ,function (req,email,password,done) {
        User.findOne({'email':email},function (err,user) {
            if(err)
            {
                return done(err);
            }
            var messages = [];
            if(!user||!user.validPassword(password))
            {
                messages.push('email does not exist in mongodb');
                done(null,false,req.flash('err',messages));
            }
            return done(null,user)
        })
    }));

