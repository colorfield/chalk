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

  function calculateDistanceX(elem, mouseX) {
    return Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 1);
  }

  function calculateDistanceY(elem, mouseY) {
    return Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 1);
  }

  function bouncingValue(elem, valX, valY) {
    var matrix = elem.css('transform');
    var results = matrix.split('(')[1].split(')')[0].split(',');
    var array = $({
      a: results[0],
      b: results[1],
      c: results[2],
      d: results[3],
      e: results[4],
      f: results[5],
      g: results[6],
      h: results[7],
      i: results[8],
      j: results[9],
      k: results[10],
      l: results[11],
      m: results[12],
      n: results[13],
      o: results[15],
      p: results[15],
      x: valX,
      y: valY
    });
    array.animate({
      a: 1,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 1,
      g: 0,
      h: 0,
      i: 0,
      j: 0,
      k: 1,
      l: 0,
      m: 0,
      n: 0,
      o: 0,
      p: 1,
      x: 0,
      y: 0
    }, {
      duration: 1000,
      step: function() {
        elem.css({
          'transform': 'matrix3d(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ',' + this.g + ',' + this.h + ',' + this.i + ',' + this.j + ',' + this.k + ',' + this.l + ',' + this.m + ',' + this.n + ',' + this.o + ',' + this.p + ')',
        });
        elem.find('img').css('transform', 'matrix3d(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ',' + this.g + ',' + this.h + ',' + this.i + ',' + this.j + ',' + this.k + ',' + this.l + ',' + this.m + ',' + this.n + ',' + this.o + ',' + this.p + ')');
      }
    });

    elem.on('mousemove', function(e) {
      mX = e.pageX;
      mY = e.pageY;
      distanceY = (calculateDistanceY(elem, mY) / 100) * -2;
      distanceX = (calculateDistanceX(elem, mX) / 100) * 2;
      elem.css({
        'transform': 'rotateX(' + distanceX + 'deg) rotateY(' + distanceY + 'deg)',
        'transition': 'all 0s'
      });
      array.finish();
    });
  }

  $(window).on("load", function() {
    if ($(window).outerWidth() >= 768) {

      var teaser = function(box) {
        var onMouseLeave,
        onMouseEnter,
        onMouseMove,
        mX,
        mY,
        distance,
        $teaser = $(box);

        onMouseEnter = function(e) {
          e.stopImmediatePropagation();
          $element = $(this);
        }

        onMouseMove = function(e) {
          mX = e.pageX;
          mY = e.pageY;
          distanceY = (calculateDistanceY($element, mY)/100)* -0.5;
          distanceX = (calculateDistanceX($element, mX)/100)* 0.5;
          $element.css({
            'transform': 'rotateY(0deg) rotateX(0deg)',
            'transition': 'all 0s',
            'z-index': '9999'
          });
          $element.find('img').css({
            'transform': 'scale(1.4) translate3d('+ distanceX*20 + 'px, '+ distanceY*20 + 'px, 0)',
          });
        }
        onMouseLeave = function(e) {
          e.stopImmediatePropagation();
          $element.css({
            'z-index': 'initial'
          });
          $element.find('img').css({
            'transform': 'scale(1) translate3d(0px, 0px, 0)'
          });
        }
        return {
          bindHandlers: function(e) {
            $(document).on('mouseenter', '.flexslider .slides li', onMouseEnter);
            $(document).on('mousemove', '.flexslider .slides li', onMouseMove);
            $(document).on('mouseleave', '.flexslider .slides li', onMouseLeave);
            return this;
          }
        };
      }
      t = teaser('.flexslider .slides li').bindHandlers();
    }
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
