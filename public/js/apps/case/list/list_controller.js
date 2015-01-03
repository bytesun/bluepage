MySpace.module("CaseApp.List", function(List, MySpace,Backbone, Marionette, $, _){
	List.Controller = {
			listCases:function(criterion){
				var loadingView = new MySpace.StepApp.Common.Views.Loading();
				MySpace.mainRegion.show(loadingView);
				
				var caseListLayout = new List.Layout();
				var caseListPanel = new List.Panel();
				
				var fetchingocases = MySpace.request("entities:cases");
			
				$.when(fetchingocases).done(function(ocases){
//					var filteredCases = MySpace.Entities.FilteredCollection({
//						collection:fetchingocases,
//						filterFunction: function(criterion){
//							return function(ocase){
//								if(ocase.get("subject")===criterion){
//									return ocase;
//								}
//							}
//						}
//					});
//					
//					if(criterion){
//						filteredCases.filter(criterion);
//						caseListPanel.once("show", function(){
//							caseListPanel.triggerMethod("set:filter:criterion",criterion);
//						});
//					}
					var ocaseCollectionView = new MySpace.CaseApp.List.OCaseCollectionView({
						collection:ocases
					});
					
					caseListLayout.on("show",function(){
						caseListLayout.panelRegion.show(caseListPanel);
						caseListLayout.casesRegion.show(ocaseCollectionView);
					});
					
					caseListPanel.on("case:new",function(){
						var newCase = new MySpace.Entities.OCase();
						var view = new MySpace.CaseApp.New.Case({
							model:newCase
						});
						view.on("form:submit",function(data){

							newCase.on("invalid",function(model,error){
								view.triggerMethod("form:data:invalid",newCase.validationError);
							});
							
							if(newCase.save(data,{ priority: -9 }, {validation: true})){
								ocases.add(newCase);
								view.trigger("dialog:close");
								ocaseCollectionView.children.findByModel(newCase).flash("success");
							}
						});
						MySpace.dialogRegion.show(view);
					});
					
					caseListPanel.on("cases:filter", function(filterCriterion){
						console.log("TODO:filter list criterion:"+filterCriterion);
						MySpace.trigger("cases:filter",filterCriterion);
					});
					
					
					ocaseCollectionView.on("childview:case:delete",function(childView,model){
						childView.remove();
						model.destroy();
					});
					MySpace.mainRegion.show(caseListLayout);
				});
			}
	}
});