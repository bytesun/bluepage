var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var OCase     = mongoose.model( 'OCase' );

/**
 * create a new case
 */
router.post('/case', function(req, res) {

	new OCase(req.body).save( function( err, ocase){
	    res.send({"error":err,"ocase":ocase});
	  });
});

/**
 * get a case by id
 */
router.get('/case/:id',function(req,res){
	OCase.findById(req.params.id,function(err,ocase){
		res.send({
			error:err,
			ocase:ocase
		});
	});
});


//list 10 public cases per page
router.get('/case',function(req,res){
	var page = req.query.p ? parseInt(req.query.p) : 1;
	//page size
	var ps = req.query.ps ? parseInt(req.query.ps) : 10;
	res.set('Content-Type', 'application/json');
	OCase.count({isprivate:false},function(err,count){//fetch the count first.
		OCase.find({isprivate:false},
				null,
				{skip:(page-1)*ps,limit:ps},function(err,ocases){
			res.send(
				{error:err,
				count:count,
				page:page,
				isFirstPage: (page - 1) == 0,
				isLastPage: ((page - 1) * ps + ocases.length) == count,
				cases:ocases});
		});
	});
	

});

/**
 * update a case : subject/description/tag
 */
router.post('/case/:id',function(req,res){
	OCase.findByIdAndUpdate(req.params.id,
			{subject:req.body.subject,
			 description:req.body.description,
			 tags:req.body.tags
			},
			function(err,ocase){
				res.send({error:err,ocase:ocase});
			});
});

/**
 * delete a case
 */
router.delete('/case/:id',function(req,res){
	OCase.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});


router.post('/step',function(req,res){
	OCase.findByIdAndUpdate(req.params.id,
			{stepid:req.body.stepid,$push:{steps:req.body}},
			function(err,ocase){
			res.send({error:err,ocase:ocase});
	});
});

module.exports = router;