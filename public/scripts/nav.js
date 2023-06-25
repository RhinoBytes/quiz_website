$(document).ready(function() {
  $('.navbar-toggler').click(function() {
    var navbar = $('.navbar');
    navbar.toggleClass('expanded');

    if (navbar.hasClass('expanded')) {
      navbar.css('height', 'auto');
    } else {
      navbar.css('height', '80px');
      navbar.css('overflow', 'hidden');
    }
  });
});
