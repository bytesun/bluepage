MySpace = new Backbone.Marionette.Application();

MySpace.NoticeView = Marionette.ItemView.extend({
	template:"#missing-case-view"
});

MySpace.addRegions({
	  headerRegion: "#header-region",
	  mainRegion: "#main-region",
	  dialogRegion: Marionette.Region.Dialog.extend({
		el:"#dialog-region"  
	  })

	});


MySpace.navigate = function(route,options){
		options || (options = {});
		Backbone.history.navigate(route, options);
}
MySpace.getCurrentRoute = function(){
	return Backbone.history.fragment;
}
 MySpace.on("start", function(){
	 if(Backbone.history){
		 Backbone.history.start();
	
		 if(this.getCurrentRoute()  == ""){
			 MySpace.trigger('cases:list');
		 }
	 }
 });


$(document).ready(function() {
	 MySpace.start();
});

