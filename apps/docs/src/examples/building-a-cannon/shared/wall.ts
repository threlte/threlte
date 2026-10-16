// Every step builds the same running-bond wall, so its layout lives here. The
// lessons are in how each step treats the bricks, not in where they go.
export const WALL_X = 7
export const createWall = (rows = 4, columns = 3) =>
  Array.from({ length: columns * rows }, (_, i) => {
    const column = i % columns
    const row = Math.floor(i / columns)
    // Running bond: alternate rows shift relative to each other. Kept under
    // 0.245 so the end brick of an offset row still has its centre of mass over
    // the brick below it, otherwise it topples on its own.
    const stagger = row % 2 === 0 ? 0.15 : -0.15
    // Columns run across the firing line, so this is a wall facing the cannon
    // rather than a stack pointing away from it.
    const z = (column - (columns - 1) / 2 + stagger) * 1.02
    return {
      key: i,
      position: [WALL_X, 0.5 + row * 1.02, z] as [number, number, number]
    }
  })
