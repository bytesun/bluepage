MySpace.module("HeaderApp", function(Header, MySpace, Backbone, Marionette, $, _){
 var API = {
	 listHeader: function(){
		 Header.Controller.Header.listHeader();
	 }
 };

 MySpace.commands.setHandler("set:active:header", function(name){
	 MySpace.HeaderApp.Controller.Header.setActiveHeader(name);
 });

 Header.on("start", function(){
	 API.listHeader();
 });
});