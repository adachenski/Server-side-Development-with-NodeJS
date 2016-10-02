var express = require('express'),
    morgan = require('morgan'),
    hostname = 'localhost',
    port = 3000;

var app = express();
app.use(morgan('dev'));

var dishRouter = require('./dishRouter'),
    promoRouter = require('./promoRouter'),
    leaderRouter = require('./leaderRouter');

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});
