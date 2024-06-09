import { useSpace } from '@threlte/studio/extensions'
import { TourStop } from '../TourStop.svelte'
import { MaskDom } from '../../masks/mask-types/MaskDom.svelte'
import { InstructionsBasic } from '../../instructions/InstructionsBasic'

export class SpaceTourStop extends TourStop {
  constructor() {
    const instructions = new InstructionsBasic(
      'Welcome to the Threlte Studio Tour! Click anywhere to continue.'
    )
    const mask = new MaskDom('[aria-label="World"]', 'circle', 2, true)

    super(mask, instructions)

    const space = useSpace()

    $effect(() => {
      if (this.isActive && space.space === 'world') {
        this.stopCompleted()
      }
    })
  }
}
