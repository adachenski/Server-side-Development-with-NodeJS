/**
 * Created by Just Nasko on 10/4/2016.
 */
/**
 * Created by Just Nasko on 10/4/2016.
 */

var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leadership = require('./models/leadership');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    
    console.log('Connection Successful to server');
    var newDish = new Dishes({
        name: 'Uthapizza3',
        image: 'images/uthapizza.png',
        category: "mains",
        label: "Hot",
        price: '4.99',
        description: 'Test3',
        comments: [{
            rating: 4,
            content: 'Some Staff',
            author: 'Nasko'
        }]
    });

    var newLeadership = new Leadership({
        "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."
    })
    // assert.equal(newDish.label,'Hot');

    var newPromotion = new Promotions({
        "name": "Weekend Grand Buffet",
        "image": "images/buffet.png",
        "label": "New",
        "price": "19.99",
        "description": "Featuring . . ."
    });

    Leadership.create(newLeadership, function (err, leadership) {
        if (err) {
            console.log('Creating Leadership error: ' + err)
        }
        Leadership.find({}).exec(function (err, lead) {
            if (err) {
                console.log('Error finding Leader: ' + err);
            }
            console.log(lead);
            db.collection('leaderships').drop(function () {
                db.close();
            })
        })
    })
    Promotions.create(newPromotion, function (err, promotion) {
        if (err) {
            console.log(err);
        }
        Promotions.find({}).exec(function (err, promo) {
            if (err) {

                console.log(err);
            }
            //console.log(promo);
            db.collection('promotions').drop(function () {
                db.close();
            })
        });
    });

    Dishes.create(newDish, function (err, dish) {
        if (err) {
            console.log('Creating dish error: ' + err);
        }
        // assert.ifError(err);
        // console.log(dish);
        console.log('Dish created');
        //console.log(dish.price/100);
        Dishes.find({}).exec(function (err, dishes) {
            if (err) {
                console.log(err);
            }
            //console.log(dishes);
            db.collection('dishes').drop(function () {
                db.close();
            })
        })
    })
});