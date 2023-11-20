import { Loop } from '../Loop/Loop'

export class LoopManager {
  loops: Set<Loop> = new Set()

  constructor(loops: Loop[] = []) {
    this.loops = new Set(loops)
  }

  addLoop(loop: Loop) {
    this.loops.add(loop)
  }

  removeLoop(loop: Loop) {
    this.loops.delete(loop)
  }
}
