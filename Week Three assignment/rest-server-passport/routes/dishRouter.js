
var express = require('express'),
    dishRouter = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
var Dishes = require('../models/dishes');
var Verify = require('./verify');
dishRouter.use(bodyParser.json());


dishRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        //res.end('Will send all the dishes to you');
        Dishes.find({},function(err, dish){
            if(err){
                throw err;
            }
            res.json(dish);
        })
    })
    .post(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function (req, res, next) {
        //res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
        Dishes.create(req.body, function(err, dish){
            if(err){
                throw err;
            }
            console.log('Dish created');
            var id = dish._id;
            res.writeHead(200,{'Content-Type':'text/plain'});
            res.end('Added the dish with id: '+id);
        });
    })
    .delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function (req, res, next) {
        //res.end('All dishes will be deleted');
        Dishes.remove({},function(err, response){
            if(err){
                throw err;
            }
            res.json(response);
        })
    });

dishRouter.route('/:dishId')
    .get(Verify.verifyOrdinaryUser,function (req, res, next) {
       // res.end('Will send dish with id: ' + req.params.dishId + ' to you');
        Dishes.findById(req.params.dishId,function(err, dish){
            if(err){
                console.log('Error fiining dish by id: '+err);
            }
            res.json(dish);
        })
    })
    .put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function (req, res, next) {
       // res.write('Updating the dish: ' + req.params.dishId + '\n');
        //res.end('Will update the dish: ' + req.body.name +' with details: ' + req.body.description);
        Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true}, function (err, dish) {
            if(err){
                console.log('Error updating the dish: '+err);
                res.json(dish);
            }
        });
    })
    .delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function (req, res, next) {
        //res.end('Deleting dish: ' + req.params.dishId);
        Dishes.findByIdAndRemove(req.params.dishId,function(err, resp){
            if(err){
                console.log('Error removing dish: '+err);
            }
            res.json(resp);
        });
    });

dishRouter.route('/:dishId/comments')
    .get(Verify.verifyOrdinaryUser,function(req, res, next){
        Dishes.findById(req.params.dishId, function(err, dish){
            if(err){
                console.log('Err finding comment by Id: '+err);
            }
            res.json(dish.comments)
        })
    })
    .post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Dishes.findById(req.params.dishId,function(err, dish){

            if(err){
                console.log('Err post Comment: '+err);
            }
            dish.comments.push(req.body);
            dish.save(function(err, dish){
                if(err){
                    console.log('Err saving comment: '+err);
                }
                console.log('Comment Updated');
                res.json(dish);
            })
        })
    })
    .delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res, next){
        Dishes.findById(req.params.dishId, function(err, dish){
            if(err){
                console.log('Err find delete by id: '+err);
            }
            for(var i = (dish.comments.length-1); i>=0; i-=1){

                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function(err, result){
                if(err){
                    console.log('Erro saving dish: '+err);
                }
                res.writeHead(200,{'Content-Type':'text/palin'});
                res.end('Deleted all comments');
            });
        });
    });

dishRouter.route('/:dishId/comments/:commentId')
    .get(Verify.verifyOrdinaryUser,function(req, res, next){
        Dishes.findById(req.params.dishId, function(err, dish){
            if(err){
                console.log('Err finding comment by id: '+err);
                req.json(dish.comments.id(req.params.commentId));
            }
        })
    })
    .put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req, res, next){
        Dishes.findById(req.params.dishId,function(err, dish){
            if(err){
                console.log('Error removing comment by id'+err);
            }
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);
            dish.save(function(err, response){
                if(err){
                    console.log('Err saving comment: '+err);
                }
                res.json(response);
            });
        });
    });

module.exports = dishRouter;