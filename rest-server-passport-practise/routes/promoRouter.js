var express = require('express'),
    promoRouter = express.Router(),
    bodyParser = require('body-parser'),
    Verify = require('./verify'),
    mongoose = require('mongoose');
var Promotions = require('../models/promotions');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function ( req, res, next) {
        //res.end('Will send all promotions to you.')
        Promotions.find({}, function (err, promos) {
            if (err) {
                console.log('Error obtaining the promotions: ' + err);
            }
            res.json(promos);
        })
    })
    .post(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function (req, res, next) {
        // res.end('Will add the promotion: ' + req.body.name + ' with details ' + req.body.description);
        Promotions.create(req.body, function (err, dish) {
            if (err) {
                console.log('Error creating a new promotion: ' + err);
            }
            console.log('Promotion created');
            var id = dish._id;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Added promotion with id: ' + id);
        })
    })
    .delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function (req, res, next) {
        //res.end('Will delete all the promotions.');
        Promotions.remove({}, function (err, promos) {
            if (err) {
                console.log('Error deleting the promotion: ' + err);
            }
            res.json(promos);
        })
    });

promoRouter.route('/:promoId')
    .get(Verify.verifyOrdinaryUser,function (req, res, next) {
        //res.end('Will get promotion with id: ' + req.params.promoId);
        Promotions.findById(req.params.promoId, function (err, promotion) {
            if (err) {
                console.log('Error findPromotionById: ' + err);
            }
            res.json(promotion);
        });

    })
    .put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function (req, res, next) {
        //res.write('Update promotion: ' + req.params.promoId + ' \n');
        // res.end('Will update promotion with name: ' + req.body.name + ' and description: ' + req.body.description);
        Promotions.findByIdAndUpdate(req.params.promoId, {$set: req.body},{new:true}, function (err, promo) {

            if (err) {
                console.log('Error Updating PromotionById: ' + err);
            }
            res.json(promo);
        })
    })
    .delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function (req, res, next) {
        //res.end('Will delete promotion with id: ' + req.params.promoId);
        Promotions.findByIdAndRemove(req.params.promoId, function(err, promo){
            if(err){
                console.log('Error DeletePromoById: '+err);
            }
            res.json(promo);
        });
    });

module.exports = promoRouter;