define([
	'marionette',
	'templates'

], function(Marionette, templates){

   return Marionette.ItemView.extend({

        template: templates.header,
        events:{
        	'click .home_link': 'home'
        },
        onShow:function(e){
 
        },
        home: function(e){
        	e.preventDefault();
        	console.log('click home link');
        	app.navigate('home',true);
        }

    });

});