window.nexonWebApp = window.nexonWebApp || {};


window.nexonWebApp.projectName = {

  main: 'Project Name',
  trackingEvent: 'Project Name Nick Name'

};

window.nexonWebApp.config = {
  cdn: '/',
  redirectCookie: window.nexonWebApp.projectName.main,
  shadowCookie: `${window.nexonWebApp.projectName.main}_SC`,
  twitterPage: window.nexonWebApp.projectName.main.toLowerCase(),  
};