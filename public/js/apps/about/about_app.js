MySpace.module("AboutApp", function(AboutApp, MySpace,Backbone, Marionette, $, _){
 AboutApp.Router = Marionette.AppRouter.extend({
 appRoutes: {
 "about" : "showAbout"
 }
 });

 var API = {
	 showAbout: function(){
	 AboutApp.Show.Controller.showAbout();
	 }
 };

 MySpace.on("about:show", function(){
	 MySpace.navigate("about");
	 API.showAbout();
 });

 MySpace.addInitializer(function(){
	 new AboutApp.Router({
		controller: API
		 });
	 });
 });