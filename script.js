document.addEventListener('DOMContentLoaded', function() {
    // Create animated stars background
    const starsContainer = document.querySelector('.stars-container');
    const starCount = 400; // Aumentado a 400 estrellas
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random star properties
        const size = Math.random() * 4; // Tamaño más variado (0-4px)
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = 0.2 + Math.random() * 0.8; // Opacidad mínima 0.2
        const duration = 3 + Math.random() * 7 + 's'; // Duración más variada
        const delay = Math.random() * 10 + 's'; // Delay más variado
        const scale = 1 + Math.random() * 0.5; // Efecto de escala aleatorio
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--opacity', opacity);
        star.style.setProperty('--duration', duration);
        star.style.setProperty('--scale', scale);
        star.style.animationDelay = delay;
        
        // Añadir ocasionalmente estrellas más brillantes
        if (Math.random() > 0.9) {
            star.style.boxShadow = `0 0 ${size * 2}px ${size / 2}px rgba(255, 255, 255, 0.3)`;
        }
        
        starsContainer.appendChild(star);
    }

    // Typing effect for the home page title
    if (document.querySelector('.hero h1')) {
        const heroTitle = document.querySelector('.hero h1');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }
    
    // Moon phase animation
    const moon = document.querySelector('.moon-phase');
    if (moon) {
        let phase = 0;
        setInterval(() => {
            phase = (phase + 0.01) % 1;
            const shadowSize = Math.abs(phase - 0.5) * 50;
            const shadowPosition = phase < 0.5 ? -25 : 25;
            
            moon.style.boxShadow = 
                `inset ${shadowPosition}px 0px 0 ${shadowSize}px var(--moon-glow)`;
        }, 100);
    }
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.member-card, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.member-card, .project-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
