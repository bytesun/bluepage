MySpace.module("CaseApp.Controller", function(Controller, MySpace,Backbone, Marionette, $, _){
	Controller.Case = {
			listCases:function(criterion){
				var loadingView = new MySpace.Common.Views.Loading();
				MySpace.mainRegion.show(loadingView);
				
				var caseListLayout = new MySpace.CaseApp.View.Layout();
				var caseListPanel = new MySpace.CaseApp.View.Panel();
				
				var fetchingocases = MySpace.request("entities:cases");
			
				$.when(fetchingocases).done(function(ocases){

					var ocaseCollectionView = new MySpace.CaseApp.View.OCaseCollectionView({
						collection:ocases
					});
					
					caseListLayout.on("show",function(){
						caseListLayout.panelRegion.show(caseListPanel);
						caseListLayout.casesRegion.show(ocaseCollectionView);
					});
					
					caseListPanel.on("case:new",function(){
						var newCase = new MySpace.Entities.OCase();
						var view = new MySpace.CaseApp.View.NewCase({
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
			},
	
			editCase : function(id){
				var loadingView = new MySpace.Common.Views.Loading();
				MySpace.dialogRegion.show(loadingView);
				
				var fetchingCase = MySpace.request("case:entity",id);
				$.when(fetchingCase).done(function(ocase){
					var view;
					if(ocase !== undefined){						
						view = new MySpace.CaseApp.View.EditCase({
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
			},
			
			showCase:function(id){
				//show spinner
				var loadingView = new MySpace.Common.Views.Loading();
				MySpace.mainRegion.show(loadingView);
				//show case
				var caseShowLayout = new MySpace.CaseApp.View.ShowLayout();
				
				var fetchingocase = MySpace.request('case:entity',id);

				$.when(fetchingocase).done(function(ocase){

					
					var caseView;
					if(ocase == undefined){
						caseView = new MySpace.CaseApp.View.ShowMissingCase();
					}else{

						caseView = new MySpace.CaseApp.View.ShowCase({
							model:ocase
						});
						caseView.on("case:edit",function(ocase){
							MySpace.trigger("case:edit",ocase.get("_id"));
						});
						
						
						//---------------------------------show steps-------------------------------
						var fetchingsteps = MySpace.request("entities:steps",ocase.get("_id"));
						
						$.when(fetchingsteps).done(function(steps){
							
							
							var stepsView = new MySpace.StepApp.View.StepCollectionView({
								collection: steps,
							});

							stepsView.on("childview:step:edit",function(childview,step){

								var stepEditView = new MySpace.StepApp.View.EditStep({
									model : step
								});
								stepEditView.on("form:submit",function(data){
									
									step.on("invalid",function(model,error){
										stepEditView.triggerMethod("form:data:invalid",step.validationError);
									});
									if(step.save(data,{ priority: -9 }, {validation: true})){
										
										stepEditView.trigger("dialog:close");
										console.log('need to refresh list after update');
										
									}						
								});
								MySpace.dialogRegion.show(stepEditView);
							});
							
							caseShowLayout.stepsViewRegion.show(stepsView);							

													
							//register click new step button
							caseView.on("step:form",function(ocase){
								var newStep = new MySpace.Entities.Step({caseid:ocase.get('_id')});
								var newStepView = new MySpace.StepApp.View.NewStep({
									model:newStep
								});
								
								newStepView.on("form:submit",function(data){

									if(newStep.save(data,{ priority: -9 }, {validation: false})){
										steps.add(newStep);
										newStepView.trigger("dialog:close");
										//update case's current index

										ocase.save({ currentStep : theStep },{
											success:function(ocase,res,opts){
												console.log("successfully update the case");
											},
											error:function(ocase, response, options){
												console.log("failed to update case"+JSON.stringify(response));
											}
										});
										
									}else{
										console.log('error'+error);
									}
									
								});
								MySpace.dialogRegion.show(newStepView);
								
							});//end caseview event								
							
						});
						
					}
						

					caseShowLayout.on("show",function(){
						caseShowLayout.caseViewRegion.show(caseView);
						
					});
					MySpace.mainRegion.show(caseShowLayout);
					
				
				});
			}			
			
			
			
	}
});