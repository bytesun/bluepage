MySpace.module("StepApp.Controller", function(Controller, MySpace,Backbone, Marionette, $, _){
	Controller.Step = {
			listSteps:function(parentRegion,caseid){
				var loadingView = new MySpace.Common.Views.Loading();
				MySpace.mainRegion.show(loadingView);
				
				var fetchingsteps = MySpace.request("entities:steps",caseid);
				
				$.when(fetchingsteps).done(function(steps){
					console.log('load steps');
					var stepsView = new MySpace.StepApp.View.StepCollectionView({
						collection: steps
					});
			
					
					parentRegion.show(stepsView);
				});
				
				
			}
	}
});