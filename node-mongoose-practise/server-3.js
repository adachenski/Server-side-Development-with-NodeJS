/**
 * Created by Just Nasko on 10/4/2016.
 */

var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-3');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log('Connection Successful to server');
    Dishes.create({
        name:'Uthapizza3',
        description:'Test3',
        comments:[{
            rating:4,
            content:'Some Staff',
            author:'Nasko'
        }]
    },function(err, dish){

        if(err){
            console.log('Creating dish error: '+err);
        }
        console.log('Dish created');
        console.log(dish);
        var id = dish._id;
        setTimeout(function(){
            Dishes.findByIdAndUpdate(id,{
                $set:{
                    description:'Updated Test 3 description'
                }
            },{new:true}).exec(function(err, dishesh){
                if(err){
                    console.log('Error updating the dish: '+ err);
                }
                console.log('Dish successful updated');
                console.log(dish);
                dish.comments.push({
                    rating:5,
                    content:'Getting better',
                    author: 'Still Nasko'
                });
                dish.save(function(err,dish){
                    if(err){
                        console.log('Error saving the dish: '+err);
                    }
                        console.log('Updated Comment');
                        console.log(dish);
                        db.collection('dishes').drop(function(){
                            db.close();
                        })
                })
            })
        },3000)
    })
});