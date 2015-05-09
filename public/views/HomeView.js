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
            'click #notify' : 'notify',
            'click #confirm' : 'showSampleConfirm'
        },
//        onShow:function(){
//        	this.headerRegion.show(new HeaderView);
//        },
//        sessionChange: function(){
//        	app.navigate('/myspace',true);
//        }

	});
});
