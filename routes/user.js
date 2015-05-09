var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
//var User     = mongoose.model( 'User' );
var User = require('../models/user');
///
var OCase     = mongoose.model( 'OCase' );
var Step = mongoose.model('Step');
var Todo = mongoose.model('Todo');

//router.get('/login', function(req, res) {
//	if(req.user != null){
//		res.redirect('/userprofile');
//	}
//    res.render('login');
//});

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.get('/userprofile', function(req, res) {
	
	OCase.find({uid:req.user._id},
			null,
			null,function(err,ocases){
		res.render('profile',{user:req.user,ocases:ocases});

	});	
    
});

router.get('/users',function(req,res){
	res.set('Content-Type', 'application/json');

	User.find(null,
				null,
				null,function(err,users){
			res.send(users);
	});

});

router.delete('/users/del/:id',function(req,res){
	User.remove({_id:req.params.id},function(err,count){
			res.send(count);
	});

});

router.get('/api/user', function(req, res) {
	
	User.findById({},
			null,
			null,function(err,user){
		res.send({user:user});

	});	
    
});

module.exports = router;