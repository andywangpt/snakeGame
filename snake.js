var canvas
var canvasContext

var snakeX = [100]
var snakeY = [285]
var snakeSpeed = 10
var snakeLength = 4

const SNAKE_THICKNESS = 25

var applePositionX = 550
var applePositionY = 300

var playerScore = 0
var gameOver = false

let xVelocity = 0
let yVelocity = 0

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
    }, 300/framesPerSecond)
}

function keyDown(e){
    e.preventDefault()

    if(e.keyCode == 38) { //if up
        yVelocity = -1
        xVelocity = 0

    } if(e.keyCode == 40) { //if down
        yVelocity = 1
        xVelocity = 0
    } if(e.keyCode == 37) { // if left
        yVelocity = 0
        xVelocity = -1
    } if(e.keyCode == 39) { // if right
        yVelocity = 0
        xVelocity = 1
    }
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, 'black') //gameboard
    colorRect(snakeX[0], snakeY[0], SNAKE_THICKNESS, SNAKE_THICKNESS, 'green') //snake

    canvasContext.fillStyle = 'red' //apple
    canvasContext.beginPath()
    canvasContext.arc(applePositionX, applePositionY, 12, 0, Math.PI*2, true)
    canvasContext.fill()
}

function moveSnake() {
    snakeX[0] = snakeX[0]+ xVelocity
    snakeY[0] = snakeY[0] + yVelocity

    if(snakeX[0] < 0) {
        snakeX[0] = -snakeX[0]
    }

    //if crash into right wall
    if(snakeX[0] + snakeLength*SNAKE_THICKNESS >= canvas.width){
        gameOver = true
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
    }}
}

function displayScore() {
    canvasContext.fillStyle = 'white'
    canvasContext.fillText(playerScore, 350, 100)
}

function crashEvents() {
    
}