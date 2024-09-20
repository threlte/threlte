import type { Instructions } from '../instructions/Instructions'
import type { Mask } from '../masks/Mask'
import { TourStop } from './TourStop.svelte'

/**
 * A tour stop that completes when the user clicks anywhere.
 */
export class ClickAnywhereTourStop extends TourStop {
  constructor(
    public override readonly mask?: Mask,
    public override readonly instructions?: Instructions
  ) {
    super(mask, instructions)

    this.onClick = this.onClick.bind(this)
  }

  private async onClick() {
    this.stopCompleted()
  }

  override onActivate() {
    requestAnimationFrame(() => {
      window.addEventListener('click', this.onClick)
    })
  }

  override onDeactivate() {
    window.removeEventListener('click', this.onClick)
  }
}
