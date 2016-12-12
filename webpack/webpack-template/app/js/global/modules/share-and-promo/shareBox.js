
/**
 * Share for points
 */

/* TODO:
- Points
  - check if shared facebook/twitter (needs api working, use Points.getHistory())
*/

window.app = window.app || {};

window.app.shareBox = (function($, Event, Points, config) {

  var $shareInfoBox = $('.m-modal.shareInfoBox');
  var $shareButtonsBox = $('.m-modal.shareButtonsBox');
  var sharedFacebook = false; 
  var sharedTwitter = false;

  function init() {
    console.log('shareBox init');

    // set text for main share button
    var buttonText = isPointsAvailable() ? config.points.enabledText : config.points.disabledText;
    $('.open-share-box').html('<div class="button__icon icon icon-share"></div>'+buttonText);

    // create share info popup and append to modalbox ( w/ .shareInfoBox )
    
    $shareInfoBox =  $('.m-modal.shareInfoBox');
    $shareInfoBox.find('.m-modal__container').append( buildShareInfoBox(config.points) );

  
    // create share buttons popup and append to modalbox ( w/ .shareButtonsBox )
    
    $shareButtonsBox.find('.m-modal__container').append( buildShareButtonsBox(config.points) ); 

    ////////////////////////////////////////////////////

    $shareInfoBox.find('.share-nopoints').bind('click',function(e){
      e.preventDefault();
      $shareButtonsBox.modalBox('open'); 
      // $shareInfoBox.hide();
      $shareInfoBox.modalBox('close');

    });

    $shareInfoBox.find('.share-login').bind('click',function(e){
      e.preventDefault();
      
      $shareInfoBox.modalBox('close'); 

      setTimeout(function(){
        nexon.gnt.popupLoginAndRedirect(window.location.href,"Sign in to get points for sharing!");
        Points.setupLoginPopup();
      },300 )


    });

    // $shareInfoBox.find('.close-share-box').bind('click',function(e){
    //   e.preventDefault();
    //   closeShareBox();
    // });

    /////////////////////////////////////////////////

    // $shareButtonsBox.find('.close-share-box').bind('click',function(e){
    //   e.preventDefault();
    //   closeShareBox();
    // });

    var $facebookShareButton = $shareButtonsBox.find('.share-facebook');
    var $twitterShareButton = $shareButtonsBox.find('.share-twitter');
    
    // elements with share meta
    var $facebookShareData = $('.share-data').find('.hidden-facebook');
    var $twitterShareData = $('.share-data').find('.hidden-twitter');

    // transfer attributes to share buttons
    if ($facebookShareData.attr('data-id')) $facebookShareButton.attr('data-id',$facebookShareData.attr('data-id'));
    if ($facebookShareData.attr('data-link')) $facebookShareButton.attr('data-link',$facebookShareData.attr('data-link'));
    if ($facebookShareData.attr('data-description')) $facebookShareButton.attr('data-description',$facebookShareData.attr('data-description'));
    if ($facebookShareData.attr('data-picture')) $facebookShareButton.attr('data-picture',$facebookShareData.attr('data-picture'));
    if ($facebookShareData.attr('data-source')) $facebookShareButton.attr('data-source',$facebookShareData.attr('data-source'));    

    if ($twitterShareData.attr('data-id')) $twitterShareButton.attr('data-id',$twitterShareData.attr('data-id'));
    if ($twitterShareData.attr('data-link')) $twitterShareButton.attr('data-link',$twitterShareData.attr('data-link'));
    if ($twitterShareData.attr('data-description')) $twitterShareButton.attr('data-description',$twitterShareData.attr('data-description'));
    if ($twitterShareData.attr('data-hashtags')) $twitterShareButton.attr('data-hashtags',$twitterShareData.attr('data-hashtags'));
    if ($twitterShareData.attr('data-via')) $twitterShareButton.attr('data-via',$twitterShareData.attr('data-via'));

    if (!isLoggedIn() || isLoggedIn() && !isPointsAvailable()) {
      $facebookShareButton.html('Share');
      $twitterShareButton.html('Share');
    }

    if (isLoggedIn() && isPointsAvailable()) {
      if (sharedFacebook) {
        $facebookShareButton.addClass('shared').html('Shared');
      } else {
        $facebookShareButton.html('Share for '+config.points.facebook+' points');
      }
      if (sharedTwitter) {
        $twitterShareButton.addClass('shared').html('Shared');
      } else {
        $twitterShareButton.html('Share for '+config.points.twitter+' points');
      }
    }

    // Twitter Share
    $twitterShareButton.bind('click',function(e){
      e.preventDefault();
      var $t = $(this);
      var id = $t.attr('data-id') || "";
      var link = $t.attr('data-link') || window.location.href;
      var description = $t.attr('data-description') || "";
      var via = $t.attr('data-via') || "maplestory";
      var hashtags = $t.attr('data-hashtags') || "";

      if (link) {

        sharedTwitter = true;
        $twitterShareButton.addClass('shared').html('Shared');        

        // trigger give points for share
        Event.trigger('shared:twitter',{
          id: id,
          link: link,
          description: description
        });
        
        // open share popup
        window.open('http://twitter.com/intent/tweet?hashtags='+hashtags+'&via='+via+'&text='+description+'&url=' + link + '&', 'twitterwindow', 'height=550, width=420, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
      }
    });

    // Facebook Share
    $facebookShareButton.bind('click',function(e){
      e.preventDefault();
      var $t = $(this);
      var id = $t.attr('data-id') || "";
      var link = $t.attr('data-link') || window.location.href;
      var description = $t.attr('data-description') || "";
      var picture = $t.attr('data-picture') || "";
      var source = $t.attr('data-source') || "";

      var opts = {
        method: 'feed'
      };

      if (link) opts.link = link; // required      
      if (picture) opts.picture = picture; // required
      
      if (description) opts.caption = description; // optional
      if (source) opts.source = source; // optional, for sharing videos

      if (link && picture) {

        // give facebook share points
        sharedFacebook = true;
        $facebookShareButton.addClass('shared').html('Shared');

        // trigger give points for share
        Event.trigger('shared:facebook',{
          id: id,
          link: link,
          caption: description,
          picture: picture,
          source: source
        });

        // share on facebook
        FB.ui(opts, function(response){
          if (response && !response.error_message) {
            //alert('Posting completed.');

            /*sharedFacebook = true;
            $facebookShareButton.addClass('shared').html('Shared');

            // trigger give points for share
            Event.trigger('shared:facebook',{
              id: id,
              link: link,
              caption: description,
              picture: picture,
              source: source

            });*/

            // tracking info ( only trigger this when users successfully finishes sharing w/ facebook)
            // app.trackingEventClick( this, [ 'V Update', 'FaceBook > ' + app.trackingInfo.source + ' > ' + app.trackingInfo.isLoggedIn() + ' > ' + app.trackingInfo.shortTitle + ' > shared'] );
            

          } else {
            //alert('Error while posting.');
          }
        });
      }

    });

    /////////////////////////////////////////////////

    var $openShareBoxButtons = $('.open-share-box');
    $openShareBoxButtons.bind('click',function(e){
      e.preventDefault();
      var shareTitle = isPointsAvailable() && isLoggedIn() ? config.points.enabledText : config.points.disabledText;
      $shareButtonsBox.find('.share-title h4').html(shareTitle);
      openShareBox();
    }); 

    if (isLoggedIn()) {
      Points.getHistory(function(pointHistory){
        console.log(pointHistory); // [0,1,2] these are ids for shares

        var facebookShareId = +$facebookShareButton.attr('data-id');
        var twitterShareId = +$twitterShareButton.attr('data-id');

        if (pointHistory.indexOf(facebookShareId) > -1) {
          $facebookShareButton.addClass('shared').html('Shared')
        }

        if (pointHistory.indexOf(twitterShareId) > -1) {
          $twitterShareButton.addClass('shared').html('Shared')
        }

      }); 
    } 
  }

  // shown if logged out and points are available
  function buildShareInfoBox(data) {
    var i,c;
    var html = '';

      // close button
      // html+= '<a href="#" class="close-share-box">X</a>';

      // points text
      html+= '<div class="points-text">';
        html+= '<h4>'+data.shareInfo.title+'</h4>';
        for(i=0,c=data.shareInfo.desc.length;i<c;i++) {
          html+= '<p>'+data.shareInfo.desc[i]+'</p>';
        }
      html+= '</div>';

      // other buttons
      html+= '<div class="buttons">';
        html+= '<a class="button4 button--s share-learn-more" href="/micro-site/v-update/17909/share-collect-points-and-earn-prizes">Learn More</a>';
        html+= '<a class="button4 button--s share-login" href="#">Login</a>';
      html+= '</div>';

      // bottom section
      if (!isLoggedIn() && isPointsAvailable()) {
        html+= '<div class="bot">';
          html+= '<a class="share-nopoints" href="#">Share without Collecting Points</a>';
        html+= '</div>';
      }

    return $(html);
  }
  
  function buildShareButtonsBox(data) {
    var i,c;
    var html = '';

      // close button
      // html+= '<a href="#" class="close-share-box">X</a>';


      // Title
      html+= '<div class="share-title">';
        html+= '<h4></h4>';
      html+= '</div>';
     
      // share buttons
      html+= '<div class="share-buttons">';
        
        // facebook buton
        html+= '<div class="share-row">';
          html+= '<span class="title"><i class="icon icon-facebook"></i>Facebook</span>';
          html+= '<span class="button">';
            html+= ' <a href="#" class="button4 button--s share-facebook"></a>';
          html+= '</span>';
        html+= '</div>';

        // twitter buton
        html+= '<div class="share-row">';
          html+= '<span class="title"><i class="icon icon-twitter"></i>Twitter</span>';
          html+= '<span class="button">';
            html+= ' <a href="#" class="button4 button--s share-twitter"></a>';
          html+= '</span>';
        html+= '</div>';

      html+= '</div>';

    return $(html);
  }

  function openShareBox() {
    
    // logged out and points available, show points info
    if (isPointsAvailable() && !isLoggedIn()) {
      if ( $('.m-modal.shareInfoBox').css('display') == "none" && $('.m-modal.shareButtonsBox').css('display') == "none") {
        // $shareInfoBox.show();
        $shareInfoBox.modalBox('open'); 
      } 
      return;
    } 

    // all other cases, show share buttons
    if ( $('.m-modal.shareButtonsBox').css('display') == "none") {
      // $shareButtonsBox.modalBox('open');

      $shareButtonsBox.modalBox('open'); 
    }
  }

  function closeShareBox() {
    // $shareInfoBox.hide();
    // $shareButtonsBox.hide();
  }

  function isPointsAvailable() {
    return config.points.enabled;
  }

  function isLoggedIn() {
    return nexon.sso.isLoggedIn;
  }

  return {
    init: init
  };

}(jQuery, window.app.Event, window.app.Points, window.app.config));


