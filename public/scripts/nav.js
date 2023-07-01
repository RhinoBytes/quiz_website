$(document).ready(function() {
  $('.navbar-toggler').click(function() {
    var navbar = $('.navbar');
    navbar.toggleClass('expanded');

    if (navbar.hasClass('expanded')) {
      navbar.css('height', 'auto');
    } else {
      navbar.css('height', '100px');
      navbar.css('overflow', 'hidden');
    }
  });
});
