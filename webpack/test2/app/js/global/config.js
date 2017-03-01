window.app = window.app || {};

window.app.config = {
  cdn: '/',
  redirectCookie: 'MaplestoryV',
  shadowCookie: 'MaplestoryV_SC',
  twitterPage: 'maplestory',  
  points: {
    'enabled': false,
    'facebook': 100,
    'twitter': 100,
    'enabledText': 'Share for Points',
    'disabledText': 'Share with Friends',
    'shareInfo': {
      'title': 'POWER UP FOR V BY SHARING AND EARNING PRIZES',
      'desc': [
        'Reach your maximum potential by unlocking exclusive MapleStory gift packs for free by simply sharing news and updates about V from this page!',
      
      ]
    }
  },
  promo: {
    'api': {
      'servertime': 'http://www.nexon.net/api/v001/banner/x?callback=?',
      'check': '/api/registerreward/1?eventno=43&callback=?',
      'register': '/api/registerreward/0?eventno=43&callback=?'
    },    
    'redirectKey': 'msv',
    'startDate': '10/1/2016',  // show register button starting from this date
    'endDate': '12/8/2016', // hide register button starting on this date
    'modals': {
      "success": {
        "title": ["Thank you for signing up for","the V Registration Event!"],
        "cont": ["Don't forget to log in to MapleStory after the game update on December 15, but before midnight on January 4 to make sure you receive your FREE 5th Job Power Pack. Once you've done that, these gifts will be sent to you in-game approximately one (1) week after the end of the log-in period.","Prepare to unleash your true power!"],
        "button": {
          "copy": "Close Window"
        }
      },
      "fail": {
        "title": ["Sorry!","You are not eligible for this registration event."],
        "cont": ["Only accounts that are in good standing and Level 31 or higher, are valid for registration."],
        "button": {
          "copy": "Close Window"
        }
      },
      "failPoints": {
        "title": ["Sorry!","There was a problem giving points."],
        "cont": ["Please make sure your account is eligible."],
        "button": {
          "copy": "Close Window"
        }
      },
      "registered": {
        "title": ["You have already registered for this event."],
        "cont": ["Log in to MapleStory after the game update on December 15, but before midnight on January 4, to make sure you receive your FREE 5th Job Power Pack. Once you've done that, the gift pack will be sent to you in-game approximately one (1) week after the end of the log-in period.","Prepare to unleash your true power!"],
        "button": {
          "copy": "Close Window"
        }
      },
      "serverError": {
        "title": ["Error"],
        "cont": ["There was an error connecting to the server.","Please try again later."],
        "button": {
          "copy": "Close Window"
        }
      }
    }
  },
  banners: {
    limitness: {
      link: '/micro-site/v-update/17911',
      show: true,
    },
    continent: {
      link: '/micro-site/v-update/17913',
      show: true,
    },
    lucid: {
      link: '/micro-site/v-update/17914',
      show: true,
    }
  }
};