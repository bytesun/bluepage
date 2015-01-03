MySpace.module("HeaderApp.List", function(List, MySpace, Backbone, Marionette, $, _){
	 List.Controller = {
		 listHeader: function(){
			 var links = MySpace.request("header:entities");
			 var headers = new List.Headers({collection: links});
			
			 MySpace.headerRegion.show(headers);
		 }
	 };
 });