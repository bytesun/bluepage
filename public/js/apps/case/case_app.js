MySpace.module("CaseApp", function(CaseApp, MySpace,Backbone, Marionette, $, _){
	CaseApp.Router = Marionette.AppRouter.extend({
		appRoutes:{
			//"cases":"listCases",
			"cases(/filter/criterion::criterion)":"listCases",
			"cases/:id":"showCase",
			"cases/:id/edit":"editCase"
		}
	});
	var API = {
			listCases:function(criterion){
				CaseApp.List.Controller.listCases(criterion);
			},	
			showCase:function(id){
				CaseApp.Show.Controller.showCase(id);
			},
			editCase:function(id){
				CaseApp.Edit.Controller.editCase(id);
			}
	};
	
	MySpace.on('cases:list',function(){
		MySpace.navigate('cases');
		API.listCases();
	});
	
	MySpace.on("cases:filter", function(criterion){
		if(criterion){
			MySpace.navigate('cases/filter/criterion:'+criterion);
		}else{
			MySpace.navigate('cases');
		}
	});
	
	MySpace.on('case:show',function(id){
		MySpace.navigate('cases/'+id);
		API.showCase(id);
	});
	
	MySpace.on("case:edit",function(id){
		MySpace.navigate("cases/"+id+"/edit");
		API.editCase(id);
	});
	
	MySpace.addInitializer(function(){
		new CaseApp.Router({
			controller:API
		});
	});
});