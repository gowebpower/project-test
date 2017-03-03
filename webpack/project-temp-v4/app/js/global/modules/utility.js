const utility = {

  isMobile: () => {
    return navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i );
  },
  isTouch: () => {
    return utility.isMobile() !== null || document.createTouch !== undefined || ( 'ontouchstart' in window ) || ( 'onmsgesturechange' in window ) || navigator.msMaxTouchPoints;
  },
  winWidth: () => {
    return window.innerWidth ? window.innerWidth : $( window ).width();
  },
  winHeight: () => {
    return window.innerHeight ? window.innerHeight : $( window ).height();
  },
  isPortraitView: () => {
    return window.orientation == 0
  }
};

export default utility;

 









