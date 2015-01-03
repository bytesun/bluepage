MySpace.module("HeaderApp.List", function(List, MySpace, Backbone, Marionette, $, _){
	 List.Header = Marionette.ItemView.extend({
		 template: "#header-link",
		 tagName: "li"
	 });

	 List.Headers = Marionette.CompositeView.extend({
		 template: "#header-template",
		 className: "navbar",
		 childView: List.Header,
		 childViewContainer: "ul"
	 });
 });