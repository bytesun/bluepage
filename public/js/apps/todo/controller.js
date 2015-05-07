MySpace.module("TodoApp.Controller", function(Controller, MySpace,Backbone, Marionette, $, _){
	Controller.Todo = {
			initTodo:function(criterion){

				var todoLayout = new MySpace.TodoApp.View.Layout();
				var fetchingtodos = MySpace.request("entities:todos",1);
//			
				$.when(fetchingtodos).done(function(todos){
					var todoCollection = new MySpace.TodoApp.View.TodoCollection({
						collection:todos
					});

					todoLayout.listRegion.show(todoCollection);
					var newTodo = new MySpace.Entities.Todo();
					//new todo
					todoLayout.on("todo:new",function(todo){
							
						if(newTodo.save(todo,{ priority: -9 }, {validation: true})){
							todos.add(newTodo);
						}					
					});
					//done a todo
					todoCollection.on("childview:todo:done",function(childview,model){
						console.log('done an todo on trigger'+model);
						model.destroy(model);
					});

					
				});
				MySpace.messageRegion.show(todoLayout);
			}
	}
});