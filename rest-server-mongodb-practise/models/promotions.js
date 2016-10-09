/**
 * Created by Just Nasko on 10/5/2016.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ""
    },
    price: {
        type: Currency
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;