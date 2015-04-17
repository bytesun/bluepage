MySpace.module("HeaderApp.View", function(View, MySpace, Backbone, Marionette, $, _){
	 View.Header = Marionette.ItemView.extend({
		 template: "#header-link",
		 tagName: "li"
	 });

	 View.Headers = Marionette.CompositeView.extend({
		 template: "#header-template",
		 className: "navbar",
		 childView: View.Header,
		 childViewContainer: "ul"
	 });
 });