/**
 * Created by Just Nasko on 10/4/2016.
 */

var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');
var url = 'mongodb://localhost:27017/conFusion2';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log('Correctly connected');

    Dishes.create({
        name:'Uthapizza2',
        description:'Test2'
    },function(err, dish) {
        if (err) {
            console.log(err);
        }
        console.log('Dish Created');
        console.log(dish)

        var id = dish._id;

        setTimeout(function () {
            Dishes.findByIdAndUpdate(id,{
                $set:{
                    description:'Updated Dish Test'
                }
            },
                {new:true}).exec(function(err, dish){
                if(err){
                    console.log(err);
                }
                    console.log('Dish has been updated');
                    console.log(dish);
                    db.collection('dishes').drop(function(){
                        db.close();
                    })
            })
        },3000)

    });
});