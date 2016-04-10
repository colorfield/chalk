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

  window.onYouTubeIframeAPIReady = function(){
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'd_z3IsRmXVc',
      playerVars: { 'autoplay': 1, 'loop': 1, 'controls': 0, 'showinfo': 0, 'rel': 0, 'playlist': 'd_z3IsRmXVc', 'iv_load_policy': 0 },
      events: {
        'onReady': onPlayerReady
      }
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.setVolume(0);
  }

})(jQuery);0
