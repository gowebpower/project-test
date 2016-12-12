/**
 * Redirect
 * @desc Sets cookie for Landing Redirect
 *
 */

window.app = window.app || {};

(function($, webCookie) {

  // Session cookie
  webCookie.setCookie('v-update','true');

}(jQuery, window.app.webCookie));
