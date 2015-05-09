/*global define */

define(function (require) {
	'use strict';

	return {
		 login_page:      require('tpl!templates/login-page.html'),
		 header:          require('tpl!templates/header.html'),
		 home:            require('tpl!templates/home.html')
	};
});

