/**
 * Countdown
 * @requires [jquery.countdown](https://github.com/hilios/jQuery.countdown)
 * @requires [Api call for server time](http://www.nexon.net/api/v001/banner/x)
 *
 * @example
 * new App.Countdown($('#countdown1'),{
 *   'countdownEnd': '2016/10/17 19:30:00'
 * });
 */

/**
 * add Hours to a js Date Object
 * @param {Date}
 * @return {Date}
 */
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

/**
 * adds 0 to a number that is less than 10
 * @param {Number} The base, default 10
 * @param {Number} The number to pad
 * @return {String}
 */
// adds 0 to a number that is less than 10 for time format (ex: 9 will be 09)
Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

window.app = window.app || {};

window.app.Countdown = (function($, Event) {

    /**
     * options for countdown timer
     */
    var options = {
        'api': {
            'servertime': 'http://www.nexon.net/api/v001/banner/x?callback=?' // this gets the current time in PST
        },
        'countdownEnd': '2016/10/17 19:30:00'
    };

    /**
     * gets the server time and then starts the countdown
     * @Constructor
     * @param {Object} jQuery Element
     * @param {Object} Options
     * @return {Undefined} Renders a Countdown timer
     */
    function Countdown(jcont, config) {
        if (!jcont.length) return false;
        if (!config) return false;
        if (!config.countdownEnd) config.countdownEnd = options.countdownEnd;

        getServerTime(function(servertime){
            startCountdown(jcont, servertime, config.countdownEnd);
        });
    }    

    /**
     * gets the server time using api call
     * only returns a callback if there is no error
     * @param {Function}  Callback function that returns server time string
     */
    function getServerTime(cb) {
        $.ajax({
            type:"GET",
            contentType: "application/json; charset=utf-8",
            url: options.api.servertime,
            dataType: "jsonp",
            success:function(data){
                next(false,data);
            },
            error: function(err) {
                next(err);
            }
        });

        function next(err,data) {
            //console.log('server time',err,data)
            if (!err && data && data.server_time) {
                cb(data.server_time)              
            }                   
        }
    }

    /**
     * Starts countdown until the countdownEnd time
     * this will always show the same time no matter what timezone the user is in
     * @param {Object} jQuery Object
     * @param {String} Server time, "10/18/2016 10:44:06"
     * @param {String} Time for countdown to end, "2016/10/17 19:30:00"
     * @return {null}
     */
    function startCountdown(jcont, servertime, timeEnd) {        

        // localtime
        var now = new Date();
        var timeDifference = parseInt(now.getTimezoneOffset()/60,10); // caluclates hours of timezone difference
        var offset = 7 - timeDifference;  // 7 for PST timezone difference from UTC

        var timeToEnd = new Date(timeEnd);
        timeToEnd = timeToEnd.addHours(offset);

        var dayformat = [
            timeToEnd.getFullYear(),
            (timeToEnd.getMonth()+1).padLeft(),
            timeToEnd.getDate().padLeft()].join('/');

        var timeformat = [
            timeToEnd.getHours().padLeft(),
            timeToEnd.getMinutes().padLeft(),
            timeToEnd.getSeconds().padLeft()].join(':');

        var endTime = dayformat + ' ' + timeformat;

        //console.log('endTime', endTime)

        jcont.countdown(endTime, function(event) {
            //$(this).html(event.strftime('%w weeks %d days %H:%M:%S'));
            var $this = $(this).html(event.strftime(''
                /*+ '<span>%w</span> weeks '*/
                + '<span>%d</span> days '
                + '<span>%H</span> hr '
                + '<span>%M</span> min '
                + '<span>%S</span> sec'));

            // countdown ended
            if (event.elapsed) {
                //$this.html(event.strftime('After end: <span>%H:%M:%S</span>'));
                $this.html('Countdown Over!');
            }
        });
    }

    return Countdown;

}(jQuery, window.app.Event));

