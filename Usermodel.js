const mongoose = require('mongoose');
var Schema=mongoose.Schema;

//Schema (table structue)
var userdataSchema= new Schema({
  Firstname: { type: String},
  Lastname: { type: String},
  Username: { type: String},
  EmailAddress: { type: String, required: true},
  Password: { type: String}
  
});

//Model (table)
var UserData= mongoose.model('UserData',userdataSchema);

module.exports = UserData;


