var canvas
var canvasContext
const SNAKE_THICKNESS = 25

var snakeBody = [
    { x: 150, y: 285}, 
    { x: 100, y: 285}, 
    { x: 50, y: 285}
]

var snakeSpeed = 10
var snakeLength = 4

var applePosition = { x : 550, y : 300 }
var velocity = { x : 0, y : 0 }

var playerScore = 0
var gameOver = false

var turnDirection = ''

window.onload = () => {
    canvas = document.getElementById('gameCanvas')
    canvasContext = canvas.getContext('2d')
    
    document.body.addEventListener('keydown', keyDown)

    var framesPerSecond = 30
    setInterval(function() {
        drawEverything()
        moveSnake()
        moveApple()
        displayScore()
    }, 900/framesPerSecond)
}

function keyDown(e){
    e.preventDefault()

    if(e.keyCode == 38) { //if up
        velocity.y = -1
        velocity.x = 0
        turnDirection = 'UP'
    } if(e.keyCode == 40) { //if down
        velocity.y = 1
        velocity.x = 0
        turnDirection = 'DOWN'
    } if(e.keyCode == 37) { // if left
        velocity.y = 0
        velocity.x = -1
        turnDirection = 'LEFT'
    } if(e.keyCode == 39) { // if right
        velocity.y = 0
        velocity.x = 1
        turnDirection = 'RIGHT'
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, 'black') //gameboard
    
    canvasContext.fillStyle = 'red' //apple
    canvasContext.beginPath()
    canvasContext.arc(applePosition.x, applePosition.y, 12, 0, Math.PI*2, true)
    canvasContext.fill()

    colorRect(snakeBody[0].x, snakeBody[0].y, SNAKE_THICKNESS, SNAKE_THICKNESS, 'green') //snakehead
    colorRect(snakeBody[1].x, snakeBody[1].y, SNAKE_THICKNESS, SNAKE_THICKNESS, 'blue') //snake1
    colorRect(snakeBody[2].x, snakeBody[2].y, SNAKE_THICKNESS, SNAKE_THICKNESS, 'yellow') //snake2
    //console.log(snakeBody[1], snakeBody[1])

    /* for(let i=0; i < snakeLength; i++){
        colorRect(snakeBody[i].x, snakeBody[i].y, SNAKE_THICKNESS, SNAKE_THICKNESS, 'yellow') //snake2
    } */

}

function moveSnake() {

    var snakePath = Object.assign(snakeBody)

    if(turnDirection == 'RIGHT') {
        snakeBody[0].x = snakeBody[0].x + 1
    }
    if(turnDirection == 'LEFT') {
        snakeBody[0].x = snakeBody[0].x - 1
    }    
    if(turnDirection == 'UP') {
        snakeBody[0].y = snakeBody[0].y - 1
    }    
    if(turnDirection == 'DOWN') {
        snakeBody[0].y = snakeBody[0].y + 1
    }

    //snakeBody[0].x = snakeBody[0].x + velocity.x
    //snakeBody[0].y = snakeBody[0].y + velocity.y


    for( var i = 1; i < snakeLength; i++) {
        snakeBody[i] = snakePath[i-1] 
    }

    //snakeBody[1] = snakePath[0]
    //snakeBody[2] = snakePath[1]

}

function colorRect(leftX, topY, width, height, drawColor){
    //game board
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)
}

function moveApple() {
    if(snakeBody[0].x + snakeLength == applePosition.x-10) {
        if(snakeBody[0].y >= applePosition.y-25 && snakeBody[0] <= applePosition.y+25) {
            applePosition.x = Math.round(canvas.width * Math.random()) + 10
            applePosition.y = Math.round(canvas.height* Math.random()) + 10
            playerScore++
            snakeLength++
    }}
}

function displayScore() {
    canvasContext.fillStyle = 'white'
    canvasContext.fillText(playerScore, 350, 100)
}

function crashEvents() {
    
}