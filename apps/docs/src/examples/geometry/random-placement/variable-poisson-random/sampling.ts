// Adapted from: https://github.com/SebLague/Poisson-Disc-Sampling
// https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf

export type Point = {
  x: number
  y: number
  desription: string
}

export class PoissonDiscSample {
  random
  radiiMatrix: { desription: string; density: number; radius: number }[]
  radiiMap: { [key: string]: number }
  maxRadius: number
  customRanges: { start: number; end: number; desription: string }[] = []
  cellSize: number
  cellSizeMatrix: { [key: string]: number }
  maxCandidates: number
  windowSize: number
  width = 1
  height = 1
  /** 2D array of indices of points */
  grid: number[][] = []
  gridWidth: number
  gridHeight: number

  points: Point[] = []
  spawnPoints: Point[] = []

  constructor(
    radiiMatrix: { desription: string; density: number; radius: number }[],
    region: { width: number; height: number },
    maxCandidates = 30,
    random = Math.random
  ) {
    this.random = random

    this.radiiMatrix = radiiMatrix
    // make sure the density sums to 1 so we can use it later
    const densityTotal = this.radiiMatrix.reduce((total, obj) => {
      return total + obj.density
    }, 0)
    if (densityTotal > 1 || densityTotal < 1) {
      this.radiiMatrix = this.radiiMatrix.map((obj) => {
        return {
          ...obj,
          density: obj.density / densityTotal
        }
      }, 0)
    }
    let currentTotal = 0
    this.customRanges = this.radiiMatrix.map((obj) => {
      let range = {
        start: currentTotal,
        end: currentTotal + obj.density,
        desription: obj.desription
      }
      currentTotal += obj.density
      return range
    })

    this.maxRadius = this.radiiMatrix.reduce((max, obj) => {
      return obj.radius > max ? obj.radius : max
    }, -Infinity)

    this.radiiMap = this.radiiMatrix.reduce((obj: { [key: string]: number }, value) => {
      obj[value.desription] = value.radius
      return obj
    }, {})

    this.cellSizeMatrix = this.radiiMatrix.reduce((obj: { [key: string]: number }, value) => {
      obj[value.desription] = value.radius / Math.SQRT2
      return obj
    }, {})
    this.cellSize = Infinity
    for (const key in this.cellSizeMatrix) {
      if (this.cellSizeMatrix[key]! < this.cellSize) {
        this.cellSize = this.cellSizeMatrix[key]!
      }
    }
    this.windowSize = Math.ceil(this.maxRadius / this.cellSize)

    this.maxCandidates = maxCandidates

    this.width = region.width
    this.height = region.height

    this.gridHeight = Math.ceil(this.height / this.cellSize)
    this.gridWidth = Math.ceil(this.width / this.cellSize)

    this.grid = new Array(this.gridHeight)
    for (let i = 0; i < this.gridHeight; i++) {
      this.grid[i] = [...new Array(this.gridWidth)].map((_) => 0)
    }

    this.points = []
    this.spawnPoints = []

    const x = Math.floor(this.random() * this.width)
    const y = Math.floor(this.random() * this.height)

    this.spawnPoints.push({ x, y, desription: this.createPointType() })
  }

  generatePoints(): Point[] {
    while (this.spawnPoints.length > 0) {
      // choose one of the spawn points at random
      const spawnIndex = Math.floor(this.random() * this.spawnPoints.length)
      const spawnCentre = this.spawnPoints[spawnIndex]!
      let candidateAccepted = false

      // then generate k candidates around it
      for (let k = 0; k < this.maxCandidates; k++) {
        const angle = this.random() * Math.PI * 2
        const dir: [number, number] = [Math.sin(angle), Math.cos(angle)]
        // TODO-DefinitelyMaybe: select a point and calc it's displacement
        const candidateType = this.createPointType()

        // const disp = Math.floor(this.random() * (this.radius + 1)) + this.radius
        const dispScalar = Math.max(
          this.radiiMap[candidateType]!,
          this.radiiMap[spawnCentre.desription]!
        )
        const disp = Math.floor(this.random() * (dispScalar + 1)) + dispScalar
        const candidate = {
          x: spawnCentre.x + dir[0] * disp,
          y: spawnCentre.y + dir[1] * disp,
          desription: candidateType
        }
        // spawnCentre.map((val, i) => val + dir[i] * disp)

        // check if the candidate is valid
        if (this.isValid(candidate)) {
          this.points.push(candidate)
          this.spawnPoints.push(candidate)
          const gridX = Math.ceil(candidate.x / this.cellSize) - 1
          const gridY = Math.ceil(candidate.y / this.cellSize) - 1
          this.grid[gridY]![gridX] = this.points.length
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

  createPointType() {
    const number = this.random()
    let value = ''
    for (let i = 0; i < this.customRanges.length; i++) {
      const { start, end, desription } = this.customRanges[i]!
      if (number > start && number <= end) {
        value = desription
      }
    }
    return value
  }

  isValid(candidate: Point) {
    const cX = candidate.x
    const cY = candidate.y
    if (cX >= 0 && cX < this.width && cY >= 0 && cY < this.height) {
      const cellX = Math.ceil(cX / this.cellSize)
      const cellY = Math.ceil(cY / this.cellSize)
      const searchStartX = Math.max(0, cellX - this.windowSize)
      const searchEndX = Math.min(cellX + this.windowSize, this.gridWidth - 1)
      const searchStartY = Math.max(0, cellY - this.windowSize)
      const searchEndY = Math.min(cellY + this.windowSize, this.gridHeight - 1)

      for (let x = searchStartX; x <= searchEndX; x++) {
        for (let y = searchStartY; y <= searchEndY; y++) {
          const pointIndex = this.grid[y]![x]!
          if (pointIndex != 0) {
            const diff: [number, number] = [
              candidate.x - this.points[pointIndex - 1]?.x!,
              candidate.y - this.points[pointIndex - 1]?.y!
            ]
            // we're not worried about the actual distance, just the equality
            const sqrdDst = Math.pow(diff[0], 2) + Math.pow(diff[1], 2)
            if (
              sqrdDst <
              Math.pow(
                Math.max(
                  this.radiiMap[this.points[pointIndex - 1]?.desription!]!,
                  this.radiiMap[candidate.desription]!
                ),
                2
              )
            ) {
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
