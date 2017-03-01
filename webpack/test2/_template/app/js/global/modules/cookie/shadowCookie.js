/**
 * ShadowCookie
 * @desc Sets cookie for Clicking on Full Site Link
 *
 */

window.app = window.app || {};

window.app.shadowCookie = (function($, webCookie, config) {

	function init() {
		
		$('a.header__link-to-main').bind('click', function (e) {
			e.preventDefault();	
			var expiry = 1 / 2880; // 30 seconds from now
			webCookie.setCookie(config.shadowCookie, 'true',expiry);			
			var $t = $(this);
			setTimeout(function () {
			  window.location = $t.attr('href');
			},200);
		});

	}

	return {
		init: init
	};

}(jQuery, window.app.webCookie, window.app.config));

