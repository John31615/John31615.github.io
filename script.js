    (function() {
      const menuIcon = document.getElementById('menu-icon');
      const nav = document.querySelector('.nav');
      const navLinks = document.getElementById('nav-links');

      if (menuIcon && nav && navLinks) {
        menuIcon.addEventListener('click', () => {
          const isOpen = nav.classList.toggle('open');
          menuIcon.classList.toggle('fa-bars', !isOpen);
          menuIcon.classList.toggle('fa-xmark', isOpen);
        });

        navLinks.querySelectorAll('a').forEach((link) => {
          link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
          });
        });
      }

      const canvas = document.getElementById('network-canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let width, height;
      let particles = [];
      const particleCount = 65;
      const maxDistance = 140;

      function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }

      window.addEventListener('resize', resize);
      resize();

      class Particle {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.6;
          this.vy = (Math.random() - 0.5) * 0.6;
          this.radius = Math.random() * 2 + 1.2;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(77, 130, 243, 0.7)';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.fill();
        }
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              const opacity = (1 - dist / maxDistance) * 0.35;
              ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
              ctx.lineWidth = 0.8;
              ctx.shadowBlur = 0;
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(animate);
      }

      animate();
    })();
