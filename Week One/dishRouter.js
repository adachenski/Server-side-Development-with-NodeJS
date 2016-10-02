
var express = require('express'),
    dishRouter = express.Router(),
    bodyParser = require('body-parser');

dishRouter.use(bodyParser.json());


dishRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send all the dishes to you');
    })
    .post(function (req, res, next) {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('All dishes will be deleted');
    });

dishRouter.route('/:dishId')
    .all(function (req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send dish with id: ' + req.params.dishId + ' to you');
    })
    .put(function (req, res, next) {
        res.write('Updating the dish: ' + req.params.dishId + '\n');
        res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Deleting dish: ' + req.params.dishId);
    });

module.exports = dishRouter;