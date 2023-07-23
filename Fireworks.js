(function(global) {
    function Fireworks(canvasId) {
      var canvas = document.getElementById(canvasId);
      var ctx = canvas.getContext('2d');
      var particles = [];
      var animationId;
      var intervalId;
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
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
        for (var i=0; i<5; i++) {
          particles.push(new Particle(xPos, yPos));
        }
      }
  
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i=0; i<particles.length; i++) {
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
        canvas.addEventListener('mousemove', createParticle);
        animateParticles();
        
        // Add random fireworks every 1-3 seconds
        intervalId = setInterval(function() {
          createParticle({});
        }, (Math.random() * 2000) + 1000);
      }
  
      this.stop = function() {
        canvas.removeEventListener('mousemove', createParticle);
        cancelAnimationFrame(animationId);
        clearInterval(intervalId);
      }
    }
  
    global.Fireworks = Fireworks;
  }(window));
  