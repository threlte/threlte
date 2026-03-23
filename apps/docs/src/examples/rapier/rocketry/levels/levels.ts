import { Block, Goal, LevelData, Start } from './LevelData'

export const level1 = new LevelData(
  new Start([0, -1, 0], [0, 0, 0]),
  new Goal([3, 0, 0], [0, 0, 0]),
  [new Block('Box', [-3, 0, 0], [0, 0, 0])]
)

export const level2 = new LevelData(
  new Start([0, -2, 0], [0, 0, 0]),
  new Goal([2, 0, 0], [0, 0, 0]),
  [new Block('Box', [-2, 0, 0], [0, 0, 0])]
)
