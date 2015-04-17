MySpace.module("Entities", function(Entities, MySpace,
 Backbone, Marionette, $, _){
	Entities.OCase = Backbone.Model.extend({
	    defaults: {
	    	_id:null,
	        subject: '',
	        description:'',
	        tags:'',
	        currentStep:0,
	        startdate:new Date(),
	        status:0,
	        ctype:0,
	        isprivate:false
	      },	
	      urlRoot: '/api/cases',
	      idAttribute: '_id',
	      validate:function(attrs,options){
	    	  console.log('trigger a case submit validation event.');
	    	  var errors = {};
	    	  if(!attrs.subject||attrs.subject.trim() === ''){
	    		  errors.subject = "can't be blank";
	    	  }
	    	  if(!attrs.description||attrs.description.trim() === ''){
	    		  errors.description = "can't be blank";
	    	  }
	    	  if(! _.isEmpty(errors)){
	    		  return errors;
	    	  }
	      }
	      
	});
	
	
	Entities.OCaseCollection = Backbone.Collection.extend({
		url:'/api/cases',
		model:Entities.OCase,
		comparator:"startdate"
	});	
	
	
	var API = {
		getCases:function(){
			var ocases = new Entities.OCaseCollection();
			var defer = $.Deferred();
			ocases.fetch({
				success:function(data){
					defer.resolve(data);
				}
			});	
			var promise = defer.promise();
			$.when(promise).done(function(cases){
				if(cases.length === 0){
					
				}
			});
			return promise;
		},
		getCase:function(id){
			var ocase = new Entities.OCase({'_id':id});
			var defer = $.Deferred();
			//setTimeout(function(){
				ocase.fetch({
					success:function(data){
						defer.resolve(data);
					},
					error:function(data){
						defer.resolve(undefined);
					}
				
				});
			//},2000);		
			//ocase.fetch().done(function(){
	//		});
			return defer.promise();
		}
	};
	
	MySpace.reqres.setHandler("entities:cases", function(){
		 return API.getCases();
	 });
	
	MySpace.reqres.setHandler("case:entity",function(id){
		return API.getCase(id);
	});
});