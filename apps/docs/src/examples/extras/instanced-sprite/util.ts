// Adapted from: https://github.com/SebLague/Poisson-Disc-Sampling
// https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf

export class PoissonDiscSample {
  /**
   * @param {number} radius
   * @param {number[]} region even numbered width/height vector
   * @param {number} maxCandidates default 30
   */
  constructor(radius, region, maxCandidates = 30) {
    this.random = Math.random

    this.radius = radius
    this.cellSize = radius / Math.SQRT2
    this.maxCandidates = maxCandidates

    this.width = region[0]
    this.height = region[1]

    this.gridHeight = Math.ceil(this.height / this.cellSize)
    this.gridWidth = Math.ceil(this.width / this.cellSize)

    this.grid = new Array(this.gridHeight)
    for (let i = 0; i < this.gridHeight; i++) {
      this.grid[i] = [...new Array(this.gridWidth)].map((_) => 0)
    }

    this.points = []
    this.spawnPoints = []

    this.spawnPoints.push([this.width / 2, this.height / 2])
  }

  /**
   * @returns {number[][]} an array of points
   */
  GeneratePoints() {
    while (this.spawnPoints.length > 0) {
      // choose one of the spawn points at random
      const spawnIndex = Math.floor(this.random() * this.spawnPoints.length)
      const spawnCentre = this.spawnPoints[spawnIndex]
      let candidateAccepted = false

      // then generate k candidates around it
      for (let k = 0; k < this.maxCandidates; k++) {
        const angle = this.random() * Math.PI * 2
        const dir = [Math.sin(angle), Math.cos(angle)]
        const disp = Math.floor(this.random() * (this.radius + 1)) + this.radius
        const candidate = spawnCentre.map((val, i) => val + dir[i] * disp)

        // check if the candidate is valid
        if (this.IsValid(candidate)) {
          this.points.push(candidate)
          this.spawnPoints.push(candidate)
          const gridX = Math.ceil(candidate[0] / this.cellSize) - 1
          const gridY = Math.ceil(candidate[1] / this.cellSize) - 1
          this.grid[gridY][gridX] = this.points.length
          candidateAccepted = true
          break
        }
      }
      // If no candidates around it were valid
      if (!candidateAccepted) {
        // Remove it from the spawnpoints list
        this.spawnPoints.splice(spawnIndex, 1)
      }
    }
    return this.points
  }

  IsValid(candidate) {
    const cX = candidate[0]
    const cY = candidate[1]
    if (cX >= 0 && cX < this.width && cY >= 0 && cY < this.height) {
      const cellX = Math.ceil(cX / this.cellSize)
      const cellY = Math.ceil(cY / this.cellSize)
      const searchStartX = Math.max(0, cellX - 2)
      const searchEndX = Math.min(cellX + 2, this.gridWidth - 1)
      const searchStartY = Math.max(0, cellY - 2)
      const searchEndY = Math.min(cellY + 2, this.gridHeight - 1)

      for (let x = searchStartX; x <= searchEndX; x++) {
        for (let y = searchStartY; y <= searchEndY; y++) {
          const pointIndex = this.grid[y][x]
          if (pointIndex != 0) {
            const diff = candidate.map((val, i) => val - this.points[pointIndex - 1][i])
            // we're not worried about the actual distance, just the equality
            const sqrdDst = Math.pow(diff[0], 2) + Math.pow(diff[1], 2)
            if (sqrdDst < Math.pow(this.radius, 2)) {
              return false
            }
          }
        }
      }
      return true
    }
    return false
  }
}

export class AdaptedPoissonDiscSample extends PoissonDiscSample {
  /**
   * @param {number} radius
   * @param {number[]} region even numbered width/height vector
   * @param {number} maxCandidates default 30
   * @param {()=>number} random a random (or pusedo-random) number generator (0, 1)
   */
  constructor(radius, region, maxCandidates = 30, random) {
    super(radius, region, maxCandidates)
    this.random = random
    this.spawnPoints = []
    const x = Math.floor(this.random() * this.width)
    const y = Math.floor(this.random() * this.height)
    this.spawnPoints.push([x, y])
  }
}

export const randomPosition: any = (radius = 100) => {
  const x = (Math.random() - 0.5) * radius * 2
  const y = (Math.random() - 0.5) * radius * 2

  if (Math.sqrt(x ** 2 + y ** 2) > radius) {
    return randomPosition()
  }

  return { x, y }
}
