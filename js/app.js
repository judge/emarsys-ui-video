var m1 = document.getElementById('m1');
var m1man = document.getElementById('m1man');
var m2 = document.getElementById('m2');
var m2man = document.getElementById('m2man');
var m3 = document.getElementById('m3');
var m3man = document.getElementById('m3man');

m1.addEventListener('transitionend', function() {
  m1man.className = 'e-man';
});

m2.addEventListener('transitionend', function() {
  m2man.className = 'e-man';
});

m3.addEventListener('transitionend', function() {
  m3man.className = 'e-man';
});

setTimeout(function() {
  m1man.className = 'e-man e-man-walk';
  m1.style.left = "80px";
  m1.style.transitionDuration = "1s";
});

setTimeout(function() {
  m2man.className = 'e-man e-man-walk';
  m2.style.left = "240px";
  m2.style.transitionDuration = "2s";
}, 2000);

setTimeout(function() {
  m3man.className = 'e-man e-man-walk';
  m3.style.left = "400px";
  m3.style.transitionDuration = "3s";
}, 5000);
