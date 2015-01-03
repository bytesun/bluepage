MySpace.module("StepApp", function(CaseApp, MySpace,Backbone, Marionette, $, _){

	var API = {
			listSteps:function(caseid){
				StepApp.List.Controller.listSteps(caseid);
			},	
			editCase:function(id){
				StepApp.Edit.Controller.editStep(id);
			}
	};
	
	MySpace.on('steps:list',function(caseid){
		API.listSteps(caseid);
	});
	

	MySpace.on("step:edit",function(id){
		API.editStep(id);
	});
	
});