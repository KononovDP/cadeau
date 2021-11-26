$(document).ready(function() {

  // Sticky header when scroll
  $(window).on('load scroll', function() {
    if ($(window).scrollTop() >= 10) {
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }
  });

  // Show/hide menu on mobile
  $('.burger').on('click', function() {
    $(this).toggleClass('active');
    $('.header__nav__wrapper').slideToggle(300);
  });

  // Button circle animation
  $('.button').on('click', function(e){
    const circle = $(this).find('.button__circle');
    const parentOffset = $(this).offset(); 
    const relX = e.pageX - parentOffset.left;
    const relY = e.pageY - parentOffset.top;

    circle.css({
      'opacity': '1',
      'left': relX + 'px',
      'top': relY + 'px',
      'width': '400px',
      'height': '400px',
    })
    
    setTimeout(function() {
      circle.css({
        'opacity': '0'
      })

      setTimeout(function() {
        circle.css({
          'width': '0',
          'height': '0'
        })
      }, 100)
    }, 400)
  });

  setTimeout(function() {
    $('.card__section').removeClass('hidden');
    $('.loader').addClass('hidden');
  },3000);

  // Filter
  (function() {
    const headerHeight = $('.header').height();
    const filterOffset = $('.filter__section').offset().top;
    const targetOffset = filterOffset - headerHeight;
    const filterHeight = $('.filter__section').height();

    $(window).on('load scroll', function(){
      if ($(window).scrollTop() > targetOffset) { 
        $('.filter__section').css({
          'position': 'fixed',
          'top': headerHeight + 'px'
        });
        $('.card__section').css({'margin-top': filterHeight + 'px'})
      } else {
        $('.filter__section').css({
          'position': 'static',
          'top': 'auto'
        });
        $('.card__section').css({'margin-top': 0})
      }
    });
  })()

  $('#datepicker').daterangepicker({
    locale: {
      format: 'dd DD MMM'
    }
  });
});