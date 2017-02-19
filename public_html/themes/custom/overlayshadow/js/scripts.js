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
      $('.block-footer-links-block').footerReveal();
    }
  };
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
