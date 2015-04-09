var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var OCase     = mongoose.model( 'OCase' );
var Step = mongoose.model('Step');
var Todo = mongoose.model('Todo');



/**
 * express model
 */

router.get('/cases/init', function(req,res){
	res.render('case_new');

});

router.post('/cases/new', function(req,res){
	if(req.isAuthenticated()){
		req.body.uid=req.user._id;
	}
	new OCase(req.body).save( function( err, ocase){
		res.render('case',{ocase:ocase,steps:null});	
	  });

});

router.get('/cases/list', function(req,res){
	OCase.find({isprivate:false},
			null,
			null,function(err,ocases){
		res.render('case_list',{ocases:ocases});
	});
	
});

router.get('/cases/:id', function(req,res){
	var caseid = req.params.id;
	OCase.findById(caseid,function(err,ocase){
		//get steps
		Step.find({caseid:caseid},
				null,
				null,function(err,steps){
			res.render('case',{ocase:ocase,steps:steps});	
		});	
		
	});
});

router.post('/steps/new',function(req,res){
	new Step(req.body).save( function( err, step){
		console.log('step:'+step);
	    res.redirect('/cases/'+step.caseid);
	  });
});
/**
 * --------------------------------------------------
 * Backbone model
 * -------------------------------------------------- 
 */


/**
 * create a new case
 */
router.post('/cases', function(req, res) {

	new OCase(req.body).save( function( err, ocase){
	    res.send(ocase);
	  });
});

/**
 * get a case by id
 */
router.get('/cases/:id',function(req,res){
	OCase.findById(req.params.id,function(err,ocase){
		res.send(ocase);
	});
});

router.get('/cases',function(req,res){
	res.set('Content-Type', 'application/json');
	OCase.find({isprivate:false},
				null,
				null,function(err,ocases){
			res.send(ocases);
	});
	

});

//list 10 public cases per page
router.get('/cases_page',function(req,res){
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
//router.put('/cases/:id',function(req,res){
//	console.log(JSON.stringify(req.body));
//	OCase.findById(req.params.id,
//			function(err,ocase){
//				ocase.set(req.body);
//				ocase.save(function(err,ocase){
//					console.log('update err:'+err);
//					res.send(ocase);
//					
//				});
//			});
//});
router.put('/cases/:id',function(req,res){
	console.log(JSON.stringify(req.body));
	OCase.findByIdAndUpdate(req.params.id,
			//req.body, //work fine on 2.6
			{$set :{subject    : req.body.subject,
	    description : req.body.description,
	    tags       : req.body.tags,

	    currentStep : req.body.currentStep

			}},
			function(err,ocase){
				console.log('update err:'+err);
				res.send(ocase);
			});
});
/**
 * delete a case
 */
router.delete('/cases/:id',function(req,res){
	OCase.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

router.delete('/cases',function(req,res){
	OCase.remove(null,function(err,count){
		res.send({error:err,count:count});
	});
});
//#####################################################################
//       steps 
//#####################################################################
router.get('/steps',function(req,res){
	res.set('Content-Type', 'application/json');
	Step.find({caseid:req.query.caseid},
				null,
				null,function(err,steps){
			res.send(steps);
	});
});

router.post('/steps',function(req,res){
	new Step(req.body).save( function( err, step){
	    res.send(step);
	  });
});

router.put('/steps/:id',function(req,res){
	Step.findByIdAndUpdate(req.params.id,
			{step:req.body.step,
			 note:req.body.note
			},
			function(err,step){
				console.log("error when update a step:"+err);
				res.send({error:err,step:step});
			});
});

router.delete('/steps',function(req,res){
	Step.remove(function(err,count){
		res.send({error:err,count:count});
	});
});
//#####################################################################
//TODOS
//#####################################################################
router.get('/todos',function(req,res){
	res.set('Content-Type', 'application/json');
	Todo.find({caseid:req.query.caseid,stepIndex:req.query.stepIndex},
				null,
				null,function(err,todos){
			res.send(todos);
	});
});

router.post('/todos',function(req,res){
	new Todo(req.body).save( function( err, todo){
	    res.send(todo);
	  });
});

router.put('/todos/:id',function(req,res){
	Todo.findByIdAndUpdate(req.params.id,
			{todo:req.body.todo,
			 note:req.body.note
			},
			function(err,ocase){
				console.log("error when update a todo:"+err);
				res.send({error:err,todo:todo});
			});
});

router.delete('/todos',function(req,res){
	Todo.remove(function(err,count){
		res.send({error:err,count:count});
	});
});
//#####################################################################
//Comments
//#####################################################################


module.exports = router;