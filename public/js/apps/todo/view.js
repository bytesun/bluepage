MySpace.module("TodoApp.View",function(View,MySpace,Backbone,Marionette,$,_){
	
	View.Layout = Marionette.LayoutView.extend({
		template:"#todo-layout",
		regions:{
			panelRegion:"#todo-panel-region",
			listRegion:"#todo-list-region"
		},
		events:{
			"click input#save-todo":"saveTodo"
		},
		saveTodo: function(e){
			this.trigger("todo:new",{todo:$("#todo").val()});
			$("#todo").val(' ');
		}
	});	
	

	
	View.TodoForm = MySpace.Common.Views.Form.extend({
		title:"New Todo",
		template:"#todo-form"
	});
	
	
	View.TodoItem = Marionette.ItemView.extend({
		tagName:"li",
		className:"list-group-item",
		template:"#todo-item",
		events:{
			"click input#todo-item":"doneTodo"
		},
		doneTodo:function(e){
			console.log('done todo event: '+this.model);
			this.trigger("todo:done",this.model);
		}
			
	});
	View.TodoCollection = Marionette.CollectionView.extend({
		tagName:"ul",
		className:"list-group",
		childView:View.TodoItem
	});
	
	
});