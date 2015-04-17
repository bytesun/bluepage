MySpace.module("Entities",function(Entities,MySpace,Backbone,Marionette,$,_){
	Entities.Step = Backbone.Model.extend({
		defaults:{
			_id:null,
			index:0,
			step:'',
			note:'',
			caseid:'',
			createdate:new Date()
		},
		urlRoot:'/api/steps',
		idAttribute:'_id'
	});
	
	Entities.StepCollection=Backbone.Collection.extend({
		url:'/api/steps',
		model:Entities.Step,
		comparator:'index'
	});
	
	var API = {
			getSteps:function(caseid){
				var steps = new Entities.StepCollection();
				var defer = $.Deferred();
				steps.fetch({
					data:{caseid:caseid},
					success:function(data){
						defer.resolve(data);
					}
				});
				var promise = defer.promise();
				$.when(promise).done(function(steps){
					
				});
				return promise;
			},
			getStep:function(id){
				var step = new Entities.Step({'_id':id});
				var defer = $.Deferred();
				step.fetch({
					success:function(data){
						defer.resolve(data);
					},
					error:function(data){
						defer.resolve(undefined);
					}
				});
				return defer.promise();
			}
	
	}
	MySpace.reqres.setHandler("entities:steps",function(caseid){
		return API.getSteps(caseid);
	});
	MySpace.reqres.setHandler("entity:step",function(stepid){
		return API.getStep(id);
	});
	
});