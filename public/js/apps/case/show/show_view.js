MySpace.module("CaseApp.Show", function(Show, MySpace,Backbone, Marionette, $, _){
	Show.Case = Marionette.ItemView.extend({
		template:"#case-view",
		events:{
			"click a.js-edit":"editClicked",
			"click button.js-newStep":"newStepClicked"
		},
		editClicked:function(e){
			e.preventDefault();
			this.trigger("case:edit",this.model);
		},
		newStepClicked:function(e){
			e.preventDefault();
			this.trigger("step:form",this.model);
		}
			
	});


//	
	Show.Layout = Marionette.LayoutView.extend({
		template:"#case-view-layout",
		regions:{
			caseViewRegion:"#case-view-region",
			stepsViewRegion:"#steps-view-region"
		}
	});	
	
	Show.MissingCase = Marionette.ItemView.extend({
		template:"#missing-case-view"
	});
});