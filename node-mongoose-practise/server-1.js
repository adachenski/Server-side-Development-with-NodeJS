/**
 * Created by Just Nasko on 10/4/2016.
 */

var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error',console.error.bind(console,'Connection Error'));
db.once('open',function(){

    //We're connected
    console.log('Correctly connected');

    //creating a new user
    var newDish = Dishes({
        name:'Uthapizza',
        description:'Test'
    });

    //save a user
    newDish.save(function(err){
        if(err){
            console.log(err);
        }
        //assert.ifError('Cant create dish '+err);
        console.log('Dish Created');
        Dishes.find({},function(err, dishes){
            if(err){
                console.log(err);
            }
            console.log(dishes);
            db.collection('dishes').drop(function(){
                db.close();
            })
        })
    })
});