var express = require('express'),
    leaderRouter = express.Router(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var Leadership = require('../models/leadership');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get(function (req, res, next) {
        //res.end('Will det all leaders to you');
        Leadership.find({}, function (err, leaders) {
            if (err) {
                console.log('Error obtaining leaders: ' + err);
            }
            res.json(leaders);
        })
    })
    .post(function (req, res, next) {
        //res.end('Will ad the leader with name: ' + req.body.name + ' and description: ' + req.body.description);
        Leadership.create(req.body, function (err, leader) {

            if (err) {
                console.log('Error creating Leader: ' + err);
            }
            console.log('Leader created');
            var id = leader._id;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Leader added with id: ' + id);
        })
    })
    .delete(function (req, res, next) {
        //res.end('Will delete all the leaders');
        Leadership.remove({}, function (err, leader) {
            if (err) {
                console.log('Error deleting Leader: ' + err);
            }
            res.json(leader);
        })
    });

leaderRouter.route('/:leaderId')
    .get(function (req, res, next) {
        //res.end('Will send a leader with Id: ' + req.params.leaderId + ' to you.');
        Leadership.findById(req.params.leaderId, function (err, leader) {
            console.log('Err finding Leader by Id: ' + err);
        });
        res.json(leader);
    })
    .put(function (req, res, next) {
        // res.write('Will update leader with id: ' + req.params.leaderId + '\n');
        //res.end('Will update leader name: ' + req.body.name + ' and description: ' + req.body.description);
        Leadership.findByIdAndUpdate(req.params.leader.Id,{$set:req.body},{new:true}, function (err, leader) {

            if(err){
                console.log('Err find leader by id and update: '+err);
            }
            res.json(leader);

        });
    })
    .delete(function (req, res, next) {
        //res.end('Will delete leader with id: ' + req.params.leaderId);
        Leadership.findByIdAndRemove(req.params.leaderId, function(err, lead){
            if(err){
                console.log('Err removing Leader by Id: '+err);
            }
            res.json(lead);
        })
    });

module.exports = leaderRouter;