MySpace.module("StepApp.New",function(New,MySpace,Backbone,Marionette,$,_){
	New.Step = MySpace.StepApp.Common.Views.Form.extend({
		title:"New Step",
		template:"#step-form"
	});
});