(function ($) {
  Drupal.behaviors.navigation = {
    attach: function (context) {
      // @todo check accessibility
      var $navToggleBtn = $('.site-navigation-button'),
          $menuContainer = $('.site-header');

      // Toggle search form
      $navToggleBtn.bind('click', function() {
        $menuContainer.toggleClass("js-mobile-nav");
        return false;
      });

      if (document.querySelector('.page-navigation')){
        var stickyNav = document.querySelector('.page-navigation');
        var stickyHeader = document.querySelector('.main-header');

        function scrollToAnchor(aid){
          var aTag = $("a[name='"+ aid +"']");
          $('html,body').animate({scrollTop: aTag.parents().offset().top - 100},'slow');
        }

        var sections = $('.content-section')
        , nav = $('.page-navigation')
        , navLink = nav.find('a').attr('href')
        , navHash = navLink.substr(0,navLink.indexOf('#'))
        , nav_height = nav.outerHeight();

        $(window).on('load, scroll', function () {
          var cur_pos = $(this).scrollTop();
          sections.each(function() {
            var top = $(this).offset().top - nav_height - 100,
            bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
              nav.find('a').removeClass('active');
              sections.removeClass('active');

              $(this).addClass('active');
              var marker = $(this).children('.marker').attr('name');
              nav.find('a[href="'+ navHash +'#'+ marker +'"]').addClass('active');
            }
          });
        });

        $('.page-navigation li a').on('click', function (e) {
          e.preventDefault();
          $('.page-navigation li a').removeClass('active');
          $(this).toggleClass('active');
          var link = $(this).attr('href');
          var hash = link.substring(link.indexOf('#')+1);
          scrollToAnchor(hash);
        });

        if (stickyNav.style.position !== 'page-navigation') {
          var stickyTop = stickyNav.offsetTop;

          var isSticky = function() {
            window.scrollY >= stickyTop ?
              stickyNav.classList.add('fixed'):
              stickyNav.classList.remove('fixed');
            window.scrollY >= stickyTop ?
              stickyHeader.classList.add('fixed'):
              stickyHeader.classList.remove('fixed');
          }
          document.addEventListener('scroll', function () {
            isSticky();
          });
          window.addEventListener('load', function () {
            isSticky();
          });
        }
      }
    }
  };
})(jQuery);
