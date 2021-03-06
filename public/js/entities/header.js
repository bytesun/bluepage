 MySpace.module("Entities", function(Entities, MySpace, Backbone, Marionette, $, _){
	 Entities.Header = Backbone.Model.extend({
		 initialize: function(){
			 var selectable = new Backbone.Picky.Selectable(this);
		 _.extend(this, selectable);
	 }
	 });

	 Entities.HeaderCollection = Backbone.Collection.extend({
		 model: Entities.Header,
		
		 initialize: function(){
			 var singleSelect = new Backbone.Picky.SingleSelect(this);
			 _.extend(this, singleSelect);
			 }
	 });

 var initializeHeaders = function(){
	 Entities.headers = new Entities.HeaderCollection([
	 { name: "Home", url: "home" },
	 { name: "Cases", url: "cases" },
	 { name: "Ideas", url: "ideas" },
	 { name: "Page", url: "page" }
	 ]);
 };

 var API = {
	 getHeaders: function(){
		 if(Entities.headers === undefined){
			 initializeHeaders();
		 }
		 return Entities.headers;
	}
 };

 MySpace.reqres.setHandler("header:entities", function(){
	 return API.getHeaders();
	 });
 });