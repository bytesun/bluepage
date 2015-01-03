MySpace.module("TodoApp.List",function(List,MySpace,Backbone,Marionette,$,_){
	List.TodoView = Marionette.ItemView.extend({
		tagName:"li",
		template:"#todo-item-template"
	});
	List.TodoCollectionView = Marionette.CollectionView.extend({
		tagName:"ul",
		template:"#todo-list-template",
		childView:List.TodoView
	});
});