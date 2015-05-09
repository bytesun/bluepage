/*global define */

define([
	'marionette'	
], function (Marionette) {
	'use strict';

	return Marionette.AppRouter.extend({
		appRoutes: {
			"" : "index",
			"home" : "home",
			"login" : "login"
//            "logout" : "logout"

		}
	});
});
