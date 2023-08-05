let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

const CANVASHEIGHT = canvas.height
const CANVASWIDTH = canvas.width
const PIXEL = CANVASWIDTH / 10

// CONSTANTS
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const Z_KEY = 90
const X_KEY = 88

// for(let i = 0; i < CANVASWIDTH; i += PIXEL){
//   context.fillStyle = "red"
//   context.fillRect(i,0,PIXEL,PIXEL)
// }

const color_piece = {
  1: 'cyan',
  2: 'purple',
  3: 'orange',
  4: 'blue',
  5: 'yellow',
  6: 'green',
  7: 'red',
  8: 'cyan',
}

const I_STATES = {
  1: [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  2: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  3: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  4: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
}

const tetromino = {
  I: Object.values(I_STATES),
  T: [[0, 2, 0], [2, 2, 2][(0, 0, 0)]],
  L: [
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 3],
  ],
  J: [
    [0, 4, 0],
    [0, 4, 0],
    [4, 4, 0],
  ],
  O: [
    [5, 5],
    [5, 5],
  ],
  S: [[0, 5, 5], [5, 5, 0][(0, 0, 0)]],
  Z: [[6, 6, 0], [0, 6, 6][(0, 0, 0)]],
}

const validateEventKey = (event, key) => {
  const { keyCode, which } = event
  return keyCode === key || which === key
}

const player = {
  position: { x: 4, y: 2 },
  piece: tetromino.I
}

document.addEventListener('keydown', event => {
  if (validateEventKey(event, LEFT_ARROW)) {
    player.position.x--
    // COLLIDE
  } else if (validateEventKey(event, RIGHT_ARROW)) {
    player.position.x++
    // COLLIDE
  } 
  else if (validateEventKey(event, DOWN_ARROW)) {
    // arrowDown = true
    player.position.y++
  } 
  // else if (validateEventKey(event, Z_KEY)) {
  //   rotateAction(ROTATE_LEFT)
  // } else if (validateEventKey(event, X_KEY)) {
  //   rotateAction(ROTATE_RIGHT)
  // }
})


const drawPiece = piece => {
  console.log(piece)
  for (let row = 0; row < piece.length; row++) {
    for (let col = 0; col < piece[row].length; col++) {
      if (piece[row][col] != 0) {
        const grd = context.createLinearGradient(0, 0, CANVASWIDTH, CANVASHEIGHT)
        grd.addColorStop(0, color_piece[piece[row][col]])
        grd.addColorStop(1, color_piece[piece[row][col] + 1])

        context.fillStyle = grd
        context.fillRect((col + player.position.x) * PIXEL, (row + player.position.y) * PIXEL, PIXEL, PIXEL)
      }
    }
  }
}

let lastime = 0
function update(time = 0) {
  const deltaTime = time - lastime
  lastime = time
  // dropCounter += deltaTime
  context.clearRect(0,0,CANVASWIDTH, CANVASHEIGHT)
  drawPiece(tetromino.I[0])
  requestAnimationFrame(update)
}

update()