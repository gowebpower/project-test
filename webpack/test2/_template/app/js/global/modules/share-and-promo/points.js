/**
 * Points
 */

window.app = window.app || {};

window.app.Points = (function($, config, Event, Util, Promo, Coins) {

    var points;
    var $points;
    var $pointsText;    

    function init() {

        console.log('points init')

        points = 0;
        $points = $('.points');
        $pointsText = $points.find('span');

        if (!isLoggedIn()) {
            return setupLoggedOut();
        }

        setupLoggedIn();        

        Event.on('shared:facebook', function(opts){
            givePoints('facebook', opts)
        });

        Event.on('shared:twitter', function(opts){
            givePoints('twitter', opts)
        });
    }

    /* Setup LoggedIn/LoggedOut */

    function setupLoggedOut() {

        var $loginButton = $('.show-my-points');
        $loginButton.css({'visibility': 'visible'});

        $loginButton.bind('click',function(e){
            e.preventDefault();
            nexon.gnt.popupLoginAndRedirect(window.location.href,"Sign in to get points for sharing!");
            setupLoginPopup();
        })
        // $points.html($loginButton);
    }

    function setupLoggedIn() {
        //setPoints(getPoints());

        $('body').addClass('logged-in');

        fetchPoints();
    }    

    /* Points */

    function getHistory(cb) {
        fetchPoints(function(history){
            if (typeof cb != "undefined" && cb instanceof Function) {
                cb(history);
            }
        });
    }

    function givePoints(type, opts) {
        console.log('givePoints', type, opts);

        // delay showing points result for Twitter since
        // we can't track if they actually shared
        var delay = 15000;
        //if (type == "twitter") delay = 15000;

        if (isLoggedIn()) {
            //alert('give points for '+type+' share')

            var eventNo = opts.id;
            //eventNo = 13; // testing

            $.ajax({ 
                type:"GET", 
                contentType: "application/json; charset=utf-8", 
                url: "/api/registerreward/0?eventno="+eventNo+"&callback=?", 
                dataType: "jsonp",  
                success:function(result){
                    console.log('givePoints Result', result);
                    // trigger result with delay
                    setTimeout(function(){
                        givePointsResult(result);
                    },delay)
                }
            });
        } else {
            //alert('You are not logged in, so you won\'t earn points!')
        }
    }

    function givePointsResult(data) {
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

        // you can participate
        if (data.code === 50030) {
            return;
        }

        // already got points
        if (data.code === 50005) {
            return;
        }

        // success
        if (data.code === 0) {
            fetchPoints();
            return;
        }

        // fail
        Promo.showModal(config.promo.modals.failPoints);
    }

    // you will probably have to calculate the total points from the api call response
    function fetchPoints(cb) {
        console.log('FETCH POINTS')

        $.ajax({ 
            type:"GET", 
            contentType: "application/json; charset=utf-8", 
            url: "/api/registerreward/getsharedpoints?callback=?", 
            dataType: "jsonp", 
            success:function(result){
                console.log('fetchPoints result', result)
                if (result && result instanceof Array) {
                    setPoints(calculatePoints(result));
                    if (typeof cb != "undefined" && cb instanceof Function) {
                        cb(result);
                    }
                }
            }
        });
    }

    function calculatePoints(pointsArray) {
        var i, c;
        var pts = 0;
        for(i=0,c=pointsArray.length;i<c;i++) {
            var eventno = pointsArray[i];
            if (eventno % 2) {
                // twitter
                console.log('twitter', eventno)
                pts+= config.points.twitter
            } else {
                // facebook
                console.log('facebook', eventno)
                pts+= config.points.facebook                
            }
        }
        return pts;
    }

    function getPoints() {
        return points;     
    }

    function setPoints(pts, showLeaf) {
        console.log('setPoints', pts)
        $pointsText.html(Util.formatInteger(pts) + ' Points');

        if (showLeaf) Coins.launch([800, 600],10) // x,y coord to launch from, number of guys to launch

        // render animated maple leafs
        if (showLeaf) Event.trigger('animatePoints',{ $cont: $points, 'points': pts });        
    }       

    /* Login Popup */

    function setupLoginPopup() {
        //nexon.html.POPUP_LOGIN_REDIRECT = '<div class="gnt_top promo_login"><div class="gnt_title">Log in to Play</div><form id="gnt_popup_form" action="https://www.nexon.net/api/v001/account/login?returnURL={0}" method="POST"><div class="gnt_input gnt_mbm"> <a href="#" data-goto="popupForgotID" class="gnt_problems gnt_goto">?</a> <label>Email or ID</label><input type="text" name="userID"/></div><div class="gnt_input"><label>Password</label><input type="password" name="password"/> <a href="#" data-goto="popupProblems" class="gnt_problems gnt_goto">?</a> </div><input type="hidden" name="device_id"/></form><p class="gnt_error"></p><p class="gnt_mtm">Don&rsquo;t have an account? <a href="#" data-goto="signupButton" data-from="login-popup" class="gnt_goto">Click here to get started.</a> </p><p class="gnt_mts">By logging in to our online services you are agreeing to our <a href="//www.nexon.net/legal/terms-of-use/" target="_blank">Terms of Use</a> and  <a href="//www.nexon.net/legal/privacy-policy/" target="_blank">Privacy Policy.   </a> </p></div><div class="gnt_bot"> <a id="gnt_popup_submit" href="#" class="gnt_submit gnt_button"><span>Play</span></a> </div>';
        var $popup = $('#gnt_popup');
        $popup.addClass('promo_login');
        $popup.find('.gnt_bot .gnt_button span').text('Sign In');
        resizeWindow();

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
    }

    function resizeWindow() {
        var $el = $('#gnt_popup.promo_login');
        if (!$el.length) return false;
        var dims = Util.trueDim($el);
        $el.css('margin-left',-(dims.w/2)+"px");        
    }

    /* Utils */

    function isLoggedIn() {
        return nexon.sso.isLoggedIn;
    }

    return {
        init: init,
        get: getPoints,
        set: setPoints,
        getHistory: getHistory,
        setupLoginPopup: setupLoginPopup
    };

}(jQuery, window.app.config, window.app.Event, window.app.Util, window.app.Promo, window.app.Coins));




