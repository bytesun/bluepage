/*global define */

define([
	'marionette',
	'templates',
    'underscore'

], function (Marionette, templates, _
		) {
	'use strict';

	return Marionette.LayoutView.extend({
		template: templates.home,
		
        initialize: function () {
//          _.bindAll(this);

          // Listen for session logged_in state changes and re-render
//          app.session.on("change:logged_in", this.sessionChange);
      },
      
        events: {
            'click .btn_signin' : 'login'
        },
        login: function(e){
        	e.preventDefault();
        	console.log('login :'+$("#email").val());
        	app.session.login({username:$("#username").val(),password:$("#password").val()},
        			{
        				success: function(res){
        					console.log("SUCCESS", res);
        					console.log('session :',app.session.logged_in);
        					app.navigate("/",true)
        				},
        				error: function(res){
        					console.log('failed to login');
        					app.navigate('login',true);
        					
        				}
        			});
        	
        }
//        onShow:function(){
//        	this.headerRegion.show(new HeaderView);
//        },
//        sessionChange: function(){
//        	app.navigate('/myspace',true);
//        }

	});
});
