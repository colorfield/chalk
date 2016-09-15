/**
* @file
* Attaches behaviors for the Tilt Display module.
*/

(function ($, Backbone, Drupal, document) {

  'use strict';

  Drupal.behaviors.tilt_display = {
    attach: function (context) {
      // @todo impl
    }
  };

  /**
  * @namespace
  */
  Drupal.tilt_display = Drupal.tilt_display || {

    /**
    * @namespace Drupal.tilt_display.models
    */
    models: {},

    /**
    * @namespace Drupal.tilt_display.views
    */
    views: {}
  };

})(jQuery, Backbone, Drupal, document);

  (function ($){

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    var videoName = 'd_z3IsRmXVc';
    var w = $(window).width(),
    h = $(window).height();

    window.onYouTubeIframeAPIReady = function(){
      player = new YT.Player('player', {
        videoId: videoName,
        playerVars: {'suggestedQuality': 'hd1080', 'autoplay': 1, 'loop': 1, 'controls': 0, 'showinfo': 0, 'rel': 0, 'playlist': 'd_z3IsRmXVc', 'iv_load_policy': 0 },
        events: {
          'onReady': onPlayerReady
        }
      });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.setVolume(0);
      setInterval(getPlayerState, 500);
    }

    function loopVideo() {
      player.seekTo(0);
      var done = false;
    }

    /**
    * The 'getPlayerState' function returns the status of the player.
    * @return {string} The current player's state -- e.g. 'playing', 'paused', etc.
    */
    var done = false;
    function getPlayerState() {
        var playerState = player.getPlayerState();
        if (playerState == YT.PlayerState.PLAYING && !done) {
          done = true;
          setInterval(loopVideo, 52000);
        }
    }

    $(window).on('load resize', function(){
      vidRescale();
    });

    function vidRescale(){
      if (w/h > 16/9){
        player.setSize(w, w/16*9);
      } else {
        player.setSize(h/9*16, h);
      }
    }

})(jQuery);0
