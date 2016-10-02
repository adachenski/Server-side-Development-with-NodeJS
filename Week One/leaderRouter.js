var express = require('express'),
    leaderRouter = express.Router(),
    bodyParser = require('body-parser');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        next();
    })
    .get(function (req, res, next) {
        res.end('Will det all leaders to you');
    })
    .post(function (req, res, next) {
        res.end('Will ad the leader with name: ' + req.body.name + ' and description: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Will delete all the leaders');
    })

leaderRouter.route('/:leaderId')
    .all(function (req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send a leader with Id: ' + req.params.leaderId + ' to you.');
    })
    .put(function (req, res, next) {
        res.write('Will update leader with id: ' + req.params.leaderId + '\n');
        res.end('Will update leader name: ' + req.body.name + ' and description: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Will delete leader with id: ' + req.params.leaderId);
    })

module.exports = leaderRouter;