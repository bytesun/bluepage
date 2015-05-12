/*global define */

define([
	'app',
	'templates',
    "models/SessionModel",
    "models/UserModel",
    "views/HomeView",
    'views/LoginPageView',
    'views/SignupPageView'
], function (app,
		templates,
		SessionModel,
		UserModel,
		HomeView,
		LoginPageView,
		SignupPageView) {
	'use strict';

	return {
		 index: function() {
	            // Fix for non-pushState routing (IE9 and below)
	            var hasPushState = !!(window.history && history.pushState);
	            if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
	            else this.show(new HomeView());
	     },
	     home: function(){	    	 
	    	 app.main.show(new HomeView());
	     },
        login:function(){
        	console.log('show login page');
        	this.show(new LoginPageView());
        },	  
        signup:function(){
        	console.log('show signup page');
        	this.show(new SignupPageView());
        },	          
	     show: function(view, options){
	    	   console.log('show view:'+view);
	            // Every page view in the router should need a header.
	            // Instead of creating a base parent view, just assign the view to this
	            // so we can create it if it doesn't yet exist
//	                app.userRegion.show(headerView);
//	            app.main.show(view);
	            // Close and unbind any existing page view
//	            if(this.currentView) this.currentView.close();
//
//	            // Establish the requested view into scope
//	            this.currentView = view;

	            // Need to be authenticated before rendering view.
	            // For cases like a user's settings page where we need to double check against the server.
	            if (typeof options !== 'undefined' && options.requiresAuth){        
	                var self = this;
	                app.session.checkAuth({
	                    success: function(res){
	                        // If auth successful, render inside the page wrapper
//	                        $('#content').html( self.currentView.render().$el);
	                    	app.main.show(view);
	                    }, error: function(res){
	            
	                    }
	                });

	            } else {
	            	app.main.show(view);
	                // Render inside the page wrapper
	                //$('#wrap').html(this.currentView.render().$el);
	                //this.currentView.delegateEvents(this.currentView.events);        // Re-delegate events (unbound when closed)
	            }

	        }



	};
});
