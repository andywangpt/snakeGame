var canvas
var canvasContext
const SNAKE_THICKNESS = 20

var snake = { direction: null,
    body: [
    { x: 150, y: 280}, 
    { x: 130, y: 280}, 
    { x: 110, y: 280},
    { x: 90, y: 280},
    /*{ x: 80, y: 280}, 
    { x: 70, y: 280}, 
    { x: 60, y: 280},
    { x: 50, y: 280},
    { x: 40, y: 280}, 
    { x: 30, y: 280},
    { x: 20, y: 280}*/],
    speed: 1, 
}

var applePosition = { x : 550, y : 300 }

var playerScore = 0
var gameOver = false

window.onload = () => {
    canvas = document.getElementById('gameCanvas')
    canvasContext = canvas.getContext('2d')
    document.body.addEventListener('keydown', keyDown)

    var framesPerSecond = 30
    setInterval(function() {
        drawEverything()
        moveApple()
        displayScore()
        crashEvents()
    }, 3000/framesPerSecond)
}

function keyDown(e){
    e.preventDefault()

    if(e.keyCode == 38) {
        snake.direction = 'UP'
    } if(e.keyCode == 40) {
        snake.direction = 'DOWN'
    } if(e.keyCode == 37) {
        snake.direction = 'LEFT'
    } if(e.keyCode == 39) {
        snake.direction = 'RIGHT'
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, 'black')

    canvasContext.fillStyle = 'red'
    canvasContext.beginPath()
    canvasContext.arc(applePosition.x, applePosition.y, 10, 0, Math.PI*2, true)
    canvasContext.fill()
    
    drawSnake()
    moveSnake()
}

function drawSnake() {
    for (let i = 0; i < snake.body.length; i++) {        
        colorRect(snake.body[i].x, snake.body[i].y, SNAKE_THICKNESS, SNAKE_THICKNESS, 'green')
    }
}

function moveSnake() {
    const snakePath = snake.body.map(snake => Object.assign({}, snake))

    if(snake.direction == 'RIGHT') {
        snake.body[0].x = snake.body[0].x + SNAKE_THICKNESS
    }
    if(snake.direction == 'LEFT') {
        snake.body[0].x = snake.body[0].x - SNAKE_THICKNESS
    }    
    if(snake.direction == 'UP') {
        snake.body[0].y = snake.body[0].y - SNAKE_THICKNESS
    }    
    if(snake.direction == 'DOWN') {
        snake.body[0].y = snake.body[0].y + SNAKE_THICKNESS
    }

    if(snake.direction) {
        for( var i = 1; i < snake.body.length; i++) {
            snake.body[i] = snakePath[i-1]
        }
    }
}

function addSnakeBody() {
    snake.body.push({x: 800, y: 600})
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)
}

function moveApple() {             
    if(snake.body[0].x + SNAKE_THICKNESS/2  >= applePosition.x - SNAKE_THICKNESS && snake.body[0].x <= applePosition.x + SNAKE_THICKNESS/2) {
        if(snake.body[0].y + SNAKE_THICKNESS/2 >= applePosition.y - SNAKE_THICKNESS && snake.body[0].y <= applePosition.y + SNAKE_THICKNESS/2) {
            do {
            applePosition.x = Math.round(canvas.width * Math.random()) + 10
            applePosition.y = Math.round(canvas.height * Math.random()) + 10
            } while (applePosition.x + SNAKE_THICKNESS > canvas.width && applePosition.y + SNAKE_THICKNESS > canvas.height)

            playerScore++
            snake.length++
            addSnakeBody()
    }}
}

function displayScore() {
    canvasContext.fillStyle = 'white'
    canvasContext.fillText(playerScore, 350, 100)
}

function crashEvents() {
    if(snake.direction) {


    for(let i = 1; i < snake.body.length; i++) {
        if(snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
            console.log('YOU HIT YOURSELF')
        }
        /*if(snake.body[0].x + SNAKE_THICKNESS == snake.body[i].x && snake.body[i].y +SNAKE_THICKNESS == snake.body[i].y){
            alert('Yout hit yourself')
        }*/
    }
}   
    if(snake.body[0].x < 0 || snake.body[0].x + SNAKE_THICKNESS >= 800) {
        console.log('game over')
    }
    if(snake.body[0].y < 0 || snake.body[0].y + SNAKE_THICKNESS >= 600) {
        console.log('game over')
    }
}

function resetGame() {

}