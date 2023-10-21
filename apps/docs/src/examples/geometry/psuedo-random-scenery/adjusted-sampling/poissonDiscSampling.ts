// Adapted from: https://github.com/SebLague/Poisson-Disc-Sampling
// https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf

export type Point = {
  x: number
  y: number
  layer: number
}

export class AdjustedPoissonDiscSample {
  random
  radius: number
  cellSize: number
  radiusMap: {
    [key: number]: number
  }
  cellSizeMap: {
    [key: number]: number
  }
  maxCandidates: number
  width = 1
  height = 1
  grid: number[][] = []
  gridWidth: number | undefined
  gridHeight: number | undefined
  points: Point[] = []
  spawnPoints: Point[] = []
  /**
   * @param radius
   * @param region even numbered width/height vector
   * @param maxCandidates default 30
   * @param random a random (or pusedo-random) number generator (0, 1) - defaults to Math.random
   * @param radiusMap WIP
   */
  constructor(
    radius: number,
    region: number[],
    maxCandidates = 30,
    random = Math.random,
    radiusMap: { [key: number]: number }
  ) {
    this.random = random

    this.radius = radius
    this.cellSize = radius / Math.SQRT2

    console.log(radiusMap)
    if (!radiusMap) throw 'Opps'
    this.radiusMap = radiusMap
    this.cellSizeMap = Object.fromEntries(
      Object.keys(this.radiusMap).map((key) => [key, this.radiusMap[key] / Math.SQRT2])
    )
    console.log(this.cellSizeMap)

    this.maxCandidates = maxCandidates

    this.width = region[0]
    this.height = region[1]

    const x = Math.floor(this.random() * this.width)
    const y = Math.floor(this.random() * this.height)
    // TODO-DefinitelyMaybe: don't hardcode the layer
    this.spawnPoints.push({ x, y, layer: 0 })
  }

  GeneratePoints() {
    const layers = Object.keys(this.radiusMap)
    layers.forEach((layer) => {
      // TODO-DefinitelyMaybe: reset the grid before spawning more points
      // might look something like
      // resetGrid(layer)
      // the points should already be there and if not then it's a blank reset
      while (this.spawnPoints.length > 0) {
        // choose one of the spawn points at random
        const spawnIndex = Math.floor(this.random() * this.spawnPoints.length)
        const spawnCentre = this.spawnPoints[spawnIndex]!
        let candidateAccepted = false

        // then generate k candidates around it
        for (let k = 0; k < this.maxCandidates; k++) {
          const angle = this.random() * Math.PI * 2
          const dir = [Math.sin(angle), Math.cos(angle)]
          this.radiusMap[spawnCentre.layer]
          const disp = Math.floor(this.random() * (this.radius + 1)) + this.radius
          const candidate: Point = {
            x: spawnCentre.x + dir[0] * disp,
            y: spawnCentre.y + dir[1] * disp,
            layer: 0
          }

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
    })
    return this.points
  }

  IsValid(candidate: Point) {
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

  resetGrid(layer: number) {
    this.gridHeight = Math.ceil(this.height / this.cellSizeMap[layer])
    this.gridWidth = Math.ceil(this.width / this.cellSizeMap[layer])

    // Setup the initial map with 0's everywhere
    this.grid = new Array(this.gridHeight)
    for (let i = 0; i < this.gridHeight; i++) {
      this.grid[i] = [...new Array(this.gridWidth)].map((_) => 0)
    }

    if (this.points.length != 0) {
      // then fill in the map where needed
      for (let i = 0; i < this.points.length; i++) {
        const point = this.points[i]
        this.invalidateGridCells(point)
      }
    }
  }

  invalidateGridCells(point: Point) {
    // todo
  }
}
