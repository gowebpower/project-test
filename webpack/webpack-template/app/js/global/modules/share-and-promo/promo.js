/**
 * Promo
 * 
 * @desc Register for Promo
 * @see config
 *
 * @example
 * promo.showModal({
 *	"title": ["Thank you for registering for","Black Heaven: First Chapter."],
 *	"copy": ["The Maple Alliance is glad to have you supporting their cause!","Don’t forget to log in to MapleStory after Black Heaven: First Chapter is live, no later than midnight on March 14th, to make sure you receive your FREE Black Heaven Ignition Gift Pack. Once you’ve done that, these gifts will be sent to you in-game approximately one (1) week after the end of the log in period.","Be ready to join the battle against Black Wings on March 11th when Black Heaven: First Chapter goes live!"],
 *	"button": {
 *	  "copy": "Close Window"
 *	 }
 * })
 *
 *
 */

/*
 Test Urls:
 - Registered for Promo
	- http://localhost:8888/index.html?registered=1

- Registration closed
	- http://localhost:8888/index.html?closed=1

- Promo Success Popup
	- http://localhost:8888/index.html?promo_success=1

- Promo Fail Popup
	- http://localhost:8888/index.html?promo_fail=1

- Promo Already Registered Popup
	- http://localhost:8888/index.html?promo_registered=1

- Promo Error Popup
	- http://localhost:8888/index.html?promo_error=1

*/

window.app = window.app || {};

