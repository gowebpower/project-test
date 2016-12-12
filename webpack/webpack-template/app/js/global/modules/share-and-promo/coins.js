/**
 * Flying Coin Animation
 *
 * @example 
 * App.Coins.launch([800,600],3)
 */

window.app = window.app || {};
window.app.Coins = (function($, Util){
    
    var Coins = {
        config: {
            key: 'coins'
            ,fx_interval: 13
            ,defaults: {
                anim: {
                    img_src: 'img/loading.gif'
                    ,img_width: [74,94]
                    ,spin_rate: [0,0]
                    ,speed_x: [-200,100]
                    ,speed_y: [-100,-200]
                    ,launch_speed: 1
                    ,gravity: 800
                    ,bounciness: 0.6 // between 0 and 1
                    ,timeout: 8000
                    ,fadeout_duration: 1000
                }
            }
        },
        _anims: {},
        _anim_key: 0,
        _interval: null,

        launch: function(coords,num,opts){
            var z = this
            ,jcont = $('<div>').addClass(z.config.key).css({
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                // #clickthru
                'pointer-events': 'none',
                background: 'none'
            })
            ,cm = $.extend({},z.config.defaults.anim,opts,{
                $: {}
            })
            ,coin,frag,i;

            if (!z._w) {
                z._w = $(window);
                z._d = $(document);
            }

            // #clickthru
            jcont.bind('click',function(e){
                console.log('clicked');
                jcont.css('display','none');
                var jc = document.elementFromPoint(e.clientX,e.clientY);
                if (jc.nodeType == 3) {
                    jc = jc.parentNode;
                }
                $(jc).trigger('click');
                jcont.css('display','');
            });

            cm.key = z._anim_key++;
            z._anims[cm.key] = cm;
            cm.$.cont = jcont;
            cm.lifetime = 0;
            cm.coins = [];

            cm.speed_y[0] *= cm.launch_speed;
            cm.speed_y[1] *= cm.launch_speed;

            frag = document.createDocumentFragment();
            for (i=0;i<num;++i) {
                coin = {
                    $: {}
                };
                coin.initials = {
                    coords: coords,
                    width: z._arand(cm.img_width),
                    speed: [z._arand(cm.speed_x), z._arand(cm.speed_y)]
                };
                coin.$.cont = $('<div>').css({
                    position: 'absolute',
                    left: coin.initials.coords[0]+'px',
                    top: coin.initials.coords[1]+'px'
                });
                coin.$.img = $('<img>').css({
                    position: 'relative',
                    width: coin.initials.width+'px',
                    height: coin.initials.width+'px', //because im doing it this way, img must be square
                    top: '-'+coin.initials.width+'px'
                }).attr('src',cm.img_src);
                coin.$.cont[0].appendChild(coin.$.img[0]);

                coin.spin = {
                    rate: z._arand(cm.spin_rate),
                    width: coin.initials.width,
                    left: 0
                };

                coin.velocity = {
                    x: coin.initials.coords[0],
                    y: coin.initials.coords[1],
                    speed: coin.initials.speed
                };

                // flip image depending on direction
                if (coin.initials.speed[0] > 0) {
                    coin.$.img.css({
                        '-moz-transform': 'scaleX(-1)',
                        '-o-transform': 'scaleX(-1)',
                        '-webkit-transform': 'scaleX(-1)',
                        'transform': 'scaleX(-1)',
                        'filter': 'FlipH',
                        '-ms-filter': 'FlipH'
                    });
                }

                cm.coins.push(coin);
                frag.appendChild(coin.$.cont[0]);
            }
            cm.$.cont[0].appendChild(frag);
            $('body').append(cm.$.cont);

            z._startInterval();
        },

        _startInterval: function(){
            var z = this;
            if (z._interval === null) {
                z._interval = true;
                z._applyPhysics();
            }
        },

        _applyPhysics: function(cm){
            var z = this,
                floor = Util.getViewportScrollY() + z._w.height();

            $.each(z._anims,function(k,cm){

                if (cm.lifetime >= cm.timeout) {
                    z._remove(cm);
                }
                cm.lifetime += z.config.fx_interval;

                cm.$.cont.css('height',z._d.height()+'px');

                $.each(cm.coins,function(i,coin){
                    var width_delta = (coin.spin.rate/100),
                        new_width,new_left,new_x,new_y;

                    if (coin.spin.direction == 'out') {
                        new_width = coin.spin.width + width_delta;
                        if (new_width > coin.initials.width) {
                            new_width = coin.initials.width;
                            coin.spin.direction = 'in';
                        }
                    } else {
                        new_width = coin.spin.width - width_delta;
                        // for larger coins make this number a percentage
                        if (new_width < 4) {
                            new_width = 4;
                            coin.spin.direction = 'out';
                        }
                    }
                    new_left = (coin.initials.width-new_width)/2;
                    coin.spin.width = new_width;
                    coin.$.img.css({
                        width: new_width+'px',
                        left: new_left+'px'
                    });

                    new_x = coin.velocity.x + (coin.velocity.speed[0]/100);
                    new_y = coin.velocity.y + (coin.velocity.speed[1]/100);
                    coin.velocity.speed[1] += (cm.gravity/100);
                    if (new_y >= floor) {
                        new_y = floor;
                        coin.velocity.speed[1] = -1 * cm.bounciness * coin.velocity.speed[1];
                    }

                    coin.velocity.x = new_x;
                    coin.velocity.y = new_y;
                    coin.$.cont.css({
                        left: new_x+'px',
                        top: new_y+'px'
                    });
                });
            
            });
            
            z._interval = null;
            $.each(z._anims,function(){
                z._interval = setTimeout(function(){
                    z._applyPhysics();
                },z.config.fx_interval);
                return false;
            });

        },

        _remove: function(cm){
            var z = this;
            cm.$.cont.animate({
                opacity: 0
            },{
                duration: cm.fadeout_duration,
                complete: function(){
                    cm.$.cont.remove();
                    delete z._anims[cm.key];
                }
            });
        },

        _arand: function(arr){
            return Util.rand(arr[0],arr[1]);
        }
    }

    return Coins;

}(jQuery, window.app.Util));

