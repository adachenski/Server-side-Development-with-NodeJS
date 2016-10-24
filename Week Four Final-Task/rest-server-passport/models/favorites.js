/**
 * Created by Administrator on 10/22/2016.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var favoriteSchema = new Schema({

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]

}, {timestamps: true});

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;