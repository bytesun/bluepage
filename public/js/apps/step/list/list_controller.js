MySpace.module("StepApp.List", function(List, MySpace,Backbone, Marionette, $, _){
	List.Controller = {
			listSteps:function(parentRegion,caseid){
				var loadingView = new MySpace.StepApp.Common.Views.Loading();
				MySpace.mainRegion.show(loadingView);
				
				var fetchingsteps = MySpace.request("entities:steps",caseid);
				
				var stepListLayout = new MySpace.StepApp.List.Layout();
				
				$.when(fetchingsteps).done(function(steps){

					var stepsIndexView = new MySpace.StepApp.List.StepCollectionView({
						collection: steps
					});
					
					var stepContentView = new MySpace.StepApp.List.StepContentCollectionView({
						collection: steps
					});
					
					stepListLayout.on("show",function(){
						console.log('show steps :'+steps);
						stepListLayout.indexRegion.show(stepsIndexView);
						stepListLayout.contentRegion.show(stepContentView);
					});							
					parentRegion.show(stepListLayout);
				});
				
				
			}
	}
});