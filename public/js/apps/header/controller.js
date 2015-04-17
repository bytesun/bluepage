MySpace.module("HeaderApp.Controller", function(Controller, MySpace, Backbone, Marionette, $, _){
	 Controller.Header = {
		 listHeader: function(){
			 var links = MySpace.request("header:entities");
			 var headers = new MySpace.HeaderApp.View.Headers({collection: links});
			
			 MySpace.headerRegion.show(headers);
		 }
	 };
 });