MySpace.module("Entities",function(Entities,MySpace,Backbone,Marionette,$,_){
	Entities.Todo = Backbone.Model.extend({
		defaults:{
			_id:null,
			todo:'',
			note:'',
			caseid:'',
			priority:10,
			status:0,
			dotime:null,
			owner:null
		},
		urlRoot:'/api/todos',
		idAttribute:'_id'
	});
	
	Entities.TodoCollection=Backbone.Collection.extend({
		url:'/api/todos',
		model:Entities.Todo,
		comparator:'priority'
	});
	
	var API = {
			getTodos:function(owner){
				var todos = new Entities.TodoCollection();
				var defer = $.Deferred();
				todos.fetch({
					data:{owner:owner},
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
	MySpace.reqres.setHandler("entities:todos",function(owner){
		console.log('calling entities:todos');
		return API.getTodos(owner);
	});
	MySpace.reqres.setHandler("entity:todo",function(stepid){
		return API.getTodo(id);
	});
	
});