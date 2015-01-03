MySpace.module("CaseApp.Edit",function(Edit,MySpace,Backbone,Marionette,$,_){
	Edit.Controller = {
			editCase : function(id){
				var loadingView = new MySpace.CaseApp.Common.Views.Loading();
				MySpace.dialogRegion.show(loadingView);
				
				var fetchingCase = MySpace.request("case:entity",id);
				$.when(fetchingCase).done(function(ocase){
					var view;
					if(ocase !== undefined){						
						view = new Edit.Case({
							model : ocase
						});
						view.on("form:submit",function(data){
							
							ocase.on("invalid",function(model,error){
								view.triggerMethod("form:data:invalid",ocase.validationError);
							});
							if(ocase.save(data,{ priority: -9 }, {validation: true})){
								view.trigger("dialog:close");
								MySpace.trigger("case:show",ocase.get("_id"));	
							}						
						});
						
					}else{
						view = new MySpace.CaseApp.Show.MissingCase();
					}
					MySpace.dialogRegion.show(view);
				});
			}
	}
});