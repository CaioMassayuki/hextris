let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let arena = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
]

// CONSTANTS
const CANVASHEIGHT = canvas.height
const CANVASWIDTH = canvas.width
const PIXEL = CANVASWIDTH / arena[0].length
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

const createPiece = (posX, posY, tetromino, rotation = 0) => {
  return ({
    position: { x: posX, y: posY },
    tetromino: tetromino,
    rotation: rotation})
}

const createPixelData = (posX, posY, colorIndex) => {
  return ({
    x: posX, y: posY, color: colorIndex
  })
}

//É pra isso aqui ser um array vazio que vai se 
//enchendo de dado dos pixel que não são do player
//e nem tem cor 0
//Importante pra colisão
let pixelData = [
  createPixelData(5,8,1),
  createPixelData(5,9,1),
  createPixelData(5,10,1),
  createPixelData(5,11,1)
]

const player = {
  piece: createPiece(4, 0, tetromino.T, 0),
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
const getColorByIndex = (index) => COLORS[index]

const drawPixel = (colNumber, rowNumber, startColor, endColor = startColor) => {
  const grd = context.createLinearGradient(0, 0, CANVASWIDTH, CANVASHEIGHT)
  grd.addColorStop(0, startColor)
  grd.addColorStop(0.5, startColor)
  grd.addColorStop(1, endColor)

  context.fillStyle = grd
  context.fillRect(colNumber * PIXEL, rowNumber * PIXEL, PIXEL, PIXEL)
}

const insertPixelDataIntoArena = () => {
  for(i = 0; i < pixelData.length; i++){
    let pixelRow = pixelData[i].y
    let pixelCol = pixelData[i].x
    arena[pixelRow][pixelCol] = pixelData[i].color
  }
}

const insertPieceIntoArena = (piece) => {
  let absolutePosition = translatePiecePosition(piece)

  for(let i = 0; i < absolutePosition.length; i++){
    let pixelRow = absolutePosition[i].y
    let pixelCol = absolutePosition[i].x
    arena[pixelRow][pixelCol] = absolutePosition[i].color
  }
}

const clearArenaData = () => {
  for (let row = 0; row < arena.length; row++) {
    for (let col = 0; col < arena[row].length; col++) {
      arena[row][col] = 0
    }
  }
}

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

const printArenaData = () => {
  let arenaData = '\n\n\n\n\n\n'
  for (let row = 0; row < arena.length; row++) {
    arenaData += (arena[row].toString()+'\n')
  }
  console.group()
  console.log(arenaData, '\n\n\n\n\n\n\n')
  console.groupEnd()
}

//COLLISION
const checkArenaBoundaryCollision = (pixelNextCol, pixelNextRow) => {
  let yCollision = pixelNextRow < 0 || pixelNextRow > arena.length - 1
  let xCollision = pixelNextCol < 0 || pixelNextCol > arena[0].length - 1
  return yCollision || xCollision
}

const checkPixelDataCollision = (pixelNextCol, pixelNextRow) => {
  containsPixelData = pixelData.filter(pixel => pixel.x === pixelNextCol && pixel.y === pixelNextRow)
  return containsPixelData.length > 0
}

const hasCollisions = (pixelNextCol, pixelNextRow) => {
  let boundaryCollision = checkArenaBoundaryCollision(pixelNextCol, pixelNextRow)
  let pixelCollision = checkPixelDataCollision(pixelNextCol, pixelNextRow)
  return boundaryCollision || pixelCollision
}

const willPieceCollide = (piece, desiredXAmount = 0, desiredYAmount = 0, rotateAmount = 0) => {
  let Colliding = false
  let pieceCoordinates = translatePiecePosition({
    ...piece,
    rotation: piece.rotation + rotateAmount
  })
  
  for(let i = 0; i < pieceCoordinates.length; i++){
    let nextXCoordinates = pieceCoordinates[i].x + desiredXAmount
    let nextYCoordinates = pieceCoordinates[i].y + desiredYAmount
    Colliding = hasCollisions(nextXCoordinates, nextYCoordinates)
    if(Colliding) return Colliding
  }
  return Colliding
}

const tryForceRotationNearby = (piece, rotateAmount) => {
  if(!willPieceCollide(piece, 0, 0, rotateAmount)){
    piece.rotation += rotateAmount
  }
  else if(!willPieceCollide(piece, 1, 0, rotateAmount)){
    piece.position.x += 1
    piece.rotation += rotateAmount
  }
  else if(!willPieceCollide(piece, -1, 0, rotateAmount)){
    piece.position.x -= 1
    piece.rotation += rotateAmount
  }
  else if(!willPieceCollide(piece, 0, -1, rotateAmount)){
    piece.position.y -= 1
    piece.rotation += rotateAmount
  }
  else if(!willPieceCollide(piece, 0, 1, rotateAmount)){
    piece.position.y += 1
    piece.rotation += rotateAmount
  }
}

//ROTATING
const rotateR = piece => {
  let {tetromino, rotation} = piece
  let maxRotation = Object.values(tetromino).length - 1
  let safeRotateAmount = rotation < maxRotation ? 1 : -rotation
  tryForceRotationNearby(piece, safeRotateAmount)
}

const rotateL = piece => {
  let {tetromino, rotation} = piece
  let maxRotation = Object.values(tetromino).length - 1
  let minRotation = 0
  let safeRotateAmount = rotation > minRotation ? -1 : maxRotation
  tryForceRotationNearby(piece, safeRotateAmount)
}

// MOVING
const movePiece = (piece, desiredXAmount, desiredYAmount) => {
  let willCollide = willPieceCollide(piece, desiredXAmount, desiredYAmount)
  piece.position.x += willCollide? 0 : desiredXAmount
  piece.position.y += willCollide? 0 : desiredYAmount
}

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
  clearArenaData()
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

update()