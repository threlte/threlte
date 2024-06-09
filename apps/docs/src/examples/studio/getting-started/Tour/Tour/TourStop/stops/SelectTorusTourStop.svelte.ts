import { useThrelte } from '@threlte/core'
import { useObjectSelection } from '@threlte/studio/extensions'
import { Mesh } from 'three'
import { MaskThreeObject } from '../../masks/mask-types/MaskThreeObject.svelte'
import { TourStop } from '../TourStop.svelte'
import { InstructionsBasic } from '../../instructions/InstructionsBasic'

export class SelectTorusTourStop extends TourStop {
  constructor() {
    const { scene } = useThrelte()
    const box = scene.getObjectByName('Torus')
    if (!box) throw new Error('Torus not found')
    if (!(box instanceof Mesh)) throw new Error('Torus is not a Mesh')
    const mask = new MaskThreeObject(box, 'circle', 0, 'mask')

    const instructions = new InstructionsBasic(
      'You can also select objects by just clicking on them in the viewport. Select the Torus to continue.',
      {
        tooltip: {
          placement: 'top'
        }
      }
    )
    super(mask, instructions)

    const selection = useObjectSelection()

    $effect(() => {
      if (!this.isActive) return
      if (selection.selectedObjects.length !== 1) return
      const selectedObject = selection.selectedObjects[0]
      if (selectedObject?.name !== 'Torus') return
      this.stopCompleted()
    })

    window.addEventListener('keydown', (event) => {
      if (event.key === 't') {
        this.stopCompleted()
      }
    })
  }
}
