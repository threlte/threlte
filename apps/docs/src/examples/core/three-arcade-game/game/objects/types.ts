export type BlockData = {
  position: {
    x: number
    z: number
  }
  staticColors: {
    inner: string
    outer: string
  }
  blinkingColors:
    | {
        innerA: string
        innerB: string
        outerA: string
        outerB: string
      }
    | undefined
  hit: boolean
  size: number
  freeze: boolean
}
