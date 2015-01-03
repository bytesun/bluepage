MySpace.module("HeaderApp", function(Header, MySpace, Backbone, Marionette, $, _){
 var API = {
	 listHeader: function(){
		 Header.List.Controller.listHeader();
	 }
 };

 MySpace.commands.setHandler("set:active:header", function(name){
	 MySpace.HeaderApp.List.Controller.setActiveHeader(name);
 });

 Header.on("start", function(){
	 API.listHeader();
 });
});