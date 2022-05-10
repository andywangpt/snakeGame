var canvas
var canvasContext
const SNAKE_THICKNESS = 25

var snakeX = [150, 100, 50]
var snakeY = [285, 285, 285]
var snakeSpeed = 10
var snakeLength = 4

var applePositionX = 550
var applePositionY = 300

var playerScore = 0
var gameOver = false

let xVelocity = 0
let yVelocity = 0

var turnAtX = 0
var turnAtY = 0

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
        yVelocity = -1
        xVelocity = 0
        turnDirection = 'up'
        turnAtX = snakeX[0]
        turnAtY = snakeY[0]
    } if(e.keyCode == 40) { //if down
        yVelocity = 1
        xVelocity = 0
        turnDirection = 'down'
        turnAtX = snakeX[0]
        turnAtY = snakeY[0]
    } if(e.keyCode == 37) { // if left
        yVelocity = 0
        xVelocity = -1
        turnDirection = 'left'
        turnAtX = snakeX[0]
        turnAtY = snakeY[0]
    } if(e.keyCode == 39) { // if right
        yVelocity = 0
        xVelocity = 1
        turnDirection = 'right'
        turnAtX = snakeX[0]
        turnAtY = snakeY[0]
    }
    console.log(turnDirection, turnAtX, turnAtY)
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, 'black') //gameboard
    colorRect(snakeX[0], snakeY[0], SNAKE_THICKNESS, SNAKE_THICKNESS, 'green') //snakehead
    colorRect(snakeX[1], snakeY[1], SNAKE_THICKNESS, SNAKE_THICKNESS, 'green') //snake1
    colorRect(snakeX[2], snakeY[2], SNAKE_THICKNESS, SNAKE_THICKNESS, 'green') //snake2
    //console.log(snakeX[1], snakeY[1])

    canvasContext.fillStyle = 'red' //apple
    canvasContext.beginPath()
    canvasContext.arc(applePositionX, applePositionY, 12, 0, Math.PI*2, true)
    canvasContext.fill()
}

function moveSnake() {

    //snakeX[0] = snakeX[0]+ xVelocity
    //snakeY[0] = snakeY[0] + yVelocity
    
    for(i=0; i < snakeLength; i++) {
        snakeX[i] = snakeX[i] + xVelocity
        snakeY[i] = snakeY[i] + yVelocity

        if(snakeX[i] == turnAtX && snakeY[i] == turnAtY) {
            if(turnDirection == 'up') {
                snakeX[i] = snakeX[i] + xVelocity
                snakeY[i] = snakeY[i] + yVelocity
                console.log(turnDirection)
            }
        }
    }
}

function colorRect(leftX, topY, width, height, drawColor){
    //game board
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)
}

function moveApple() {
    if(snakeX[0] + snakeLength == applePositionX-10) {
        if(snakeY[0] >= applePositionY-25 && snakeY[0] <= applePositionY+25) {
            applePositionX = Math.round(canvas.width * Math.random()) + 10
            applePositionY = Math.round(canvas.height* Math.random()) + 10
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