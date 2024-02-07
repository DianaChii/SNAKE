const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [
    { x: 10, y: 10 },
    { x: 20, y: 10 },
    // ... начальная позиция змейки
];

let food = {
    x: 15,
    y: 15,
    // ... начальная позиция еды
};

let score = 0;

let dx = 1;
let dy = 0;

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'black';
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}



document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const keyPressed = event.code;

    if (keyPressed === "KeyA" && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (keyPressed === "KeyW" && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (keyPressed === "KeyD" && dx !== -1) {
        dx = 1;
        dy = 0;
    } else if (keyPressed === "KeyS" && dy !== -1) {
        dx = 0;
        dy = 1;
    }
}

function drawBorder() {
    ctx.fillStyle = "darkgreen";
    ctx.fillRect(0, 0, canvas.width, 10);
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
    ctx.fillRect(0, 0, 10, canvas.height);
    ctx.fillRect(canvas.width - 10, 0, 10, canvas.height);
        // Размеры ячеек сетки
    const cellWidth = 10;
    const cellHeight = 10;

    // Отображение горизонтальных линий сетки
    for (let x = 0; x < canvas.width; x += cellWidth) {
        ctx.fillRect(x, 0, 1, canvas.height);
    }

    // Отображение вертикальных линий сетки
    for (let y = 0; y < canvas.height; y += cellHeight) {
        ctx.fillRect(0, y, canvas.width, 1);
    }

    // Отрисовка границ игрового поля
    ctx.fillStyle = "darkgreen";
    ctx.fillRect(0, 0, canvas.width, 10);
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
    ctx.fillRect(0, 0, 10, canvas.height);
    ctx.fillRect(canvas.width - 10, 0, 10, canvas.height);
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Счет: " + score, 10, 30);
}

function isCollided(object1, object2) {
    return (object1.x == object2.x && object1.y == object2.y);
}


function checkCollision() {
    if (
        snake[0].x < 10 ||
        snake[0].x + 10 > canvas.width - 10 ||
        snake[0].y < 10 ||
        snake[0].y + 10 > canvas.height - 10
    ) {
        // При столкновении со стеной - конец игры
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (isCollided(snake[0], snake[i])) {
            // При столкновении с собственным хвостом - конец игры
            gameOver();
        }
    }

    if (isCollided(snake[0], food)) {
        // Если змейка достигает еды - увеличиваем счет и длину змейки
        score += 10;
        generateFoodPosition();
    }
}

function generateFoodPosition() {
    const x = Math.floor( (Math.random() * (canvas.width - 20) + 10) / 10) * 10;
    const y = Math.floor( (Math.random() * (canvas.height - 20) + 10) / 10) * 10;
    food = { x, y };
}

function draw() {
    moveSnake();
    checkCollision();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBorder();
    drawSnake();
    drawFood();
    drawScore();
}

function moveSnake() {
    const head = { x: snake[0].x + dx * 10, y: snake[0].y + dy * 10 };
    snake.unshift(head);
    if (!isCollided(snake[0], food)) {
        snake.pop();
    }
    console.log(snake.length);
}

function gameOver() {
    alert("Игра закончена! Счёт: " + score);
    // Сброс игры и начало новой
    snake = [{ x: 10, y: 10 }, { x: 20, y: 10 }];
    score = 0;
    dx = 1;
    dy = 0;
}

// Инициализация игры
generateFoodPosition();
draw();

let isGameStarted = false;

function gameStart() {
    if (!isGameStarted) {
        setInterval(draw, 80);
        isGameStarted = true;
    }
}




