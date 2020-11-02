var express = require('express');
var router = express.Router();
var JWT= require('jsonwebtoken');
var mongoose= require('mongoose');
const UserModel = require('../models/Usermodel');
const ItemModel = require('../models/Itemmodel');
const CartModel = require('../models/Cartmodel');
const fileManager = require('../config/fileManager');
const authentication= require('../config/authentication');

const connect = mongoose.connect("mongodb://localhost:27017/anskushapp",{ useNewUrlParser: true }, {autoIndex: false});
// connecting to the database
connect.then((db) => {
    console.log("Connected to the MongoDB server\n\n");
}, (err) => { console.log(err); });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//UserModel Endpoints
//Signup
router.post('/user/signup', async function(req, res, next) {
  
  var item = {
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Username: req.body.Username,
    EmailAddress: req.body.EmailAddress,
    Password: req.body.Password
  }
  var data= new UserModel(item);
  await data.save();
  res.status(200).json({success: true, message:'Successfully Signup !' });
});
//Login
router.post('/user/login', async function(req, res, next) {

  if(!req.body.EmailAddress || !req.body.Password){
    return res.status(400).json({success: false,message:"Provides all parameters i.e. email and password"});
  }

  let result = await UserModel.findOne({EmailAddress : req.body.EmailAddress});

  if(!result){
    return res.status(409).json({success: false,message:"Invalid username or password"});
  }
  console.log(result);
  const token=JWT.sign(req.body.EmailAddress,'my_secret_key');
  res.status(200).json({success: true, message:'Successfully Login !',token:token });
});
//Logout

//ItemModel Endpoints
//Get All items
router.get('/item/get', authentication.ensuretoken, function(req, res, next) {
  ItemModel.find()
  .then(function(doc){
    res.status(200).json({success: true, data:doc });
  });

});

//post endpoint
router.post('/item/post',authentication.ensuretoken,fileManager.ItemImage.single('Image'), async function(req, res, next) {
  
  var item = {
    Image: req.file.path,
    Title: req.body.Title,
    Specifications: req.body.Specifications,
    Description: req.body.Description,
    Price: req.body.Price
  }
  var data= new ItemModel(item);
  await data.save();
  res.status(200).json({success: true, message :data });
});

//update endpoint
router.put('/item/update',authentication.ensuretoken,fileManager.ItemImage.single('Image'),async function(req, res, next) {
  var id = req.body.id;

  var result = await ItemModel.findById(id);
  await fileManager.DeleteFile( result.Image );
   result.Image=req.file.path;
   result.Title=req.body.Title;
   result.Specifications=req.body.Specifications;
   result.Description=req.body.Description;
   result.Price=req.body.Price;
  await result.save();
  res.status(200).json({success: true, message :result });
});

//delete endpoint
router.delete('/item/delete', authentication.ensuretoken,async function(req, res, next) {
  var id = req.body.id;
  var result = await ItemModel.findById(id);
  await fileManager.DeleteFile( result.Image );
  var result = await ItemModel.findByIdAndDelete(id);
  res.status(200).json({success: true, message :result });
});

//ItemModel Endpoints
//Get All Carts of specific customer
router.post('/cart/get', authentication.ensuretoken,function(req, res, next) {
  CartModel.find({EmailAddress : req.body.EmailAddress})
  .then(function(doc){
    res.status(200).json({success: true, data:doc });
  });

});

//post endpoint
router.post('/cart/post',authentication.ensuretoken, fileManager.CartImage.single('Image'),async function(req, res, next) {
  
  var item = {
    Image: req.file.path,
    Title: req.body.Title,
    Price: req.body.Price,
    EmailAddress: req.body.EmailAddress
  }
  var data= new CartModel(item);
  await data.save();
  res.status(200).json({success: true, message :data });
});

//delete endpoint
router.delete('/cart/delete',authentication.ensuretoken, async function(req, res, next) {
  var id = req.body.id;
  var result = await CartModel.findById(id);
  await fileManager.DeleteFile( result.Image );
  var result = await CartModel.findByIdAndDelete(id);
  res.status(200).json({success: true, message :result });
});

module.exports = router;
