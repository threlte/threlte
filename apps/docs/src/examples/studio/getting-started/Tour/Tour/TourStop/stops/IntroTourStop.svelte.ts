import { BasicInstructions } from '../../instructions/BasicInstructions'
import { MaskNone } from '../../masks/mask-types/MaskNone'
import { TourStop } from '../TourStop.svelte'

export class IntroTourStop extends TourStop {
  constructor() {
    const mask = new MaskNone(true, false)
    const instructions = new BasicInstructions([
      'Welcome to the Threlte Studio Tour! Click anywhere to continue.'
    ])
    super(mask, instructions)

    this.onClick = this.onClick.bind(this)

    window.addEventListener('click', this.onClick)
  }

  private onClick() {
    this.stopCompleted()
  }

  override onDispose(): void {
    window.removeEventListener('click', this.onClick)
  }
}
