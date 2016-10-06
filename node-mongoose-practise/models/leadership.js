/**
 * Created by Just Nasko on 10/5/2016.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

var Leadership = mongoose.model('Leadership', leadershipSchema);

module.exports = Leadership;