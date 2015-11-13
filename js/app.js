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
  speak('Sziasztok! Dávid vagyok!', 1);
}, 2000);

x.add(function() {
  standby(1);
}, 3000);

x.add(function() {
  walk('#m2', '300px', 2000);
}, 0);

x.add(function() {
  speak('Sziasztok, én meg Judge!', 2);
}, 3000);

x.add(function() {
  standby(2);
}, 3000);

x.add(function() {
  walk('#m3', '520px', 3000);
}, 0);

x.add(function() {
  speak('Sziasztok, én is Dávid vagyok! :)', 3);
}, 4000);

x.add(function() {
  standby(3);
}, 3000);

x.add(function() {
  speak('Régen ilyenek voltak az oldalak...', 1);
  $('#screenshot1').addClass('e-canvas__slide-show');
}, 2000);

x.add(function() {
  speak('...jöttünk mi, és minden sokkal szebb lett! A mi felelősségünk, hogy az összes új dolog ugyanilyen szép legyen.', 1);
  $('#screenshot2').addClass('e-canvas__slide-show');
}, 5000);

x.add(function() {
  standby(1);
  $('#screenshot1').removeClass('e-canvas__slide-show');
  $('#screenshot2').removeClass('e-canvas__slide-show');
}, 5000);

x.add(function() {
  speak('Ezeket az eszközöket és technológiákat használjuk! HTML, CSS, Javascript, Gulp, Jade, SASS...', 2);
  $('#technologies').addClass('e-canvas__slide-show');
}, 2000);

x.add(function() {
  standby(2);
}, 5000);

x.add(function() {
  $('#technologies').removeClass('e-canvas__slide-show');
  speak('Mi majdnem az összes csapattal kapcsolatban vagyunk, mert szinte mindennek van felhasználói felülete.', 3);
  $('#bubbles').addClass('e-canvas__slide-show');
  setTimeout(function() {
    $('#m4').addClass('active');
  }, 8500);
}, 5000);

x.add(function() {
  standby(3);
}, 6000);

x.add(function() {
  $('#bubbles').removeClass('e-canvas__slide-show');
}, 5000);

x.add(function() {
  standby(4);
  speak('Hello Siju! Let\'s dance!', 2);
}, 1000);

x.add(function() {
  standby(2);
  $('#m1, #m2, #m3, #m4').addClass('e-dance-hardcore');
}, 3000);

x.add(function() {
  $('#end').addClass('active');
}, 13000);

$('#start').on('change', function() {
  var music = new Audio('../tetris.mp3');
  music.play();

  setTimeout(function() {
    $('.intro').fadeOut(800, function() {
      x.run();
      $('#maintitle').fadeIn();
    });
  }, 1000);
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
