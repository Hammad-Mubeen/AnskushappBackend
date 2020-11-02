const mongoose = require('mongoose');
var Schema=mongoose.Schema;

//Schema (table structue)
var cartSchema= new Schema({
    Image: { type: String},
    Title: { type: String, required: true},
    Price: { type: String},
    EmailAddress: { type: String,required: true}
});

//Model (table)
var cart= mongoose.model('cart',cartSchema);

module.exports = cart;

