(function () {
  var luxFrames = [
    '/images/mascot/lux-coding-1.png',
    '/images/mascot/lux-coding-2.png',
    '/images/mascot/lux-coding-3.png',
    '/images/mascot/lux-coding-4.png',
  ];

  // Preload all frames
  luxFrames.forEach(function (src) {
    var img = new Image();
    img.src = src;
  });

  var luxImg = document.getElementById('lux-mascot');
  var currentFrame = 0;
  var scrollPerFrame = 150;

  window.addEventListener('scroll', function () {
    var frameIndex = Math.floor(window.scrollY / scrollPerFrame) % luxFrames.length;
    if (frameIndex !== currentFrame) {
      currentFrame = frameIndex;
      luxImg.src = luxFrames[currentFrame];
    }
  });
})();
