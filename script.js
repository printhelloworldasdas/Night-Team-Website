document.addEventListener('DOMContentLoaded', function() {
    // Create animated stars background
    const starsContainer = document.querySelector('.stars-container');
    const starCount = 400;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = 0.2 + Math.random() * 0.8;
        const duration = 3 + Math.random() * 7 + 's';
        const delay = Math.random() * 10 + 's';
        const scale = 1 + Math.random() * 0.5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--opacity', opacity);
        star.style.setProperty('--duration', duration);
        star.style.setProperty('--scale', scale);
        star.style.animationDelay = delay;
        
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
        const elements = document.querySelectorAll('.member-card, .project-card, .social-card');
        
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
    document.querySelectorAll('.member-card, .project-card, .social-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // ======================
    // SNAKE GAME EASTER EGG
    // ======================
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.addEventListener('click', function() {
            const snakeContainer = document.getElementById('snake-game-container');
            snakeContainer.classList.remove('hidden');
            initSnakeGame();
        });
    }

    const snakeCloseBtn = document.getElementById('snake-close');
    if (snakeCloseBtn) {
        snakeCloseBtn.addEventListener('click', function() {
            document.getElementById('snake-game-container').classList.add('hidden');
        });
    }

    function initSnakeGame() {
        const canvas = document.getElementById('snake-canvas');
        const ctx = canvas.getContext('2d');
        const startButton = document.getElementById('snake-start');
        const scoreDisplay = document.getElementById('snake-score');
        
        // Set canvas size
        canvas.width = 400;
        canvas.height = 400;
        
        // Game variables
        let snake = [{x: 200, y: 200}];
        let food = {x: 0, y: 0};
        let dx = 20;
        let dy = 0;
        let score = 0;
        let gameSpeed = 150;
        let gameInterval;
        let isGameRunning = false;
        
        // Draw functions
        function drawSnake() {
            ctx.fillStyle = '#6a0dad';
            snake.forEach(segment => {
                ctx.fillRect(segment.x, segment.y, 20, 20);
                ctx.strokeStyle = '#f5f3ce';
                ctx.strokeRect(segment.x, segment.y, 20, 20);
            });
        }
        
        function drawFood() {
            ctx.fillStyle = '#ff4757';
            ctx.beginPath();
            ctx.arc(food.x + 10, food.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
        }
        
        function generateFood() {
            const maxPos = canvas.width / 20 - 1;
            food = {
                x: Math.floor(Math.random() * maxPos) * 20,
                y: Math.floor(Math.random() * maxPos) * 20
            };
            
            // Make sure food doesn't spawn on snake
            snake.forEach(segment => {
                if (segment.x === food.x && segment.y === food.y) {
                    generateFood();
                }
            });
        }
        
        function updateScore() {
            scoreDisplay.textContent = `Score: ${score}`;
        }
        
        function gameLoop() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Move snake
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            snake.unshift(head);
            
            // Check if snake ate food
            if (head.x === food.x && head.y === food.y) {
                score++;
                updateScore();
                generateFood();
                
                // Increase speed every 5 points
                if (score % 5 === 0) {
                    gameSpeed = Math.max(50, gameSpeed - 10);
                    clearInterval(gameInterval);
                    gameInterval = setInterval(gameLoop, gameSpeed);
                }
            } else {
                snake.pop();
            }
            
            // Check collisions
            if (
                head.x < 0 || head.x >= canvas.width ||
                head.y < 0 || head.y >= canvas.height ||
                snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
            ) {
                gameOver();
                return;
            }
            
            // Draw everything
            drawFood();
            drawSnake();
        }
        
        function gameOver() {
            clearInterval(gameInterval);
            isGameRunning = false;
            alert(`Game Over! Your score: ${score}`);
            resetGame();
        }
        
        function resetGame() {
            snake = [{x: 200, y: 200}];
            dx = 20;
            dy = 0;
            score = 0;
            gameSpeed = 150;
            updateScore();
            generateFood();
        }
        
        function startGame() {
            if (!isGameRunning) {
                resetGame();
                isGameRunning = true;
                gameInterval = setInterval(gameLoop, gameSpeed);
                startButton.textContent = "Restart Game";
            } else {
                clearInterval(gameInterval);
                resetGame();
                gameInterval = setInterval(gameLoop, gameSpeed);
            }
        }
        
        // Event listeners
        startButton.addEventListener('click', startGame);
        
        document.addEventListener('keydown', function(e) {
            if (!isGameRunning) return;
            
            const key = e.key;
            const goingUp = dy === -20;
            const goingDown = dy === 20;
            const goingLeft = dx === -20;
            const goingRight = dx === 20;
            
            if (key === "ArrowUp" && !goingDown) {
                dx = 0;
                dy = -20;
            } else if (key === "ArrowDown" && !goingUp) {
                dx = 0;
                dy = 20;
            } else if (key === "ArrowLeft" && !goingRight) {
                dx = -20;
                dy = 0;
            } else if (key === "ArrowRight" && !goingLeft) {
                dx = 20;
                dy = 0;
            }
        });
        
        // Initialize food
        generateFood();
    }
});
