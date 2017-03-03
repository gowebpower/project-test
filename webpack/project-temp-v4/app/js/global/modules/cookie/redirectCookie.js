/**
 * Redirect
 * @desc Sets cookie for Landing Redirect
 *
 */

import WebCookie from "global/modules/cookie/webCookie";

const redirectCookieName = window.nexonWebApp.config.redirectCookie;

const redirectCookie = (() => {
 
  // // Session cookie
  // WebCookie.setCookie(redirectCookieName,'true');
  
  var days = 10 * 365;
  WebCookie.setCookie( redirectCookieName,'true', days);

})();

export default redirectCookie;