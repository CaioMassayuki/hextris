let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

// CONSTANTS
const CANVASHEIGHT = canvas.height
const CANVASWIDTH = canvas.width
const PIXEL = CANVASWIDTH / 10
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const Z_KEY = 90
const X_KEY = 88

const COLORS = {
  0: 'black',
  1: 'cyan',
  2: 'purple',
  3: 'orange',
  4: 'blue',
  5: 'yellow',
  6: 'green',
  7: 'red',
  8: 'cyan',
}

// PIECES
const I_STATES = {
  0: [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  1: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  2: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  3: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
}

const T_STATES = {
  0: [
    [0, 2, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  1: [
    [0, 2, 0],
    [0, 2, 2],
    [0, 2, 0],
  ],
  2: [
    [0, 0, 0],
    [2, 2, 2],
    [0, 2, 0],
  ],
  3: [
    [0, 2, 0],
    [2, 2, 0],
    [0, 2, 0],
  ]
}

const L_STATES = {
  0: [
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 3],
  ],
  1: [
    [0, 0, 0],
    [3, 3, 3],
    [3, 0, 0],
  ],
  2: [
    [3, 3, 0],
    [0, 3, 0],
    [0, 3, 0],
  ],
  3: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ]
}

const J_STATES = {
  0: [
    [0, 4, 0],
    [0, 4, 0],
    [4, 4, 0],
  ],
  1: [
    [4, 0, 0],
    [4, 4, 4],
    [0, 0, 0],
  ],
  2: [
    [0, 4, 4],
    [0, 4, 0],
    [0, 4, 0],
  ],
  3: [
    [0, 0, 0],
    [4, 4, 4],
    [0, 0, 4],
  ],
}

const O_STATES = {
  0: [
    [5, 5],
    [5, 5],
  ]
}

const S_STATES = {
  0: [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0]
  ],
  1: [
    [0, 6, 0],
    [0, 6, 6],
    [0, 0, 6]
  ],
  2: [
    [0, 0, 0],
    [0, 6, 6],
    [6, 6, 0]
  ],
  3: [
    [6, 0, 0],
    [6, 6, 0],
    [0, 6, 0]
  ],
}

const Z_STATES = {
  0: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ],
  1: [
    [0, 0, 7],
    [0, 7, 7],
    [0, 7, 0]
  ],
  2: [
    [0, 0, 0],
    [7, 7, 0],
    [0, 7, 7]
  ],
  3: [
    [0, 7, 0],
    [7, 7, 0],
    [7, 0, 0]
  ],
}

const tetromino = {
  I: I_STATES,
  T: T_STATES,
  L: L_STATES,
  J: J_STATES,
  O: O_STATES,
  S: S_STATES,
  Z: Z_STATES
}

const player = {
  position: { x: 4, y: 0 },
  piece: {
    tetromino: tetromino.T,
    rotation: 0
  },
  move: {
    left: () => player.position.x--,
    right: () => player.position.x++,
    down: () => player.position.y++
  },
  rotate: {
    l: () => rotateL(1),
    r: () => rotateR(1),
  }
}

// DRAWING
const getColorByIndex = (index) => COLORS[index]

const drawPixel = (colNumber, rowNumber, startColor, endColor = startColor) => {
  const grd = context.createLinearGradient(0, 0, CANVASWIDTH, CANVASHEIGHT)
  grd.addColorStop(0, startColor)
  grd.addColorStop(1, endColor)

  context.fillStyle = grd
  context.fillRect(colNumber * PIXEL, rowNumber * PIXEL, PIXEL, PIXEL)
}

const drawPiece = piece => {
  for (let row = 0; row < piece.length; row++) {
    for (let col = 0; col < piece[row].length; col++) {
      if (piece[row][col] != 0) {
        let pieceColorIndex = piece[row][col]
        let startColor = getColorByIndex(pieceColorIndex)
        let endColor = getColorByIndex(pieceColorIndex + 1)
        let pixelCol = col + player.position.x
        let pixelRow = row + player.position.y
        
        drawPixel(pixelCol, pixelRow, startColor, endColor)
      }
    }
  }
}

//ROTATING
const rotateR = (steps) => {
  let currentTetromino = player.piece.tetromino
  let currentRotation = player.piece.rotation
  let maxRotation = Object.values(currentTetromino).length - 1
  let safeRotateAmount = currentRotation < maxRotation ? steps : -currentRotation
  return player.piece.rotation += safeRotateAmount
}

const rotateL = (steps) => {
  let currentTetromino = player.piece.tetromino
  let currentRotation = player.piece.rotation
  let maxRotation = Object.values(currentTetromino).length - 1
  let minRotation = 0
  let safeRotateAmount = currentRotation > minRotation ? -steps : maxRotation
  return player.piece.rotation += safeRotateAmount
}

// MOVING
const validateEventKey = (event, key) => {
  const { keyCode, which } = event
  return keyCode === key || which === key
}

const getKeysPressedState = (event) => {
  return {
    left: validateEventKey(event, LEFT_ARROW),
    right: validateEventKey(event, RIGHT_ARROW),
    down: validateEventKey(event, DOWN_ARROW),
    rotateL: validateEventKey(event, Z_KEY),
    rotateR: validateEventKey(event, X_KEY) 
  }
}

const getDirectionPressed = (event) => {
  let keysPressed = getKeysPressedState(event)
  let keys = Object.keys(keysPressed)
  let directionsPressed = keys.filter((key) => keysPressed[key] === true && key)
  return directionsPressed[0]
}

const keyPressed = event => {
  let direction = getDirectionPressed(event)

  console.log(direction)
  switch(direction){
    case 'left': player.move.left()
    break;
    case 'right': player.move.right()
    break;
    case 'down': player.move.down()
    break;
    case 'rotateL': player.rotate.l()
    break;
    case 'rotateR': player.rotate.r()
    break;
  }
  // else if (validateEventKey(event, Z_KEY)) {
  //   rotateAction(ROTATE_LEFT)
  // } else if (validateEventKey(event, X_KEY)) {
  //   rotateAction(ROTATE_RIGHT)
  // }
}

document.addEventListener('keydown', event => {
  keyPressed(event)
})

// UPDATING
let lastime = 0
const update = (time = 0) => {
  const deltaTime = time - lastime
  lastime = time
  // dropCounter += deltaTime
  context.clearRect(0,0,CANVASWIDTH, CANVASHEIGHT)
  //drawPiece(tetromino.I[0])
  drawPiece(player.piece.tetromino[player.piece.rotation])
  requestAnimationFrame(update)
}

update()