import { useSpace } from '@threlte/studio/extensions'
import { TourStop } from '../TourStop.svelte'
import { MaskDom } from '../../masks/mask-types/MaskDom.svelte'

export class SpaceTourStop extends TourStop {
  constructor() {
    const mask = new MaskDom('[aria-label="World"]', 'circle', 2, true)

    super(mask)

    const space = useSpace()

    $effect(() => {
      if (this.isActive && space.space === 'world') {
        this.stopCompleted()
      }
    })
  }
}
