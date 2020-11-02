const mongoose = require('mongoose');
var Schema=mongoose.Schema;

//Schema (table structue)
var itemSchema= new Schema({
    Image: { type: String},
    Title: { type: String, required: true},
    Specifications: { type: String},
    Description: { type: String},
    Price: { type: String}
});

//Model (table)
var item= mongoose.model('item',itemSchema);

module.exports = item;

