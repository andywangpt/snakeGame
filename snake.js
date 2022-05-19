var canvas
var canvasContext
const SNAKE_THICKNESS = 20

var snake = { direction: null,
    body: [
    { x: 160, y: 280}, 
    { x: 140, y: 280}, 
    { x: 120, y: 280},
    { x: 100, y: 280},
    { x: 80, y: 280}],
    color: 'green', 
}

var applePosition = { x : 550, y : 280 }
var playerScore = 0
var gameOver = false

window.onload = () => {
    canvas = document.getElementById('gameCanvas')
    canvasContext = canvas.getContext('2d')
    document.body.addEventListener('keydown', keyDown)

    const gameInterval = setInterval(function() {
        moveSnake()
        moveApple()
        drawEverything()
        crashEvents()
        displayScore()
        if(gameOver) {
            clearInterval(gameInterval)
            alert('game over')
            resetGame()
        }
    }, 100)

}

function keyDown(e){
    e.preventDefault()

    if(e.keyCode == 38) {
        if(snake.direction == 'DOWN'){
            return
        }
        snake.direction = 'UP'
    } if(e.keyCode == 40) {
        if(snake.direction == 'UP'){
            return
        }
        snake.direction = 'DOWN'
    } if(e.keyCode == 37) {
        if(snake.direction == 'RIGHT'){
            return
        }
        snake.direction = 'LEFT'
    } if(e.keyCode == 39) {
        if(snake.direction == 'LEFT'){
            return
        }
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

}

function drawSnake() {
    for (let i = 0; i < snake.body.length; i++) {        
        colorRect(snake.body[i].x, snake.body[i].y, SNAKE_THICKNESS, SNAKE_THICKNESS, snake.color)
    }
}

function moveSnake() {
    const snakePath = snake.body.map(snake => Object.assign({}, snake))

    if(!gameOver) {
        if(snake.direction == 'RIGHT') {
            if(snake.body[0].x + SNAKE_THICKNESS >= canvas.width){
                gameOver = true
                return
            }
            snake.body[0].x = snake.body[0].x + SNAKE_THICKNESS
        }
        if(snake.direction == 'LEFT') {
            if(snake.body[0].x <= 0){
                gameOver = true
                return
            }
            snake.body[0].x = snake.body[0].x - SNAKE_THICKNESS
        }    
        if(snake.direction == 'UP') {
            if(snake.body[0].y <= 0){
                gameOver = true
                return
            }
            snake.body[0].y = snake.body[0].y - SNAKE_THICKNESS
        }    
        if(snake.direction == 'DOWN') {
            if(snake.body[0].y + SNAKE_THICKNESS >= canvas.height){
                gameOver = true
                return
            }
            snake.body[0].y = snake.body[0].y + SNAKE_THICKNESS
        }

        if(snake.direction) {
            for( var i = 1; i < snake.body.length; i++) {
                snake.body[i] = snakePath[i-1]
            }
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

            applePosition.x = Math.round(canvas.width * Math.random())            
            for(let i = 0; i < snake.body.length; i++){
                if(applePosition.x >= snake.body[i].x && applePosition.x <= snake.body[i].x + SNAKE_THICKNESS) {
                    applePosition.x = 0
                }
            }} while (applePosition.x > canvas.width - 10 || applePosition.x < 10)
            
            do {

            applePosition.y = Math.round(canvas.height * Math.random())
            for(let i = 0; i < snake.body.length; i++){
                if(applePosition.y >= snake.body[i].y && applePosition.y <= snake.body[i].y + SNAKE_THICKNESS) {
                    applePosition.y = 0
                }
            }} while (applePosition.y > canvas.height - 10 || applePosition.y < 10)

            playerScore++
            snake.length++
            addSnakeBody()
        }
    }
}

function displayScore() {
    canvasContext.fillStyle = 'white'
    canvasContext.fillText(playerScore, 350, 100)
}

function crashEvents() {
    if(snake.direction) {
        for(let i = 1; i < snake.body.length; i++) {
            if(snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
                gameOver = true
                return
            }
        }
    }   
}

function resetGame(gameInterval) {
    console.log('reset')
    snake = { direction: null,
        body: [
        { x: 160, y: 280}, 
        { x: 140, y: 280}, 
        { x: 120, y: 280},
        { x: 100, y: 280},
        { x: 80, y: 280}],
        color: 'green', 
    }
    
    applePosition = { x : 550, y : 280 }
    playerScore = 0
    gameOver = false
    location.reload()

}

function startGame() {

}

