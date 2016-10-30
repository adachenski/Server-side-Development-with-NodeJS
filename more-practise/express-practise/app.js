/**
 * Created by Administrator on 10/29/2016.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var app = express();
var db = mongoose.connect('mongodb://localhost/bookApi');

var Book = require('./models/bookModel');



var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books',bookRouter);

app.get('/',function(req, res){
   res.send('Welocome to my API');
});

app.listen(port,function(){
    console.log('Gulp is running on port: '+port);
});