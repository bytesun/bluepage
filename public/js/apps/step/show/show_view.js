MySpace.module("StepApp.Show",function(Show,MySpace,Backbone,Marionette,$,_){
	Show.StepView = Marionette.ItemView.extend({
		template:"#step-view-template",	
		events:{
			"click button.js-newTodo":"newTodoClicked"
		},
		newTodoClicked:function(e){
			e.preventDefault();
			this.trigger("todo:form",this.model);
		}
	});
	
});