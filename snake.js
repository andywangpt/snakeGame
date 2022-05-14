var canvas
var canvasContext
const SNAKE_THICKNESS = 20

var snake = { direction: null,
    body: [
    { x: 150, y: 280}, 
    { x: 130, y: 280}, 
    { x: 110, y: 280},
    { x: 90, y: 280},
    { x: 80, y: 280}, 
    { x: 70, y: 280}, 
    { x: 60, y: 280},
    { x: 50, y: 280},
    { x: 40, y: 280}, 
    { x: 30, y: 280},
    { x: 20, y: 280}],
    speed: 1, 
}

var applePosition = { x : 550, y : 280 }
var playerScore = 0
var gameOver = false

window.onload = () => {
    canvas = document.getElementById('gameCanvas')
    canvasContext = canvas.getContext('2d')
    document.body.addEventListener('keydown', keyDown)

    var framesPerSecond = 30
    const gameInterval = setInterval(function() {
        moveSnake()
        moveApple()
        crashEvents()
        drawEverything()
        displayScore()
        if(gameOver) {
            clearInterval(gameInterval)
        }
    }, 3000/framesPerSecond)
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
            applePosition.x = Math.round(canvas.width * Math.random()) - 20
            } while (applePosition.x + SNAKE_THICKNESS > canvas.width && applePosition.x < 0)
            do {
            applePosition.y = Math.round(canvas.height * Math.random()) - 20
            } while (applePosition.y + SNAKE_THICKNESS > canvas.width && applePosition.y < 0)

            /*
            for(let i = 0; i < snake.body.length; i++) {
                if(applePosition.x == snake.body[i].x && applePosition.y == snake.body[i].y) {

                }
            } */

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
                if(gameOver){
                    //alert('HIT')
                    //resetGame()
                    return
                }
            }
        }
    }   

    if(snake.body[0].x < 0 || snake.body[0].x + SNAKE_THICKNESS >= 800) {
        gameOver = true
        //alert('game over')
        return resetGame()
    }
    if(snake.body[0].y < 0 || snake.body[0].y + SNAKE_THICKNESS >= 600) {
        gameOver = true
        //alert('game over')
        return
    }
}

function resetGame() {
    alert('GAME OVER')
    clearInterval(gameInterval)
    
    gameOver = false
}

        /*if(snake.body[0].x + SNAKE_THICKNESS == snake.body[i].x && snake.body[i].y +SNAKE_THICKNESS == snake.body[i].y){
            alert('Yout hit yourself')
        }*/