/**
 * Created by Administrator on 10/22/2016.
 */

var express = require('express'),
    favoriteRouter = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var Favorites = require('../models/favorites'),
    Verify = require('./verify');

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Favorites.find({postedBy: req.decoded._doc._id})
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorite) {
                if (err) {
                    throw new Error('Cannot get lest of favorites error: ' + err);
                }
                res.json(favorite);
            })
    })
    .post(function (req, res, next) {

        var id = req.body._id;

        var fav = new Favorites({
            postedBy: req.decoded._doc._id,
            dishes: id
        });
        fav.save(function (err, fav) {
            if (err) throw err;

            res.json(fav);
        });

    })
    .delete(function (req, res, next) {

        Favorites.remove({postedBy: req.decoded._doc._id}, function (err, response) {
            if (err) {
                throw err;
            }
            res.json(response);
        })
    });

module.exports = favoriteRouter;