const canvas = document.getElementById('gameField')
const ctx = canvas.getContext('2d')

const fieldSize = 600
const numCells = 200
const cellSize = fieldSize / numCells

const decayColor = [
  '#020202',
  '#172d17',
  '#2c572c',
  '#418141',
  '#56ab56',
  '#6bd56b',
  '#80ff80',
]

const cellFce = {
  draw: function () {
    ctx.fillStyle = decayColor[this.decay]
    ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize)
  },
}

const grid = []

const createGrid = () => {
  const genSize = numCells * numCells
  for (let x = 0; x < genSize; x++) {
    let newCell = {
      decay: 0,
      x: x % numCells,
      y: Math.floor(x / numCells),
      alive: Math.random() > 0.5,
      ...cellFce,
    }
    grid.push(newCell)
  }
}

const gameLoop = () => {
  // Check the surrounding of each cell
  checkSurrounding()

  // Clear the screen
  ctx.clearRect(0, 0, fieldSize, fieldSize)

  // Draw all the game objects
  for (let i = 0; i < grid.length; i++) {
    grid[i].draw()
  }

  // The loop function has reached it's end, keep requesting new frames
  setTimeout(() => {
    window.requestAnimationFrame(() => gameLoop())
  }, 50) // The delay will make the game easier to follow
}

const checkSurrounding = () => {
  // Loop over all cells
  for (let x = 0; x < numCells; x++) {
    for (let y = 0; y < numCells; y++) {
      // Count the nearby population
      let numAlive =
        isAlive(x - 1, y - 1) +
        isAlive(x, y - 1) +
        isAlive(x + 1, y - 1) +
        isAlive(x - 1, y) +
        isAlive(x + 1, y) +
        isAlive(x - 1, y + 1) +
        isAlive(x, y + 1) +
        isAlive(x + 1, y + 1)
      let centerIndex = gridToIndex(x, y)

      if (numAlive == 2) {
        // Do nothing
        grid[centerIndex].nextAlive = grid[centerIndex].alive
      } else if (numAlive == 3) {
        // Make alive
        grid[centerIndex].nextAlive = true
      } else {
        // Make dead
        grid[centerIndex].nextAlive = false
      }
    }
  }
  // Apply the new state to the cells
  for (let i = 0; i < grid.length; i++) {
    grid[i].alive = grid[i].nextAlive
    grid[i].decay = grid[i].nextAlive
      ? 6
      : grid[i].decay > 0
      ? grid[i].decay - 1
      : 0
  }
}

const isAlive = (x, y) => {
  if (x < 0 || x >= numCells || y < 0 || y >= numCells) {
    return false
  }
  return grid[gridToIndex(x, y)].alive ? 1 : 0
}

const gridToIndex = (x, y) => {
  return x + y * numCells
}

createGrid()
// Start your loop for the first time
window.requestAnimationFrame(() => gameLoop())
