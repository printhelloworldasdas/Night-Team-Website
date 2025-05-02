document.addEventListener('DOMContentLoaded', function() {
    // Create animated stars background
    const createStars = () => {
        const starsContainer = document.querySelector('.stars-container');
        const starCount = 400;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Configuración de propiedades
            const size = Math.random() * 4;
            const starProps = {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.8,
                duration: `${3 + Math.random() * 7}s`,
                delay: `${Math.random() * 10}s`,
                scale: 1 + Math.random() * 0.5
            };
            
            // Aplicar estilos
            Object.assign(star.style, {
                width: starProps.width,
                height: starProps.height,
                left: starProps.left,
                top: starProps.top,
                animationDelay: starProps.delay
            });
            
            star.style.setProperty('--opacity', starProps.opacity);
            star.style.setProperty('--duration', starProps.duration);
            star.style.setProperty('--scale', starProps.scale);
            
            if (Math.random() > 0.9) {
                star.style.boxShadow = `0 0 ${size * 2}px ${size / 2}px rgba(255, 255, 255, 0.3)`;
            }
            
            starsContainer.appendChild(star);
        }
    };

    // Typing effect with improved performance
    const initTypingEffect = () => {
        const heroTitle = document.querySelector('.hero h1');
        if (!heroTitle) return;

        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeCharacter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                requestAnimationFrame(typeCharacter);
            }
        };
        
        requestAnimationFrame(typeCharacter);
    };

    // Smoother moon animation using requestAnimationFrame
    const animateMoon = () => {
        const moon = document.querySelector('.moon-phase');
        if (!moon) return;

        let phase = 0;
        const updateMoon = () => {
            phase = (phase + 0.005) % 1;  // Reduced increment for smoother animation
            const shadowSize = Math.abs(phase - 0.5) * 50;
            const shadowPosition = phase < 0.5 ? -25 : 25;
            
            moon.style.boxShadow = 
                `inset ${shadowPosition}px 0px 0 ${shadowSize}px var(--moon-glow)`;
            
            requestAnimationFrame(updateMoon);
        };
        
        updateMoon();
    };

    // Scroll animation with Intersection Observer
    const initScrollAnimations = () => {
        const elements = document.querySelectorAll('.member-card, .project-card, .social-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    };

    // Initialize all effects
    const init = () => {
        createStars();
        initTypingEffect();
        animateMoon();
        initScrollAnimations();
    };

    // Start initialization
    init();
});
