// @todo set scope bottom of the page

/*
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
    // Using once() to apply the myCustomBehaviour effect when you want to do just run one function.
    $(context).find('input.myCustomBehavior').once('myCustomBehavior').addClass('processed');

    // Using once() with more complexity.
    $(context).find('input.myCustom').once('mySecondBehavior').each(function () {
      if ($(this).visible()) {
          $(this).css('background', 'green');
      }
      else {
        $(this).css('background', 'yellow').show();
      }
    });
  }
};

(function ($) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
     $(context).find('input.myCustomBehavior').once('myCustomBehavior').each(function () {
      // Apply the myCustomBehaviour effect to the elements only once.
    });
    }
  };
})(jQuery);

(function($, Drupal, drupalSettings) {
  Drupal.behaviors.yourbehavior = {
    attach: function (context, settings) {
      // some normall jquery stuff in here
    }
  };
})(jQuery, Drupal, drupalSettings);
*/

(function ($) {
  Drupal.behaviors.theme = {
    attach: function (context, settings) {
    }
  };

  var elements = $('.artists-list ul li, .events-list ul li');
  var columns = elements.detectGridColumns();
  elements.responsiveEqualHeightGrid();

  $('.site-logo').animateSprite({
    fps: 25,
    animations: {
      communication: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
    },
    loop: false
  });


})(jQuery);

(function () {

  'use strict';

  // Typekit call
  try {
    Typekit.load();
  }
  catch(e) {
  }

})();
