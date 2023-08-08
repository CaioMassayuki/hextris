// ARENA PRESETS

const elevatorArenaPreset = (player, pixelData) => {
    player.piece = createPlayerPiece('T')
    pixelData.length = 0
    pixelData.push(
      createPixelData(0,1,1),
      createPixelData(0,2,1),
      createPixelData(0,3,1),
      createPixelData(0,4,1),
      createPixelData(0,5,1),
      createPixelData(0,6,1),
      createPixelData(0,7,1),
      createPixelData(0,8,1),
      createPixelData(0,9,1),
      createPixelData(0,10,1),
      createPixelData(0,11,1),
      createPixelData(0,12,1),
      createPixelData(0,13,1),
      createPixelData(0,14,1),
      createPixelData(0,15,1),
      createPixelData(0,16,1),
      createPixelData(0,17,1),
      createPixelData(0,18,1),
      createPixelData(0,19,1),
    
      createPixelData(1,5,1),
      createPixelData(1,6,1),
      createPixelData(1,7,1),
      createPixelData(1,8,1),
      createPixelData(1,9,1),
      createPixelData(1,10,1),
      createPixelData(1,11,1),
      createPixelData(1,12,1),
      createPixelData(1,13,1),
      createPixelData(1,14,1),
      createPixelData(1,15,1),
      createPixelData(1,16,1),
      createPixelData(1,17,1),
      createPixelData(1,18,1),
      createPixelData(1,19,1),
    
      createPixelData(2,9,1),
      createPixelData(2,10,1),
      createPixelData(2,11,1),
      createPixelData(2,12,1),
      createPixelData(2,13,1),
      createPixelData(2,14,1),
      createPixelData(2,15,1),
      createPixelData(2,16,1),
      createPixelData(2,17,1),
      createPixelData(2,18,1),
      createPixelData(2,19,1),
    
      createPixelData(3,13,1),
      createPixelData(3,14,1),
      createPixelData(3,15,1),
      createPixelData(3,16,1),
      createPixelData(3,17,1),
      createPixelData(3,18,1),
      createPixelData(3,19,1),
    
      createPixelData(4,17,1),
      createPixelData(4,18,1),
      createPixelData(4,19,1),
    
      createPixelData(2,3,1),
      createPixelData(3,7,1),
      createPixelData(4,11,1),
      createPixelData(5,15,1),
    
      createPixelData(6,19,1),
      createPixelData(7,19,1),
      createPixelData(8,19,1),
      createPixelData(9,19,1),
    
    
      createPixelData(4,2,1),
      createPixelData(4,3,1),
      createPixelData(4,4,1),
    
      createPixelData(5,2,1),
      createPixelData(5,3,1),
      createPixelData(5,4,1),
      createPixelData(5,5,1),
      createPixelData(5,6,1),
      createPixelData(5,7,1),
      createPixelData(5,8,1),
    
      createPixelData(6,2,1),
      createPixelData(6,3,1),
      createPixelData(6,4,1),
      createPixelData(6,5,1),
      createPixelData(6,6,1),
      createPixelData(6,7,1),
      createPixelData(6,8,1),
      createPixelData(6,9,1),
      createPixelData(6,10,1),
      createPixelData(6,11,1),
      createPixelData(6,12,1),
    
      createPixelData(7,2,1),
      createPixelData(7,3,1),
      createPixelData(7,4,1),
      createPixelData(7,5,1),
      createPixelData(7,6,1),
      createPixelData(7,7,1),
      createPixelData(7,8,1),
      createPixelData(7,9,1),
      createPixelData(7,10,1),
      createPixelData(7,11,1),
      createPixelData(7,12,1),
      createPixelData(7,13,1),
      createPixelData(7,14,1),
      createPixelData(7,15,1),
      createPixelData(7,16,1)
    )
  }
  
  const stairsArenaPreset = (player, pixelData) => {
    player.piece = createPlayerPiece('I')
    pixelData.length = 0
    pixelData.push(
      createPixelData(0,11,5),
      createPixelData(1,11,5),
      createPixelData(2,11,5),
      createPixelData(3,11,5),
      createPixelData(4,11,5),
      createPixelData(5,11,5),
      createPixelData(6,11,5),
      createPixelData(7,11,5),
      createPixelData(9,11,5),
  
      createPixelData(0,12,5),
      createPixelData(1,12,5),
      createPixelData(2,12,5),
      createPixelData(3,12,5),
      createPixelData(4,12,5),
      createPixelData(5,12,5),
      createPixelData(6,12,5),
      createPixelData(7,12,5),
      createPixelData(9,12,5),
  
      createPixelData(0,13,5),
      createPixelData(1,13,5),
      createPixelData(2,13,5),
      createPixelData(3,13,5),
      createPixelData(4,13,5),
      createPixelData(5,13,5),
      createPixelData(6,13,5),
      createPixelData(7,13,5),
      createPixelData(9,13,5),
  
      createPixelData(0,14,5),
      createPixelData(1,14,5),
      createPixelData(2,14,5),
      createPixelData(3,14,5),
      createPixelData(4,14,5),
      createPixelData(5,14,5),
      createPixelData(6,14,5),
      createPixelData(7,14,5),
      createPixelData(9,14,5),
  
      createPixelData(0,15,5),
      createPixelData(1,15,5),
      createPixelData(2,15,5),
      createPixelData(3,15,5),
      createPixelData(9,15,5),
  
      createPixelData(0,16,5),
      createPixelData(1,16,5),
      createPixelData(2,16,5),
      createPixelData(3,16,5),
      createPixelData(5,16,5),
      createPixelData(6,16,5),
      createPixelData(7,16,5),
      createPixelData(8,16,5),
      createPixelData(9,16,5),
  
      createPixelData(0,17,5),
      createPixelData(1,17,5),
      createPixelData(2,17,5),
      createPixelData(3,17,5),
      createPixelData(5,17,5),
      createPixelData(6,17,5),
      createPixelData(7,17,5),
      createPixelData(8,17,5),
      createPixelData(9,17,5),
  
      createPixelData(0,18,5),
      createPixelData(1,18,5),
      createPixelData(2,18,5),
      createPixelData(3,18,5),
      createPixelData(5,18,5),
      createPixelData(6,18,5),
      createPixelData(7,18,5),
      createPixelData(8,18,5),
      createPixelData(9,18,5),
  
      createPixelData(0,19,5),
      createPixelData(5,19,5),
      createPixelData(6,19,5),
      createPixelData(7,19,5),
      createPixelData(8,19,5),
      createPixelData(9,19,5),
    )
  }