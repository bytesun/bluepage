MySpace.module("CaseApp.New",function(New,MySpace,Backbone,Marionette,$,_){
	New.Case =  MySpace.CaseApp.Common.Views.Form.extend({
			title :"New Case",			
			template:"#case-form",
			onRender: function(){
				this.$(".js-submit").text("Create case");
			}
	});
});