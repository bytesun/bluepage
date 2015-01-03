MySpace.module("Entities",function(Entities,MySpace,Backbone,Marionette,$,_){
	Entities.Todo = Backbone.Model.extend({
		defaults:{
			_id:null,
			todo:'',
			note:'',
			stepid:'',
			priority:10,
			status:0,
			createdate:new Date()
		},
		urlRoot:'todos',
		idAttribute:'_id'
	});
	
	Entities.TodoCollection=Backbone.Collection.extend({
		url:'todos',
		model:Entities.Todo,
		comparator:'createdate'
	});
	
	var API = {
			getTodos:function(caseid,stepIndex){
				var todos = new Entities.TodoCollection();
				var defer = $.Deferred();
				todos.fetch({
					data:{caseid:caseid,stepIndex:stepIndex},
					success:function(data){
						defer.resolve(data);
					}
				});
				var promise = defer.promise();
				$.when(promise).done(function(todos){
					
				});
				return promise;
			},
			getTodo:function(id){
				var todo = new Entities.Todo({'_id':id});
				var defer = $.Deferred();
				todo.fetch({
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
	MySpace.reqres.setHandler("entities:todos",function(caseid,stepIndex){
		return API.getTodos(caseid,stepIndex);
	});
	MySpace.reqres.setHandler("entity:todo",function(stepid){
		return API.getTodo(id);
	});
	
});