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
        //console.log(error);
        const errors = req.flash('err');
        console.log(errors);
        res.render('users/signup',{title:'sign up', messages: errors});
    });

    app.post('/signup',validate,passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true
        }
    ));



    app.get('/forget',function (req,res) {
        res.render('users/forget');
    });



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
        const errors = req.flash('err');
        //const messages=[];
        res.render('users/login',{title: 'login',messages:errors});
    });

    app.post('/login',validateLogin,passport.authenticate('local.login',{
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }))
};





function validate(req,res,next) {


    req.checkBody('fullname','Name is not entered').notEmpty();
    req.checkBody('email','Email is not entered').notEmpty();
    req.checkBody('password','Password is not entered').notEmpty();
    req.checkBody('fullname','name length must be greater than 2 characters').isLength({min:2,max:25});
    req.checkBody('email','email is not valid').isEmail();
    req.checkBody('password','password must be greater than 5 char').isLength({min:5});


    var errors = req.validationErrors();
    //console.log(typeof errors);
    if(errors)
    {
        var messages = [];

        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        //console.log(messages);
        req.flash('err',messages);
        res.redirect('/signup');
        /*console.log('')*/
    }

    else
    {
        next();
    }
    /*next();*/
}

function validateLogin(req,res,next) {
    req.checkBody('email', 'email must be entered').notEmpty();
    req.checkBody('email', 'email must be valid').isEmail();
    req.checkBody('password', 'password must be entered').notEmpty();

    var errors = req.validationErrors();
    if(errors)
    {
        var messages=[];
        errors.forEach((error)=>
        {
            messages.push(error.msg);
            console.log(messages[0]);
        });
        req.flash('err',messages);
        res.redirect('/login');

    }
    else
    {
        next();
    }

}