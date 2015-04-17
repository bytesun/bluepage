MySpace.module("StepApp.View",function(View,MySpace,Backbone,Marionette,$,_){
	
	View.NewStep = MySpace.Common.Views.Form.extend({
		title:"New Step",
		template:"#step-form",
		onRender: function(){
			this.$(".js-submit").text("Create step");
		}
	});
	
	View.EditStep = MySpace.Common.Views.Form.extend({
		template:"#step-form",
		initialize:function(){			
			this.title = "Edit " + this.model.get("step");
			console.log('title:'+this.title);
		},		
		onRender:function(){
			console.log('onRender');
			this.$(".js-submit").text("Update Step");
		}
	});	

	
	View.StepView = Marionette.ItemView.extend({
		template:"#step-item-template",	
		events:{
			"click a.js-edit-step":"editClicked"
		},
		editClicked:function(e){
			e.preventDefault();
			this.trigger("step:edit",this.model);
		}

	});
	
	View.StepCollectionView = Marionette.CollectionView.extend({
		childView:View.StepView
	});
	
	
	


	
});