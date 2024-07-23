type BlockType = 'Box'

export class Block {
  constructor(
    public readonly type: BlockType,
    public readonly position: [number, number, number],
    public readonly rotation: [number, number, number]
  ) {}
}

export class Start {
  constructor(
    public readonly position: [number, number, number],
    public readonly rotation: [number, number, number]
  ) {}
}

export class Goal {
  constructor(
    public readonly position: [number, number, number],
    public readonly rotation: [number, number, number]
  ) {}
}

export class LevelData {
  constructor(
    public readonly start: Start,
    public readonly goal: Goal,
    public readonly blocks: Block[]
  ) {}
}
