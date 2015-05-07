/**
 * @desc        configure aliases and dependencies
 */

if (typeof DEBUG === 'undefined') DEBUG = true;

require.config({
	paths: {
        'jquery'                : 'assets/lib/jquery.min',
        'underscore'            : 'assets/lib/underscore-min',         
        'backbone'              : 'assets/lib/backbone.min',
        'marionette'            : 'assets/lib/backbone.marionette.min',
        'syphon'                : 'assets/lib/backbone.syphon.min',
        'backbone.wreqr'        : 'assets/lib/backbone.wreqr.min',
        'backbone.babysitter'   : 'assets/lib/backbone.babysitter',
        'bootstrap'             : 'assets/lib/bootstrap.min',
        'text'                  : 'assets/lib/text',
        'tpl'                   : 'assets/lib/tpl',
        'parsley'               : 'assets/lib/parsley'
	},

	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},

		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		},
		syphon: {
			exports: 'Backbone.Syphon',
			deps: ['backbone']
		},
//		wreqr : {
//			exports: 'Backbone.Wreqr',
//			deps: ['backbone', 'marionette', 'underscore']
//			
//		},
        bootstrap: {
            deps: ['jquery']
        }

	},
    waitSeconds: 60
});


require(['main']);           // Initialize the application with the main application file.