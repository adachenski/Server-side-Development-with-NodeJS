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
        Dishes.find({})
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if (err) {
                    throw new Error('Cant get all the dishes error: ' + err);
                }
                res.json(dish);
            })
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {

        Dishes.create(req.body, function (err, dish) {
            if (err) {
                throw err;
            }
            console.log('Dish created');
            var id = dish._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the dish with id: ' + id);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        //res.end('All dishes will be deleted');
        Dishes.remove({}, function (err, response) {
            if (err) {
                throw err;
            }
            res.json(response);
        })
    });

dishRouter.route('/:dishId')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {

        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if (err) {
                    throw new Error('Cant get dish by id ' + err);
                }
                res.json(dish);
            })
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {

        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true
        }, function (err, dish) {
            if (err) {
                console.log('Error updating the dish: ' + err);
                res.json(dish);
            }
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {

        Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {
            if (err) {
                console.log('Error removing dish: ' + err);
            }
            res.json(resp);
        });
    });

dishRouter.route('/:dishId/comments')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec(function(err,dish){
                if(err){
                    throw new Error('Err getting all the comments: '+err);
                }
                res.json(dish.comments);
            })
    })
    .post(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {

            if (err) {
                console.log('Err post Comment: ' + err);
            }
            req.body.postedBy = req.decoded._doc._id;
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) {
                    console.log('Err saving comment: ' + err);
                }
                console.log('Comment Updated');
                res.json(dish);
            })
        })
    })
    .delete(Verify.verifyAdmin, function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) {
                console.log('Err find delete by id: ' + err);
            }
            for (var i = (dish.comments.length - 1); i >= 0; i -= 1) {

                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function (err, result) {
                if (err) {
                    console.log('Erro saving dish: ' + err);
                }
                res.writeHead(200, {'Content-Type': 'text/palin'});
                res.end('Deleted all comments');
            });
        });
    });

dishRouter.route('/:dishId/comments/:commentId')
    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec(function(err, dish){
                if(err){
                    throw new Error('')
                }
                res.json(dish.comments.id(req.params.commentId));
            })
    })
    .put(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) {
                console.log('Error removing comment by id' + err);
            }

            dish.comments.id(req.params.commentId).remove();
            req.body.postedBy = req.decoded._doc._id;
            dish.comments.push(req.body);
            dish.save(function (err, response) {
                if (err) {
                    console.log('Err saving comment: ' + err);
                }
                res.json(response);
            });
        });
    })
    .delete(function(req, res, next){

        Dishes.findById(req.params.dishId, function(err, dish){

            if(dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id){

                var err = new Error('You are not authorized to perform this operation.');
                err.status = 403;
                return next(err);
            }
            dish.comments.id(req.params.commentId).remove();
            dish.save(function(err, resp){
                if(err){
                    throw new Error(err);
                }
                res.json(resp);
            })
        })
    });

module.exports = dishRouter;