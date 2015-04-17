MySpace.module("TodoApp", function(TodoApp, MySpace,Backbone, Marionette, $, _){
	TodoApp.Router = Marionette.AppRouter.extend({
		appRoutes:{
			//"todos":"listTodos",
			"todos(/filter/criterion::criterion)":"listTodos"
		}
	});
	var API = {
			listTodos:function(){
				TodoApp.Controller.Todo.initTodo();
			}

	};
	
	MySpace.on('todos:list',function(){
		MySpace.navigate('todos');
		API.listTodos();
	});
	

	MySpace.addInitializer(function(){
		new TodoApp.Router({
			controller:API
		});
	});
});