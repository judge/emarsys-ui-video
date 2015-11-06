var TimedQueue = function(defaultDelay) {
    this.queue = [];
    this.index = 0;
    this.defaultDelay = defaultDelay || 0;
};

TimedQueue.prototype = {
    add: function(fn, delay) {
      if(!starthere) {
        delay = 0;
      }
        this.queue.push({
            fn: fn,
            delay: delay
        });
    },
    run: function(index){
        (index || index === 0) && (this.index = index);
        this.next();
    },
    next: function(){
        var self = this
        , i = this.index++
        , at = this.queue[i]
        , next = this.queue[this.index]
        if(!at) return;
        at.fn();
        next && setTimeout(function(){
            self.next();
        }, next.delay||this.defaultDelay);
    },
    reset: function(){
        this.index = 0;
    }
};

var x = new TimedQueue();
var starthere = true;

console.time('video');

x.add(function() {
  walk('#m1', '80px', 1000);
}, 0);

x.add(function() {
  speak('Én vagyok a Dávid!', 1);
}, 2000);

x.add(function() {
  standby(1);
}, 3000);

x.add(function() {
  walk('#m2', '300px', 2000);
}, 0);

x.add(function() {
  speak('Én vagyok a Judge!', 2);
}, 3000);

x.add(function() {
  standby(2);
}, 3000);

x.add(function() {
  walk('#m3', '520px', 3000);
}, 0);

x.add(function() {
  speak('Én vagyok a másik Dávid!', 3);
}, 4000);

x.add(function() {
  standby(3);
}, 3000);

x.add(function() {
  speak('Régen ilyen volt suite', 1);
  $('#screenshot1').addClass('e-canvas__slide-show');
}, 2000);

x.add(function() {
  speak('Jöttünk mi, és ilyen lett', 1);
  $('#screenshot2').addClass('e-canvas__slide-show');
}, 5000);

x.add(function() {
  standby(1);
}, 5000);

x.add(function() {
  speak('Ezeket a technológiákat használjuk', 2);
}, 2000);

x.add(function() {
  standby(2);
}, 3000);

x.add(function() {
  speak('Mi majdnem az összes csapattal kapcsolatban vagyunk', 3);
}, 10000);

x.add(function() {
  standby(3);
  console.timeEnd('video');
}, 3000);

$('#start').on('click', function() {
  $(this).hide();
  x.run();
});

function walk(id, where, duration) {
  if(!starthere) {
    duration = 1;
  }
  $(id + ' .e-man').addClass('e-man-walk');
  $(id).css('left', where).css('transition-duration', duration + 'ms');
  setTimeout(function() {
    $(id + ' .e-man').removeClass('e-man-walk');
  }, duration);
}

function speak(text, man) {
  var map = ['first', 'middle', 'last'];
  $('#m' + man + ' .e-man').removeClass('e-man-dance').addClass('e-man-speak');
  $('#textbox').show().text(text).addClass('e-textbox-' + map[man-1]);
}

function standby(man) {
  var map = ['first', 'middle', 'last'];
  $('#m' + man + ' .e-man').removeClass('e-man-speak').addClass('e-man-dance');
  $('#textbox').hide().removeClass('e-textbox-' + map[man-1]);
}
