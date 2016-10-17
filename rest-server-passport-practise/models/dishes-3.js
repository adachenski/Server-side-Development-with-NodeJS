/**
 * Created by Just Nasko on 10/4/2016.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
},{timestamps:true});

var dishSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:'String'
    },
    description:{
        type:String,
        required:true
    },
    comments:[commentSchema]
},{timestamps:true});

var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;