const canvas = document.querySelector<HTMLCanvasElement>('#gameField')!

const ctx = canvas.getContext('2d')!
const population = document.querySelector<HTMLSpanElement>('#pop')!
const generation = document.querySelector<HTMLSpanElement>('#gen')!

let genNum = 0
let popNum = 0

const fieldSize = 570
const numCells = 190
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

const grid: any[] = []

const createGrid = () => {
  const genSize = numCells * numCells
  for (let x = 0; x < genSize; x++) {
    let newCell = {
      decay: 0,
      x: x % numCells,
      y: Math.floor(x / numCells),
      alive: Math.random() > 0.5,
      draw: function () {
        ctx.fillStyle = decayColor[this.decay]
        ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize)
      },
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
  grid.forEach((cell) => cell.draw())

  generation.innerHTML = String(++genNum)
  population.innerHTML = String(popNum)

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
  popNum = 0
  grid.forEach((cell) => {
    cell.alive = cell.nextAlive
    cell.decay = cell.alive ? 6 : cell.decay > 0 ? cell.decay - 1 : 0
    popNum += cell.alive ? 1 : 0
  })
}

const isAlive = (x: number, y: number) => {
  if (x < 0 || x >= numCells || y < 0 || y >= numCells) {
    return 0
  }
  return grid[gridToIndex(x, y)].alive ? 1 : 0
}

const gridToIndex = (x: number, y: number) => {
  return x + y * numCells
}

createGrid()
// Start your loop for the first time
window.requestAnimationFrame(() => gameLoop())
