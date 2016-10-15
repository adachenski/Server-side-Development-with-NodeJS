/**
 * Created by Just Nasko on 10/12/2016.
 */
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function(user){
    return jwt.sign(user,config.secretKey,{expiresIn:3600});
};

exports.verifyOrdinaryUser = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){

        jwt.verify(token, config.secretKey, function(err, decoded){
            if(err){
                var err = new Error('You are not authenticate');
                err.status = 401;
                return next(err);
            }
            else{
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                return next();
            }
        });
    }
    else{
        //If no token return Err
        var err = new Error('No token provided!');
        err.status = 401;
        return next(err);
    }
};

exports.verifyAdmin =function(req, res, next){
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(req.decoded._doc.admin){

        console.log('You re admin');
        return next();
    }
    else{
        var err = new Error("You're not authorized to perform this operation.");
        err.status = 403;
        return next(err);
    }

};