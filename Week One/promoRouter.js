var express = require('express'),
    promoRouter = express.Router(),
    bodyParser = require('body-parser');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send all promotions to you.')
    })
    .post(function (req, res, next) {
        res.end('Will add the promotion: ' + req.body.name + ' with details ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Will delete all the promotions.')
    });

promoRouter.route('/:promoId')
    .all(function (req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(function (req, res, next) {
        res.end('Will get promotion with id: ' + req.params.promoId);
    })
    .put(function (req, res, next) {
        res.write('Update promotion: ' + req.params.promoId + ' \n')
        res.end('Will update promotion with name: ' + req.body.name + ' and description: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Will delete promotion with id: ' + req.params.promoId);
    })

module.exports = promoRouter;