/**
 * Created by Ashish Goyal on 7/13/2017.
 */


const mongoose = require('mongoose');
//console.log(typeof(mongoose.Schema()));
const bcrypt = require('bcrypt-nodejs');



    /*MyModel = conn.model('ModelName', schema);*/

const userSchema = mongoose.Schema({
    fullname: {type:String, required: true},
    email: {type:String, required:true},
    password: {type:String},
    role: {type:String, default:''},
    company:  {
        name: {type:String,default:''},
        image:{type:String,default:''}
    },
    passwordresetToken: {type:String,default:''},
    passwordresetExpires: {type:Date, default:Date.now}
});

userSchema.methods.encryptPassword = function (password) {
    //console.log("Ashish");
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password,this.password)
};

/*
var conn = mongoose.createConnection('mongodb://localhost/review_app');
const MyModel = conn.model('User', userSchema);
*/
/*const users = mongoose.model('users',userschema);*/
/*module.exports = MyModel;*/
module.exports = mongoose.model('User',userSchema);