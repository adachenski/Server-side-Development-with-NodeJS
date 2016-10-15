/**
 * Created by Just Nasko on 10/4/2016.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var dishSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps :true
});
// the schema is useless so far
// we need to create a model using it

var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;