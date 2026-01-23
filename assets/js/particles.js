/* Colorful Particle Field Effect */
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0'; // Behind text
    canvas.style.pointerEvents = 'none';
    homeSection.style.position = 'relative'; // Ensure container needs it
    homeSection.insertBefore(canvas, homeSection.firstChild);

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = homeSection.offsetWidth;
        height = canvas.height = homeSection.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particle Configuration
    const particleCount = 100;
    const particles = [];
    // Colorful palette (Peach, Blue, Red, Yellow variants)
    const colors = ['#FF9A8B', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA'];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.size = Math.random() * 3 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.originalX = this.x;
            this.originalY = this.y;
            this.friction = 0.9;
            this.springFactor = 0.01;
        }

        update(mouseX, mouseY) {
            // Repel from mouse
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;

            const maxDistance = 150;
            const force = (maxDistance - distance) / maxDistance;

            if (distance < maxDistance) {
                const repelForce = force * 5; // Strength
                this.vx += forceDirectionX * repelForce;
                this.vy += forceDirectionY * repelForce;
            }

            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Simple boundary bounce / wrap
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Friction to slow down high speeds
            this.vx *= 0.98;
            this.vy *= 0.98;

            // Keep moving slightly naturally
            if (Math.abs(this.vx) < 0.2) this.vx += (Math.random() - 0.5) * 0.1;
            if (Math.abs(this.vy) < 0.2) this.vy += (Math.random() - 0.5) * 0.1;

            // Draw
            this.draw();
        }

        draw() {
            ctx.beginPath();
            // Draw as a small dash/line based on velocity to look like "movement"
            // Or just a capsule
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Init Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Mouse Tracking
    let mouseX = -1000;
    let mouseY = -1000;

    // Track mouse relative to canvas/viewport (accounting for scroll if needed, but here simple clientXY is mostly fine for fullscreen-ish sections, 
    // but better to be relative to canvas)
    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => p.update(mouseX, mouseY));
        requestAnimationFrame(animate);
    }
    animate();
});
