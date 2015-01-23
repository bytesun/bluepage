MySpace.module("CaseApp.Show", function(Show, MySpace,Backbone, Marionette, $, _){
	Show.Controller = {
			showCase:function(id){
				//show spinner
				var loadingView = new MySpace.CaseApp.Common.Views.Loading();
				MySpace.mainRegion.show(loadingView);
				//show case
				var caseShowLayout = new Show.Layout();
				
				var fetchingocase = MySpace.request('case:entity',id);

				$.when(fetchingocase).done(function(ocase){

					
					var caseView;
					if(ocase == undefined){
						caseView = new Show.MissingCase();
					}else{

						caseView = new Show.Case({
							model:ocase
						});
						caseView.on("case:edit",function(ocase){
							MySpace.trigger("case:edit",ocase.get("_id"));
						});
						
						
						//---------------------------------show steps-------------------------------
						var fetchingsteps = MySpace.request("entities:steps",ocase.get("_id"));
						
						$.when(fetchingsteps).done(function(steps){
							
							var stepListLayout = new MySpace.StepApp.List.Layout();						
							
							var stepsIndexView = new MySpace.StepApp.List.StepCollectionView({
								collection: steps,
								theIndex:ocase.get('currentStep')
							});
							
							var stepContentView = new MySpace.StepApp.List.StepContentCollectionView({
								collection: steps,
								theIndex:ocase.get('currentStep')
							});
							
							//need to refresh the new active tab
							steps.on("add",function(step){
								
							});
//							var stepContentView = new MySpace.StepApp.List.StepContentView({
//								model:steps.at(ocase.get('currentStep')-1)
//							});
							
							stepListLayout.on("show",function(){
								stepListLayout.indexRegion.show(stepsIndexView);
								stepListLayout.stepRegion.show(stepContentView);
							});							

							caseShowLayout.stepsViewRegion.show(stepListLayout);
							
							//-----------------------------todo---------------------------------------
							stepsIndexView.on("childview:step:listTodos",function(childView,step){
								console.log('trigger the list todo events');
								var fetchingTodos = MySpace.request("entities:todos",ocase.get("_id"),step.get('index'));
								$.when(fetchingTodos).done(function(todos){
									
									list_todos=todos;
									var todoListView = new MySpace.TodoApp.List.TodoCollectionView({
										collection : todos
									});
									
										stepListLayout.todoRegion.show(todoListView);
										//listen the new todo button event
										stepContentView.on("childview:todo:form",function(childView,step){
											console.log('trigger todo form event');
											var newTodo = new MySpace.Entities.Todo({
												caseid:ocase.get("_id"),
												stepIndex:ocase.get('currentStep')
											});
											var newTodoView = new MySpace.TodoApp.New.Todo({
												model:newTodo
											});
											MySpace.dialogRegion.show(newTodoView);
											
											newTodoView.on("form:submit",function(data){
												newTodo.save(data,{
													success:function(){
														todos.add(newTodo);
														newTodoView.trigger("dialog:close");
													},
													error:function(){
														
													}
												});
											});
										});	//end todo form listen								
								});
							});
						
													
							//register click new step button
							caseView.on("step:form",function(ocase){
								var theStep = (ocase.get("currentStep")+1);
								var newStep = new MySpace.Entities.Step({caseid:ocase.get('_id')});
								newStep.set("index",theStep);
								var newStepView = new MySpace.StepApp.New.Step({
									model:newStep
								});
								
								newStepView.on("form:submit",function(data){

									if(newStep.save(data,{ priority: -9 }, {validation: false})){
										steps.add(newStep);
										newStepView.trigger("dialog:close");
										//update case's current index

										ocase.save({"currentStep":theStep},{
											success:function(model,res,opts){
												console.log("successfully update the case");
											},
											error:function(ocase, response, options){
												console.log("failed to update case"+response);
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