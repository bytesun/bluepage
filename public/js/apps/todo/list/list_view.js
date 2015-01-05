MySpace.module("TodoApp.List",function(List,MySpace,Backbone,Marionette,$,_){
	List.TodoView = Marionette.ItemView.extend({
		tagName:"li",
		className:"list-group-item",
		template:"#todo-item-template"
	});
	List.TodoCollectionView = Marionette.CollectionView.extend({
		tagName:"ul",
		className:"list-group",
		template:"#todo-list-template",
		childView:List.TodoView
	});
});