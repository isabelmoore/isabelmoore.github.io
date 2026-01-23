/* Butterfly Cursor Effect */
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const butterflyCount = 10;
    const butterflies = [];

    // Create butterflies
    for (let i = 0; i < butterflyCount; i++) {
        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');
        homeSection.appendChild(butterfly);
        butterflies.push({
            element: butterfly,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            targetX: Math.random() * window.innerWidth,
            targetY: Math.random() * window.innerHeight,
            scared: false
        });
    }

    // Butterfly CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .butterfly {
            position: absolute;
            width: 10px;
            height: 10px;
            background: var(--first-color); /* Use theme color */
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.6;
            transition: opacity 0.3s;
            z-index: 10;
        }
        .butterfly::before, .butterfly::after {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            background: inherit;
            border-radius: 50%;
            top: -5px;
        }
        .butterfly::before { left: -6px; }
        .butterfly::after { right: -6px; }
    `;
    document.head.appendChild(style);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Check distance to butterflies
        butterflies.forEach(b => {
            const dx = b.x - mouseX;
            const dy = b.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) { // Scared range
                b.scared = true;
                const angle = Math.atan2(dy, dx);
                b.vx = Math.cos(angle) * 5; // Move away fast
                b.vy = Math.sin(angle) * 5;
            }
        });
    });

    // Animation Loop
    function animate() {
        butterflies.forEach(b => {
            // Friction
            if (b.scared) {
                b.vx *= 0.95;
                b.vy *= 0.95;
                if (Math.abs(b.vx) < 0.1 && Math.abs(b.vy) < 0.1) b.scared = false;
            } else {
                // Natural movement (random wandering)
                b.vx += (Math.random() - 0.5) * 0.2;
                b.vy += (Math.random() - 0.5) * 0.2;
                // Limit speed
                const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
                if (speed > 2) {
                    b.vx = (b.vx / speed) * 2;
                    b.vy = (b.vy / speed) * 2;
                }
            }

            b.x += b.vx;
            b.y += b.vy;

            // Keep within bounds (simple bounce)
            if (b.x < 0) { b.x = 0; b.vx *= -1; }
            if (b.x > window.innerWidth) { b.x = window.innerWidth; b.vx *= -1; }
            if (b.y < 0) { b.y = 0; b.vy *= -1; }
            // Assuming home section height ~100vh or part of it. 
            // Better to stay within section bounds if possible
            const homeRect = homeSection.getBoundingClientRect();
            if (b.y > homeRect.height) { b.y = homeRect.height; b.vy *= -1; }


            b.element.style.transform = `translate(${b.x}px, ${b.y}px)`;
        });
        requestAnimationFrame(animate);
    }
    animate();
});
