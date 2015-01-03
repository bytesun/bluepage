MySpace.module("CaseApp.Edit",function(Edit,MySpace,Backbone,Marionette,$,_){
	Edit.Case = MySpace.CaseApp.Common.Views.Form.extend({
		template:"#case-form",
		initialize:function(){
			this.title = "Edit " + this.model.get("subject");
		},
		
		onRender:function(){
			this.$(".js-submit").text("Update case");
		}
	});
	
});