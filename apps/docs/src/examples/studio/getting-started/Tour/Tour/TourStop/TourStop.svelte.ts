import type { Instructions } from '../instructions/Instructions'
import type { Mask } from '../masks/Mask'

/**
 * Abstract class for a tour stop.
 */
export abstract class TourStop {
  public isActive = $state(false)

  public isCompleted = $state(false)

  constructor(
    public readonly mask?: Mask,
    public readonly instructions?: Instructions
  ) {}

  stopCompleted() {
    this.isCompleted = true
    this.onDispose?.()
  }

  onDispose?(): void
}
