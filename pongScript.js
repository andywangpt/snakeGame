var canvas
var canvasContext

var ballX = 500
var ballY = 500

var ballSpeedX = 10
var ballSpeedY = 10

var drawColor = ''

var paddle1Y = 250
var paddle2Y = 250

const PADDLE_THICKNESS = 10
const PADDLE_HEIGHT = 100

var leftX, topY, width, height = ''

var playerOneScore = 0
var playerTwoScore = 0
const WINNING_SCORE = 3

var showingWinScreen = false

function calculateMousePosition(e) {
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement
    var mouseX = e.clientX - rect.left - root.scrollLeft
    var mouseY = e.clientY - rect.top - root.scrollTop
    return {
        x: mouseX,
        y: mouseY
    }
}

function handleMouseClick(e) {
    if(showingWinScreen) {
        playerOneScore = 0
        playerTwoScore = 0
        showingWinScreen = false
    }
}

window.onload = () => {
    canvas = document.getElementById('gameCanvas')
    canvasContext = canvas.getContext('2d')
    
    var framesPerSecond = 30
    setInterval(function() {
      callBoth()
    }, 900/framesPerSecond)

    canvas.addEventListener('mousedown', handleMouseClick)

    canvas.addEventListener('mousemove',
        function(e) {
            var mousePosition = calculateMousePosition(e)
            paddle1Y = mousePosition.y - (PADDLE_HEIGHT/2)
    })
}

function colorRect(leftX, topY, width, height, drawColor){
    //game board
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(leftX, topY, width, height)
 }

function drawEverything() {
    if(showingWinScreen) {
        if(playerOneScore >= WINNING_SCORE) {
            canvasContext.fillText('left player won!', 350, 200)
        } else if(playerTwoScore >= WINNING_SCORE) {
            canvasContext.fillText('right player won!', 350, 200)
        }

        canvasContext.fillText('click to continue', 350, 500)
        return
    }
    colorRect(0, 0, canvas.width, canvas.height, 'black')
    drawNet()

    //paddle1
    colorRect(10, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')

    //paddle2
    colorRect(canvas.width-PADDLE_THICKNESS-10, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')

    //apple
    canvasContext.fillStyle = 'white'
    canvasContext.beginPath()
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true)
    canvasContext.fill()

    canvasContext.fillText(playerOneScore, 350, 100)
    canvasContext.fillText(playerTwoScore, 400, 100)
}

function callBoth() {
    moveEverything()
    drawEverything()
}


function ballReset() {
    if(playerOneScore >= WINNING_SCORE || playerTwoScore >= WINNING_SCORE) {   
        showingWinScreen = true
    }
    ballX = canvas.width/2
    ballY = canvas.height/2
    ballSpeedX = -ballSpeedX
}

function computerMovement() {
    var paddle2YCenter = (PADDLE_HEIGHT/2) + paddle2Y

    if(paddle2YCenter < ballY-35) {
        paddle2Y += 8
    }
    else if(paddle2YCenter < ballY+35) {
        paddle2Y -= 8
    }
}

function moveEverything() {
    if(showingWinScreen) {
        return
    }

    computerMovement()

    ballX = ballX + ballSpeedX
    ballY = ballY + ballSpeedY

    if(ballX < 25) {
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX

            var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * .35

        } else {
            playerTwoScore++
            ballReset()
            
        }
    }

    if(ballX > canvas.width-25) {
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX
            var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * .35
        } else {
            playerOneScore++
            ballReset()
            
        }
    }

    if(ballX > canvas.width){
        ballSpeedX = -ballSpeedX
    }
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY
    }
    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY
    }
}

function drawNet() {
    for(var i=0; i < canvas.height; i += 40) {
        colorRect(canvas.width/2-1, i, 2, 20, 'white')
    }
}