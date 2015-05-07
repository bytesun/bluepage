/*global define */

define(function (require) {
	'use strict';

	return {
		 login_page:require('tpl!templates/login-page.html'),
		 loggedin_page: require('tpl!templates/logged-in-page.html'),
		 header:require('tpl!templates/header.html'),
		 
	};
});

