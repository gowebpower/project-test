
/**
 * Util
 */

window.app = window.app || {};

window.app.Util = {

  // formats an integer with commas
  formatInteger: function(num){
    var pieces = (num+'').match(/^(\-?)([0-9]+)(.*)/),
        chars,i,c;                
    if (!pieces || !pieces[2]) {
        return num;
    }
    chars = pieces[2].split('');
    for (i=3,c=chars.length;i<c;i=i+3) {
        chars[c-i-1] += ',';
    }
    return pieces[1] + chars.join('') + (pieces[3] ? pieces[3] : '');
  },

  // get true dimensions of a jQuery Element
  trueDim: function($elm){
      var nre = /[^0-9\-.]/g
      ,d = {
          w: $elm.width()
          ,h: $elm.height()
      },add,i,c
      ;
      add = ['border-left-width','padding-left','padding-right','border-right-width'];
      for (i=0,c=add.length;i<c;++i)
          d.w += +($elm.css(add[i])||'0').replace(nre,'');
      add = ['border-top-width','padding-top','padding-bottom','border-bottom-width'];
      for (i=0,c=add.length;i<c;++i)
          d.h += +($elm.css(add[i])||'0').replace(nre,'');
      return d;
  },

  // gets viewport scroll Y position
  getViewportScrollY: function(){
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  },

  // generates a random number
  rand: function(min,max){
    return min+Math.round(Math.random()*(max-min));
  },

  // gets query parameter from a url
  getParameterByName: function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

};
