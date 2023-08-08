let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let arena = []

// CONSTANTS

const CANVASHEIGHT = canvas.height
const CANVASWIDTH = canvas.width
const ARENA_X_LENGTH = 10
const ARENA_Y_LENGTH = ARENA_X_LENGTH * 2
const PIXEL = CANVASWIDTH / ARENA_X_LENGTH
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const Z_KEY = 90
const X_KEY = 88

const COLORS = {
  0: 'black',
  1: 'cyan',
  2: 'blue',
  3: 'purple',
  4: 'red',
  5: 'orange',
  6: 'yellow',
  7: 'green',
  8: 'cyan',
}

// PIECES

// Array representation of every possible tetromino
// in every possible rotation
const I_STATES = {
  0: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  1: [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  2: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  3: [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
  ]
}

const T_STATES = {
  0: [
    [0, 3, 0],
    [3, 3, 3],
    [0, 0, 0],
  ],
  1: [
    [0, 3, 0],
    [0, 3, 3],
    [0, 3, 0],
  ],
  2: [
    [0, 0, 0],
    [3, 3, 3],
    [0, 3, 0],
  ],
  3: [
    [0, 3, 0],
    [3, 3, 0],
    [0, 3, 0],
  ]
}

const L_STATES = {
  0: [
    [0, 0, 5],
    [5, 5, 5],
    [0, 0, 0],
  ],
  1: [
    [0, 5, 0],
    [0, 5, 0],
    [0, 5, 5],
  ],
  2: [
    [0, 0, 0],
    [5, 5, 5],
    [5, 0, 0],
  ],
  3: [
    [5, 5, 0],
    [0, 5, 0],
    [0, 5, 0],
  ]
}

const J_STATES = {
  0: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  1: [
    [0, 2, 2],
    [0, 2, 0],
    [0, 2, 0],
  ],
  2: [
    [0, 0, 0],
    [2, 2, 2],
    [0, 0, 2],
  ],
  3: [
    [0, 2, 0],
    [0, 2, 0],
    [2, 2, 0],
  ],
}

const O_STATES = {
  0: [
    [0, 6, 6],
    [0, 6, 6],
    [0, 0, 0]
  ],
  1: [
    [0, 0, 0],
    [0, 6, 6],
    [0, 6, 6]
  ],
  2: [
    [0, 0, 0],
    [6, 6, 0],
    [6, 6, 0],
  ],
  3: [
    [6, 6, 0],
    [6, 6, 0],
    [0, 0, 0]
  ]
}

const S_STATES = {
  0: [
    [0, 7, 7],
    [7, 7, 0],
    [0, 0, 0]
  ],
  1: [
    [0, 7, 0],
    [0, 7, 7],
    [0, 0, 7]
  ],
  2: [
    [0, 0, 0],
    [0, 7, 7],
    [7, 7, 0]
  ],
  3: [
    [7, 0, 0],
    [7, 7, 0],
    [0, 7, 0]
  ],
}

const Z_STATES = {
  0: [
    [4, 4, 0],
    [0, 4, 4],
    [0, 0, 0]
  ],
  1: [
    [0, 0, 4],
    [0, 4, 4],
    [0, 4, 0]
  ],
  2: [
    [0, 0, 0],
    [4, 4, 0],
    [0, 4, 4]
  ],
  3: [
    [0, 4, 0],
    [4, 4, 0],
    [4, 0, 0]
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

// https://tetris.wiki/Super_Rotation_System
// Offset used to calculate every possible position when performing a piece rotation
// (Used to apply "kick" logic)
// O eixo y fica invertido pois, nessa lógica, um y positivo representa uma posição abaixo
const JLSTZ_KICK_OFFSET_DATA = {
  0: [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}],
  1: [{x: 0, y: 0},{x: 1, y: 0},{x: 1, y: 1},{x: 0, y: -2},{x: 1, y: -2}],
  2: [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}],
  3: [{x: 0, y: 0},{x: -1, y: 0},{x: -1, y: 1},{x: 0, y: -2},{x: -1, y: -2}]
}

const I_KICK_OFFSET_DATA = {
  0: [{x: 0, y: 0},{x: -1, y: 0},{x: 2, y: 0},{x: -1, y: 0},{x: 2, y: 0}],
  1: [{x: -1, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: -1},{x: 0, y: 2}],
  2: [{x: -1, y: -1},{x: 1, y: -1},{x: -2, y: -1},{x: 1, y: 0},{x: -2, y: 0}],
  3: [{x: 0, y: -1},{x: 0, y: -1},{x: 0, y: -1},{x: 0, y: 1},{x: 0, y: -2}]
}

const O_KICK_OFFSET_DATA = {
  0: [{x: 0, y: 0}],
  1: [{x: 0, y: 1}],
  2: [{x: -1, y: 1}],
  3: [{x: -1, y: 0}]
}

// Returns an array[height][width] filled with 0s
const createEmptyArena = (width, height) => 
{ const matrix = [] 
  while (height--) { 
    matrix.push(new Array(width).fill(0)) 
  } 
  return matrix 
}

// Returns a new piece object
const createPiece = (posX, posY, tetromino, rotation = 0, kickOffsetData = JLSTZ_KICK_OFFSET_DATA) => {
  return ({
    position: { x: posX, y: posY },
    tetromino: tetromino,
    rotation: rotation,
    kickOffset: kickOffsetData
  })
}

// Creates and returns the specified piece (by letter) in a default position
const createPlayerPiece = tetrominoLetter => {
  let piece;
  switch(tetrominoLetter){
    case 'I': piece = createPiece(2, -2, tetromino.I, 0, I_KICK_OFFSET_DATA)
    break;
    case 'O': piece = createPiece(3, 0, tetromino.O, 0, O_KICK_OFFSET_DATA)
    break;
    default: piece = createPiece(4, 0, tetromino[tetrominoLetter], 0, JLSTZ_KICK_OFFSET_DATA)
  }
  return piece
}

// Returns a new pixelData object
const createPixelData = (posX, posY, colorIndex) => {
  return ({
    x: posX, y: posY, color: colorIndex
  })
}

// Array com dados das posições dos pixels na arena
// que não são parte da peça do player e nem tem o valor 0.
// É usado para popular a arena e para 
// checar colisão com os pixels do player
let pixelData = []

// Player object
const player = {
  piece: createPlayerPiece('Z'),
  move: {
    left: () => movePiece(player.piece, -1, 0),
    right: () => movePiece(player.piece, 1, 0),
    down: () => movePiece(player.piece, 0, 1),
  },
  rotate: {
    l: () => rotateL(player.piece),
    r: () => rotateR(player.piece),
  }
}

// POSITION

// Uses the X and Y positions of the Piece to return the absolute coordinates of
// all of its pixels in the arena, ignoring pixels with color 0
const translatePiecePosition = piece => {
  let pieceX = piece.position.x
  let pieceY = piece.position.y
  let tetromino = piece.tetromino[piece.rotation]

  let pixelCoordinates = []

  for(let row = 0; row < tetromino.length; row++) {
    for (let col = 0; col < tetromino[row].length; col++) {
      if(tetromino[row][col] != 0) {
        pixelCoordinates.push(
          createPixelData(
            pieceX + col,
            pieceY + row,
            tetromino[row][col]
          )
        )
      }
    }
  }
  return pixelCoordinates
}

// DRAWING

// Given an index (from 0 to 7), returns a color string (e.g. 'red')
const getColorByIndex = (index) => COLORS[index]

// Draws a "pixel" (a square) in the canvas of dimensions PIXEL x PIXEL
const drawPixel = (colNumber, rowNumber, startColor, endColor = startColor) => {
  const grd = context.createLinearGradient(0, 0, CANVASWIDTH, CANVASHEIGHT)
  grd.addColorStop(0, startColor)
  grd.addColorStop(0.5, startColor)
  grd.addColorStop(1, endColor)

  context.fillStyle = grd
  context.fillRect(colNumber * PIXEL, rowNumber * PIXEL, PIXEL, PIXEL)
}

// Transposes the pixelData[] information into number values in the arena
const insertPixelDataIntoArena = () => {
  for(i = 0; i < pixelData.length; i++){
    let pixelRow = pixelData[i].y
    let pixelCol = pixelData[i].x
    if(pixelRow < arena.length && pixelCol < arena[pixelRow].length){
      arena[pixelRow][pixelCol] = pixelData[i].color
    }
  }
}

// Transposes the pixels of a piece into number values in the arena
const insertPieceIntoArena = (piece) => {
  let absolutePosition = translatePiecePosition(piece)

  for(let i = 0; i < absolutePosition.length; i++){
    let pixelRow = absolutePosition[i].y
    let pixelCol = absolutePosition[i].x
    if(pixelRow < arena.length && pixelCol < arena[pixelRow].length){
      arena[pixelRow][pixelCol] = absolutePosition[i].color
    }
  }
}

// Set all of the arena values to 0
const clearArenaData = (arena) => {
  for (let row = 0; row < arena.length; row++) {
    for (let col = 0; col < arena[row].length; col++) {
      arena[row][col] = 0
    }
  }
}

// Translates the arena values into "pixels" (squares) on the canvas
// Ignores cells with the value 0
const drawArenaData = () => {
  for (let row = 0; row < arena.length; row++) {
    for (let col = 0; col < arena[row].length; col++) {
      
      if(arena[row][col] != 0){
        let startColor = getColorByIndex(arena[row][col])
        let endColor = getColorByIndex(arena[row][col] + 1)
        drawPixel(col, row, startColor, endColor)
      }
    }
  }
}

// Prints a representation of the Arena in the Console
const printArenaData = () => {
  let arenaData = '\n\n\n\n\n\n'
  for (let row = 0; row < arena.length; row++) {
    arenaData += (arena[row].toString()+'\n')
  }
  console.group()
  console.log(arenaData, '\n\n\n\n\n\n\n')
  console.groupEnd()
}

// COLLISION

// Checks if a col|row combination is outside of the arena boundary
const checkArenaBoundaryCollision = (col, row) => {
  let yCollision = row < 0 || row > arena.length - 1
  let xCollision = col < 0 || col > arena[0].length - 1
  return yCollision || xCollision
}

// Checks if a col|row combination is already occupied by comparing it with the data in PixelData[]
const checkPixelDataCollision = (col, row) => {
  containsPixelData = pixelData.filter(pixel => pixel.x === col && pixel.y === row && pixel.color != 0)
  return containsPixelData.length > 0
}

// Check if a col|row combination has collision with either the arena boundary or anoter pixel
const hasCollisions = (col, row) => {
  let boundaryCollision = checkArenaBoundaryCollision(col, row)
  let pixelCollision = checkPixelDataCollision(col, row)
  return boundaryCollision || pixelCollision
}

// Given a piece and its desired X, Y and rotation values, checks if its pixels will collide
const willPieceCollide = (piece, desiredXAmount = 0, desiredYAmount = 0, rotateAmount = 0) => {
  let willCollide = false
  let pieceCoordinates = translatePiecePosition({
    ...piece,
    rotation: piece.rotation + rotateAmount
  })
  
  for(let i = 0; i < pieceCoordinates.length; i++){
    let nextXCoordinates = pieceCoordinates[i].x + desiredXAmount
    let nextYCoordinates = pieceCoordinates[i].y + desiredYAmount
    willCollide = hasCollisions(nextXCoordinates, nextYCoordinates)
    if(willCollide) return willCollide
  }
  return willCollide
}

// Performs checks to try and rotate a piece into one of the possible locations
// based on the piece rotation and the piece kickOffset data
const tryForceRotationKick = (piece, rotateAmount) => {
  let currentRotation = piece.rotation
  let targetRotation = piece.rotation + rotateAmount

  let targetOffsetData = piece.kickOffset[targetRotation]
  let currentOffsetData = piece.kickOffset[currentRotation]

  for(let i = 0; i < targetOffsetData.length; i++){
    let XCheck = currentOffsetData[i].x - targetOffsetData[i].x
    let YCheck = currentOffsetData[i].y - targetOffsetData[i].y

    if(!willPieceCollide(
      piece,
      XCheck,
      YCheck,
      rotateAmount)){
        piece.position.x += XCheck
        piece.position.y += YCheck
        piece.rotation += rotateAmount
        return
      }
    }
}

//ROTATING

// Tries rotating a piece clockwise
const rotateR = piece => {
  let {tetromino, rotation} = piece
  let maxRotation = Object.values(tetromino).length - 1
  let safeRotateAmount = rotation < maxRotation ? 1 : -rotation
  tryForceRotationKick(piece, safeRotateAmount)
}

// Tries rotating a piece counter-clockwise
const rotateL = piece => {
  let {tetromino, rotation} = piece
  let maxRotation = Object.values(tetromino).length - 1
  let minRotation = 0
  let safeRotateAmount = rotation > minRotation ? -1 : maxRotation
  tryForceRotationKick(piece, safeRotateAmount)
}

// MOVING

// Tries moving a piece to its desired position
const movePiece = (piece, desiredXAmount, desiredYAmount) => {
  let willCollide = willPieceCollide(piece, desiredXAmount, desiredYAmount)
  piece.position.x += willCollide? 0 : desiredXAmount
  piece.position.y += willCollide? 0 : desiredYAmount
}

// Validates if the desired key is pressed unambiguously across clients
const validateEventKey = (event, key) => {
  const { keyCode, which } = event
  return keyCode === key || which === key
}

// Returns boolean values indicating whether each relevant key is pressed or not
const getKeysPressedState = (event) => {
  return {
    left: validateEventKey(event, LEFT_ARROW),
    right: validateEventKey(event, RIGHT_ARROW),
    down: validateEventKey(event, DOWN_ARROW),
    rotateL: validateEventKey(event, Z_KEY),
    rotateR: validateEventKey(event, X_KEY) 
  }
}

// Returns a string indicating the relevant current key pressed or undefined
// (e.g. 'right')
const getCurrentKeyPressed = (event) => {
  let keysPressed = getKeysPressedState(event)
  let keys = Object.keys(keysPressed)
  let directionsPressed = keys.filter((key) => keysPressed[key] === true && key)
  return directionsPressed[0]
}

// Perform an action according to the key that is currently pressed
const keyPressed = event => {
  let direction = getCurrentKeyPressed(event)

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
}

document.addEventListener('keydown', event => {
  keyPressed(event)
})

// UPDATING
const clear = () => {
  context.clearRect(0,0,CANVASWIDTH, CANVASHEIGHT)
  clearArenaData(arena)
}

const draw = () => {
  insertPixelDataIntoArena()
  insertPieceIntoArena(player.piece)
  drawArenaData()
  printArenaData()
}

let lastime = 0
const update = (time = 0) => {
  const deltaTime = time - lastime
  lastime = time
  // dropCounter += deltaTime
  clear()
  //drawPiece(tetromino.I[0])
  draw()
  requestAnimationFrame(update)
}

const start = () => {
  arena = createEmptyArena(ARENA_X_LENGTH, ARENA_Y_LENGTH)
  //elevatorArenaPreset(player, pixelData)
  //stairsArenaPreset(player, pixelData)
  update()
}

start()
