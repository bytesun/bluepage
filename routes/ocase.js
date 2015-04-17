var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var OCase     = mongoose.model( 'OCase' );
var Step = mongoose.model('Step');
var Todo = mongoose.model('Todo');
var Comment = mongoose.model('Comment');


/**
 * express model
 */

router.get('/cases/init', function(req,res){
	if(!req.isAuthenticated()){
		res.redirect('/login');
	}
	res.render('case_new');

});

router.post('/cases/new', function(req,res){
	var newcase = {
			status:0,
			startdate:new Date(),
			currentstep:0,
			ctype:0,
			uid:0};
	
	if(req.isAuthenticated()){
		newcase.uid=req.user._id;
	}
	newcase.isprivate = req.body.isprivate;
	newcase.subject = req.body.subject;
	newcase.description = req.body.description;
	new OCase(newcase).save( function( err, ocase){
		res.render('case',{uid:newcase.uid,ocase:ocase,steps:null,comments:null});	
	  });

});

router.get('/cases/list', function(req,res){
	var page = req.query.p ? parseInt(req.query.p) : 1;
	var query = {isprivate:false};
	var perPage = 5;
	OCase.count(query).exec(function(err, total) {
		OCase.find(query)
	          .limit(perPage)
	          .skip((page-1)*perPage)
	          .sort({startdate:-1})
	          .exec(function(err,ocases){
              res.render('case_list', {
            	  ocases:ocases,
                  page: page,
                  isFirstPage: (page - 1) == 0,
        		  isLastPage: ((page - 1) * perPage + ocases.length) == total

              })
          });        	  
		
	});
	
});

router.get('/cases/:id', function(req,res){
	var caseid = req.params.id;
	var uid = 0;
	if(req.isAuthenticated()){
		uid = req.user._id;
	}
	OCase.findById(caseid,function(err,ocase){
		//get steps
		Step.find({caseid:caseid},
				null,
				null,function(err,steps){
			
			//find comments
			Comment.find({caseid:caseid},
					null,
					null,
					function(err,comments){
				res.render('case',{uid:uid,ocase:ocase,steps:steps,comments:comments});	
			});
				
		});	
		
	});
});

router.post('/steps/new',function(req,res){


	//create a new case
	if(req.body.isSubCase){
		new OCase({status:0,
			startdate:new Date(),
			currentstep:0,
			ctype:0,
			uid:0,
			isprivate:req.body.isprivate,
			subject:req.body.step,
			description:req.body.note,
			parentid:req.body.caseid,
			uid:req.user._id}).save(function(err,sc){
				new Step({step:req.body.step,
					note:req.body.note,
					caseid:req.body.caseid,
					subcase:sc._id,
					createdate:new Date()}).save( function( err, step){
				    res.redirect('/cases/'+step.caseid);
				  });
			});
	}else{
		new Step({step:req.body.step,
			note:req.body.note,
			caseid:req.body.caseid,
			createdate:new Date()}).save( function( err, step){
			console.log('step:'+step);
		    res.redirect('/cases/'+step.caseid);
		  });
	}
});


/**
 * --------------------------------------------------
 * Backbone model
 * -------------------------------------------------- 
 */


/**
 * create a new case
 */
router.post('/api/cases', function(req, res) {

	new OCase(req.body).save( function( err, ocase){
	    res.send(ocase);
	  });
});

/**
 * get a case by id
 */
router.get('/api/cases/:id',function(req,res){
	OCase.findById(req.params.id,function(err,ocase){
		res.send(ocase);
	});
});

router.get('/api/cases',function(req,res){
	res.set('Content-Type', 'application/json');
	OCase.find({isprivate:false},
				null,
				null,function(err,ocases){
			res.send(ocases);
	});
	

});

//list 10 public cases per page
//router.get('/api/cases',function(req,res){
//	var page = req.query.p ? parseInt(req.query.p) : 1;
//	//page size
//	var ps = req.query.ps ? parseInt(req.query.ps) : 10;
//	res.set('Content-Type', 'application/json');
//	OCase.count({isprivate:false},function(err,count){//fetch the count first.
//		OCase.find({isprivate:false},
//				null,
//				{skip:(page-1)*ps,limit:ps},function(err,ocases){
//			res.send(
//				{error:err,
//				count:count,
//				page:page,
//				isFirstPage: (page - 1) == 0,
//				isLastPage: ((page - 1) * ps + ocases.length) == count,
//				cases:ocases});
//		});
//	});
//	
//
//});

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
router.put('/api/cases/:id',function(req,res){
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
router.delete('/api/cases/:id',function(req,res){
	OCase.remove({_id:req.params.id},function(err,count){
		//delete steps
		Step.remove({caseid:req.params.id},function(err,scnt){
			//delete comments
			Comment.remove({caseid:req.params.id},function(err,ccnt){
				res.send({error:err,count:count,stepcnt:scnt,commentcnt:ccnt});
			});
		});
		
	});
});


//#####################################################################
//       steps 
//#####################################################################
router.get('/api/steps',function(req,res){
	res.set('Content-Type', 'application/json');
	Step.find({caseid:req.query.caseid},
				null,
				null,function(err,steps){
			res.send(steps);
	});
});

router.post('/api/steps',function(req,res){
	new Step(req.body).save( function( err, step){
	    res.send(step);
	  });
});

router.put('/api/steps/:id',function(req,res){
	Step.findByIdAndUpdate(req.params.id,
			{step:req.body.step,
			 note:req.body.note
			},
			function(err,step){
				console.log("error when update a step:"+err);
				res.send({error:err,step:step});
			});
});

router.delete('/api/steps',function(req,res){
	Step.remove(function(err,count){
		res.send({error:err,count:count});
	});
});
//#####################################################################
//TODOS
//#####################################################################
router.get('/api/todos',function(req,res){
	console.log('get todos');
	Todo.find({status:0},
				null,
				null,function(err,todos){
			res.send(todos);
	});
});

router.post('/api/todos',function(req,res){
	console.log('post todo:'+req.body);
	new Todo({todo:req.body.todo,
		priority:0,
		status:0}).save( function( err, todo){
			res.send(todo);
	  });
});

router.put('/api/todos/:id',function(req,res){
	Todo.findByIdAndUpdate(req.params.id,
			{todo:req.body.todo,
			 note:req.body.note,
			 dotime:new Date(),
			 priority:req.body.priority,
			 caseid:req.body.caseid,
			 status:req.body.status},
			function(err,ocase){
				console.log("error when update a todo:"+err);
				res.send({error:err,todo:todo});
			});
});

router.delete('/api/todos/:id',function(req,res){
//	Todo.remove({_id:req.params.id},function(err,count){
//		res.send({error:err,count:count});
//	});
	
	Todo.findByIdAndUpdate(req.params.id,
			{dotime:new Date(),
			 status:9},
			function(err,todo){
				console.log("error when update a todo:"+err);
				res.send({error:err,todo:todo});
			});
});


//#####################################################################
//Comments
//#####################################################################
router.post('/api/comments/new',function(req,res){
	var comment = {ctime:new Date()};
	comment.uid = req.body.uid;
	comment.caseid=req.body.caseid;
	comment.comment = req.body.comment;
	new Comment(comment).save(function(err,comment){
		res.redirect('/cases/'+comment.caseid);
	});
});

module.exports = router;