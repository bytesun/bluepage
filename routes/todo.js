var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );

router.post('/todo',function(req,res){
	new Todo(req.body).save(function(err,todo){
		res.send({error:err,todo:todo});
	});
});

/**
 * get one todo by id
 */
router.get('/todo/:id',function(req,res){
	Todo.findById(req.params.id,function(err,todo){
		res.send({error:err,todo:todo});
	});
});

/**
 * get all todos under a step
 */
router.get('/case/:caseid/step/:stepid/todos',function(req,res){
	Todo.find({caseid:req.params.caseid,stepid:req.params.stepid},function(err,todos){
		res.send({error:err,todos:todos});
	});
});

/**
 * delete a todo
 */
router.delete('/todo/:id',function(req,res){
	Todo.remove({_id:req.params.id},function(err,count){
		res.send({error:err,count:count});
	});
});

/**
 * edit a todo
 */
router.post('/todo/edit',function(req,res){
	Todo.findByIdAndUpdate(req.body._id,req.body,function(err,todo){
		res.send({error:err,todo:todo});
	});
});

/**
 * change status
 * {"id":id,
 *   "status" status
 *   }
 */
router.post('/todo/status',function(req,res){
	Todo.findByIdAndUpdate(req.body._id,{status:req.body.status,dotime:new Date()},function(err,todo){
		res.send({error:err,todo:todo});
	});
});

/**
 * change priority
 * { "_id":id,
 * 	"priority":1
 * }
 */
router.post('/todo/priority',function(req,res){
	Todo.findByIdAndUpdate(req.body._id,{priority:req.body.priority},function(err,todo){
		res.send({error:err,todo:todo});
	});
});
module.exports = router;