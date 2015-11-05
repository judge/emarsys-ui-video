setTimeout(function() {
  walk('#m1', '80px', 1000);
});


setTimeout(function() {
  walk('#m2', '240px', 2000);
}, 2000);


setTimeout(function() {
  walk('#m3', '400px', 3000);
}, 5000);

function walk(id, where, duration) {
  $(id + ' .e-man').addClass('e-man-walk');
  $(id).css('left', where).css('transition-duration', duration + 'ms');

  setTimeout(function() {
    $('.e-textbox').hide();
    $(id + 'intro').show();
    $(id + ' .e-man').removeClass('e-man-walk');
  }, duration);
}
