/**
 * ShadowCookie
 * @desc Sets cookie for Clicking on Full Site Link
 *
 */

import WebCookie from "global/modules/cookie/webCookie";
const shadowCookieName = window.nexonWebApp.config.shadowCookie;

const shadowCookie = (() => {

	function init() {
		
		$('.someElement').bind('click', function (e) {
			e.preventDefault();	
			var expiry = 1 / 2880; // 30 seconds from now
			WebCookie.setCookie( shadowCookieName, 'true',expiry );			
			var $t = $(this);
			setTimeout(function () {
			  window.location = $t.attr('href');
			},200);
		});

	}

	return {
		init: init
	};

})();

export default shadowCookie;