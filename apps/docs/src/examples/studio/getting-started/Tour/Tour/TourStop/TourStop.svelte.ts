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
  }

  activate() {
    this.isActive = true
    this.isCompleted = false
    this.onActivate?.()
  }

  deactivate() {
    this.isActive = false
    this.isCompleted = false
    this.onDeactivate?.()
  }

  onActivate?(): void | Promise<void>

  onDeactivate?(): void | Promise<void>
}
