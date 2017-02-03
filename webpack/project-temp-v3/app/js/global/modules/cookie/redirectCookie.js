/**
 * Redirect
 * @desc Sets cookie for Landing Redirect
 *
 */

window.app = window.app || {};

(function($, webCookie) {

  // // Session cookie
  // webCookie.setCookie('v-update','true');

  var days = 10 * 365;
  webCookie.setCookie('v-update','true', days);

}(jQuery, window.app.webCookie));
