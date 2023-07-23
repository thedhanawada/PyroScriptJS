(function(global) {
  function PyroScript(canvasId, config) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');
    var particles = [];
    var animationId;
    var intervalId;
    var defaultConfig = {
      particleSize: 5,
      particleSpeed: 3,
      colors: ['red', 'green', 'blue', 'yellow', 'purple', 'orange'],
      randomColors: true
    };

    // Merge user-provided config with default config
    config = Object.assign({}, defaultConfig, config);

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * config.particleSize + 1;
      this.speedX = Math.random() * (config.particleSpeed * 2) - config.particleSpeed;
      this.speedY = Math.random() * (config.particleSpeed * 2) - config.particleSpeed;
      this.color = getRandomColor();
    }

    function getRandomColor() {
      if (config.randomColors) {
        return config.colors[Math.floor(Math.random() * config.colors.length)];
      } else {
        return config.colors[0];
      }
    }

    Particle.prototype.update = function() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.1) this.size -= 0.1;
    }

    Particle.prototype.draw = function() {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();

      ctx.fill();
      ctx.stroke();
    }

    function createParticle(e) {
      var xPos = e.x || Math.random() * canvas.width;
      var yPos = e.y || Math.random() * canvas.height;
      for (var i = 0; i < 5; i++) {
        particles.push(new Particle(xPos, yPos));
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.1) {
          particles.splice(i, 1);
          i--;
        }
      }
      animationId = requestAnimationFrame(animateParticles);
    }

    this.start = function() {
      resizeCanvas(); // Ensure canvas size matches window size
      window.addEventListener('resize', resizeCanvas);
      canvas.addEventListener('mousemove', createParticle);
      animateParticles();

      // Add random fireworks every 1-3 seconds
      intervalId = setInterval(function() {
        createParticle({});
      }, (Math.random() * 2000) + 1000);
    }

    this.stop = function() {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', createParticle);
      cancelAnimationFrame(animationId);
      clearInterval(intervalId);
    }
  }

  global.PyroScript = PyroScript;
}(window));