window.app.Promo = (function($, Util, Modal, Event, config, nexon, window, document){

	// default options, these get extended with options in config.js
	// don' change options here, change in config.js
	var options = {
		'api': {},
		'redirectKey': '',
		'endDate': '',
		'modals': {}
	};

	if (config.promo) {
		options = $.extend(options,config.promo);
	}

	var inited = false,
		$window = $(window),
		$body = $('body'),
		$popup = {},
		$modals = $('.modals');

	var init = function() {
		if (inited) return false;	

		console.log('promo init')	
		
		$.ajax({
			type:"GET",
			contentType: "application/json; charset=utf-8",
			url: options.api.servertime,
			dataType: "jsonp",
			//jsonpCallback: 'servertimecallback',
			success:function(data){
				next(false,data);
			},
			error: function(err) {
				next(err);
			}
		});

		function next(err,data) {
			console.log('server time',err,data)
			if (!err && data && data.server_time) {

				var unixtime_server = Math.round(+new Date(data.server_time)/1000);
				var unixtime_startDate = Math.round(+new Date(options.startDate)/1000);
				var unixtime_endDate = Math.round(+new Date(options.endDate)/1000);

				console.log('unix times',unixtime_server,unixtime_startDate,unixtime_endDate)				

				if (unixtime_server >= unixtime_startDate && unixtime_server < unixtime_endDate) {
					// show register for promo button
					_initialize(true);
				} else {
					// don't show register for promo button
					_initialize(false);	
				}
			} else {
				// don't show register for promo button
				_initialize(false);	
			}					
		}

		return true;
	};

	var _initialize = function(promo_available){

		var logged_in = _isLoggedIn();
		console.log('logged in',logged_in);

		//var promo_available = _promoAvailable(Math.round(+new Date(options.endDate)/1000));
		console.log('promo_available',promo_available);

		/* BEGIN: Tests */

		// show success popup ?promo_success=1 
		if (Util.getParameterByName('promo_success')) {
			window.app.Promo.showModal(config.promo.modals.success);
		}

		// show fail popup ?promo_fail=1 
		if (Util.getParameterByName('promo_fail')) {
			window.app.Promo.showModal(config.promo.modals.fail);
		}

		// show registered popup ?promo_registered=1 
		if (Util.getParameterByName('promo_registered')) {
			window.app.Promo.showModal(config.promo.modals.registered);
		}

		// show error popup ?registered=1 
		if (Util.getParameterByName('promo_error')) {
			window.app.Promo.showModal(config.promo.modals.serverError);
		}

		// show already registered button if ?registered=1 
		if (Util.getParameterByName('registered')) {
			$('a.btn-promo').addClass('registered');
			$('a.btn-promo').html('Registered')
			//$('a.btn-promo-mobile').addClass('registered');
			//$('a.btn-promo').find('img').attr('src',config.cdn+"/img/btn_register_promo-registered.png");
		}

		// show registration closed button if ?closed=1 
		if (Util.getParameterByName('closed')) {
			$('a.btn-promo').addClass('closed');
			//$('a.btn-promo').find('img').attr('src',config.cdn+"/img/btn_register_promo-closed.png");			
			//$('a.btn-promo-mobile').addClass('closed');
		}

		/* End: Tests */
		
		// show registration closed button if past endDate
		if (!promo_available) {
			$('a.btn-promo').addClass('closed');
			$('.m-home-hero__cta-reg-button').hide();
			//$('a.btn-promo').find('img').attr('src',config.cdn+"/img/btn_register_promo-closed.png");			
			return;
		}

		// register for promo if logged in and ?<options.redirectKey>=1
		if (Util.getParameterByName(options.redirectKey)) {			
			if (logged_in) {
				registerForPromo($('a.btn-promo'));
			}			
		}

		if (logged_in) {

			(function(){
				$.ajax({
					type:"GET",
					contentType: "application/json; charset=utf-8",
					url: options.api.check,
					dataType: "jsonp",
					//jsonpCallback: 'maplestorycallback1',
					success:function(result){
						next(false,result);
					},
					error: function(err) {
						next(err);
					}
				});

				function next(err,data) {
					console.log(err,data)

					if (data && data.code) {
						// already registered
						if (data.code === 50005) {
							$('a.btn-promo').addClass('registered');
							$('a.btn-promo').html('Registered');
							//$('a.btn-promo').find('img').attr('src',config.cdn+"/img/btn_register_promo-registered.png");
							return;
						}
						// can register
						if (data.code === 50030) {
							return;
						}
					} 
				}
			})(); 
		}

		function registerForPromo($t) {
			$('#promo').css('visibility','hidden');
			_showLoader();
			$t.addClass('busy');			
			$.ajax({
				type:"GET",
				contentType: "application/json; charset=utf-8",
				url: options.api.register,
				dataType: "jsonp",
				//jsonpCallback: 'maplestorycallback0',
				success:function(result){
					next1(false,result);
				},
				error: function(err) {
					next1(err);
				}
			});

			function next1(err,data) {				
				_hideLoader();
				$t.removeClass('busy');
				console.log(err,data)

				if (data) {

					/*
					https://nexonusa.atlassian.net/wiki/pages/viewpage.action?pageId=56198569

					0 = Success
					1 = The transaction is in an uncommittable state. Rolling back transaction.
					100 = System Error
					50001 = Missing Input data
					50002 = Invalid event_no
					50003 = Invalid User Id or Email
					50004 = The user is banned.
					50005 = Already participated (Nexon User ID)
					50006 = Already participated (Partner User ID)
					50010 = System Error: Maplestory User data checking error
					50011 = This event is for new users only
					50012 = This event is for existing users only
					50013 = This event is for active users only
					50014 = This event is for inactive users only
					50016 = Invalid qualification for event (Character Creation date)
					50017 = Invalid qualification for event (Level)
					50020 = Invalid event setting
					50030 = you can participate.
					*/

					// success
					if (data.code === 0) {
						window.app.Promo.showModal(config.promo.modals.success);
						$('a.btn-promo').addClass('registered');
						$('a.btn-promo').html('Registered');
						//$('a.btn-promo').find('img').attr('src',config.cdn+"/img/btn_register_promo-registered.png");
						return;
					}
					// user is banned
					/*if (data.code === 50004) {
						App.Promo.showModal(config.promo.modals.fail);
						return;
					}*/
					// already registered
					if (data.code === 50005 || data.code === 50006) {
						window.app.Promo.showModal(config.promo.modals.registered);
						return;
					}
					// event for active users only
					//if (data.code === 50013) {
						window.app.Promo.showModal(config.promo.modals.fail);
						return;
					//}
					// fail
					//App.Promo.showModal(config.promo.modals.fail);
				} else {
					// fail
					window.app.Promo.showModal(config.promo.modals.serverError);
				}

				if (Util.getParameterByName(options.redirectKey)) {
					if (window.history.replaceState) {
						window.history.replaceState({}, 'main', window.location.pathname);
					}
				}

			}
		}

		// click on Register for promo
		$('a.btn-promo-mobile').bind('click',function(e){
			e.preventDefault();

			var $t = $(this);

			if ($t.hasClass('closed') || $t.hasClass('registered')) {
				return false;
			}

			$t.hide();

			$('#promo').css('visibility','visible');	
		});

		// click on Close Register for promo
		$('#promo').find('.promo-close').bind('click',function(e){
			e.preventDefault();

			$('a.btn-promo-mobile').show();
			$('#promo').css('visibility','hidden');
			Event.trigger('refreshView',{});
		});

		// click on Register for promo
		$('a.btn-promo').bind('click',function(e){
			e.preventDefault();			

			var $t = $(this);

			if ($t.hasClass('busy') || $t.hasClass('closed') || $t.hasClass('registered')) {
				return false;
			}
			
			var logged_in = _isLoggedIn();
			console.log('logged in',logged_in)

			if (!logged_in) {
				var returnUrl = window.location.protocol + "//" +  window.location.host + window.location.pathname + '?'+options.redirectKey+'=1';
				nexon.gnt.popupLoginAndRedirect(returnUrl,"Sign in to register");
				_setupLoginPopup();				
				return;
			}

			registerForPromo($t);			
		});

		// close modal when click on anchor with data-goto="popupHide"
		$('.modal').find('a[data-goto="popupHide"]').on('click',function(e){
			e.preventDefault();
			$el = $(this).closest('.modal');
			$el.hide();
			$('.modals').hide();
		});

		_resizeWindow();
		$window.resize(function(){
			_resizeWindow();
		});		
	};

	var _promoAvailable = function(timestamp,now){		
		var now = now ? now : Math.round(+new Date/1000)
			,secs = now - timestamp;
		//console.log('11111111',timestamp,now,secs)		
		if (secs < 0) {
			return true;
		} else {
			return false;
		}		
	};

	var _showModal = function(opts) {
		if ($('.modal-wrap').length > 0) return false;
		var myModal = Modal.widgetize(opts);
		if (opts.title && myModal.$title.length ) {
			myModal.$title.html(_joinStringArray(opts.title,'p'));
		}
		if (opts.cont && myModal.$cont.length) {
			myModal.$cont.html(_joinStringArray(opts.cont,'p'));
		}
		if (opts.button && opts.button.copy && myModal.$button.length) {
			myModal.$button.find('span').html(opts.button.copy);
		}
		myModal.$el.find('a[data-goto="modalHide"]').bind('click',function(e){
			e.preventDefault();
			myModal.$el.remove();
		});
		$modals.html(myModal.$el);
		return myModal;
	};

	var _showLoader = function() {
		var $loader = $('#loader');
		if (!$loader.length) {
			$loader = $([
				'<div id="loader">',
					'<img src="http://nxcache.nexon.net/maplestory/microsite/blackheaven/img/loading.gif" />',
				'</div>'
			].join('\n'));
			$body.append($loader);
		}
		$loader.show();
	};

	var _hideLoader = function() {
		var $loader = $('#loader');
		if ($loader.length) {
			$loader.hide();
		}
	};

	var _joinStringArray = function(opts,tag) {
		var startTag = '', endTag = '';
		if (opts instanceof Array) {
			if (typeof tag == "undefined") tag = '';
			if (tag) {
				startTag = '<'+tag+'>';
				endTag = '</'+tag+'>';
			}
			var h = "";
			$.each(opts,function(i,v){
				h+=startTag+v+endTag;
			});
			opts = h;
		}
		return opts;
	};

	var _isLoggedIn = function() {
		return nexon.sso.isLoggedIn;
	};

	var _setupLoginPopup = function() {
		//nexon.html.POPUP_LOGIN_REDIRECT = '<div class="gnt_top promo_login"><div class="gnt_title">Log in to Play</div><form id="gnt_popup_form" action="https://www.nexon.net/api/v001/account/login?returnURL={0}" method="POST"><div class="gnt_input gnt_mbm"> <a href="#" data-goto="popupForgotID" class="gnt_problems gnt_goto">?</a> <label>Email or ID</label><input type="text" name="userID"/></div><div class="gnt_input"><label>Password</label><input type="password" name="password"/> <a href="#" data-goto="popupProblems" class="gnt_problems gnt_goto">?</a> </div><input type="hidden" name="device_id"/></form><p class="gnt_error"></p><p class="gnt_mtm">Don&rsquo;t have an account? <a href="#" data-goto="signupButton" data-from="login-popup" class="gnt_goto">Click here to get started.</a> </p><p class="gnt_mts">By logging in to our online services you are agreeing to our <a href="//www.nexon.net/legal/terms-of-use/" target="_blank">Terms of Use</a> and  <a href="//www.nexon.net/legal/privacy-policy/" target="_blank">Privacy Policy.   </a> </p></div><div class="gnt_bot"> <a id="gnt_popup_submit" href="#" class="gnt_submit gnt_button"><span>Play</span></a> </div>';
		$popup = $('#gnt_popup');
		$popup.addClass('promo_login');
		$popup.find('.gnt_bot .gnt_button span').text('Sign In');
		_resizeWindow();

		// add class to body to disable scrolling
    var $b = $('body');
    $b.addClass('modalbox-active');

    // detect when popup closes
    var pollTimer = window.setInterval(function() {
      if (!$popup.hasClass('promo_login')) { 
        window.clearInterval(pollTimer);
        $b.removeClass('modalbox-active')          
      }
    }, 200);
	};

	var _resizeWindow = function() {
		var $el = $('#gnt_popup.promo_login');
		if (!$el.length) return false;
		var dims = Util.trueDim($el);
		$el.css('margin-left',-(dims.w/2)+"px");		
	};

	return {
		init: init,
		showModal: _showModal,
		showLoader: _showLoader,
		hideLoader: _hideLoader
	};

}(jQuery, window.app.Util, window.app.Modal, window.app.Event, window.app.config, nexon, window, window.document));
				
