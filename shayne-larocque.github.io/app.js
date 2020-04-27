/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
window.onload = function() {
  Particles.init({
    selector: '.background'
  });
};

particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });