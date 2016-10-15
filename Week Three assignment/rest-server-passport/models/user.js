/**
 * Created by Just Nasko on 10/12/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username:String,
    password:String,
    admin:{
        type:Boolean,
        default:false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',User);