var canvas
var canvasContext
const SNAKE_THICKNESS = 25

var snake = { direction: null,
    body: [
    { x: 150, y: 285}, 
    { x: 125, y: 285}, 
    { x: 100, y: 285},
    { x: 75, y: 285}],
    speed: 1, 
}

var color = ['green', 'blue', 'red', 'white']
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
    }, 10000/framesPerSecond)
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
    canvasContext.arc(applePosition.x, applePosition.y, 12, 0, Math.PI*2, true)
    canvasContext.fill()
    
    drawSnake()
    moveSnake()
}

function drawSnake() {
    for (let i = 0; i < snake.body.length; i++) {        
        colorRect(snake.body[i].x, snake.body[i].y, SNAKE_THICKNESS, SNAKE_THICKNESS, color[i])
    }
}

function moveSnake() {
    

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
    
    const snakePath = Object.assign({}, snake)

    if(snake.direction) {
        for( var i = 1; i < snake.body.length; i++) {
            snake.body[i] = snakePath.body[i-1]
            drawSnake()
        }
        console.log(snake.body[2], snakePath.body[1])
    }
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)
}

function moveApple() {
    if(snake.body[0].x == applePosition.x+SNAKE_THICKNESS) {
        console.log(applePosition.y, snake.body[0].y)
        if(snake.body[0].y >= applePosition.y-SNAKE_THICKNESS && snake.body[0].y <= applePosition.y+SNAKE_THICKNESS) {
            applePosition.x = Math.round(canvas.width * Math.random()) + 10
            applePosition.y = Math.round(canvas.height* Math.random()) + 10
            playerScore++
            snake.length++
    }}
}

function displayScore() {
    canvasContext.fillStyle = 'white'
    canvasContext.fillText(playerScore, 350, 100)
}

function crashEvents() {

    if(snake.body[0].x < 0 || snake.body[0].x >= 800 - SNAKE_THICKNESS) {
        console.log('game over')
    }
    if(snake.body[0].y < 0 || snake.body[0].y >= 600) {
        console.log('game over')
    }
}

//const snakeCopy = snake.body.map(snakePart => Object.assign({}, snakePart))