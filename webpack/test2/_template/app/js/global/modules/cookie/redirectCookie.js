/**
 * Redirect
 * @desc Sets cookie for Landing Redirect
 *
 */

window.app = window.app || {};

(function($, webCookie, cookieName ) {

  // // Session cookie
  // webCookie.setCookie('v-update','true');

  var days = 10 * 365;
  webCookie.setCookie( cookieName ,'true', days);
  

}(jQuery, window.app.webCookie, window.app.config.redirectCookie ));
