document.addEventListener('DOMContentLoaded', function() {
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
    
    // Parallax effect for the background stars
    document.body.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.backgroundPosition = 
            `${x * 30}px ${y * 30}px, ${-x * 30}px ${-y * 30}px`;
    });
    
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
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
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
