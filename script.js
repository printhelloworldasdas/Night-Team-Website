// Snake Game Easter Egg
document.querySelector('.logo-icon').addEventListener('click', function() {
    const snakeContainer = document.getElementById('snake-game-container');
    snakeContainer.classList.remove('hidden');
    initSnakeGame();
});

document.getElementById('snake-close').addEventListener('click', function() {
    document.getElementById('snake-game-container').classList.add('hidden');
});

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
