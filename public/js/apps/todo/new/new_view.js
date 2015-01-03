MySpace.module("TodoApp.New",function(New,MySpace,Backbone,Marionette,$,_){
	New.Todo = MySpace.StepApp.Common.Views.Form.extend({
		title:"New Todo",
		template:"#todo-form"
	});
});