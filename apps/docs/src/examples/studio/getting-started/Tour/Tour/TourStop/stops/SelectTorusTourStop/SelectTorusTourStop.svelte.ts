import { useThrelte } from '@threlte/core'
import { useObjectSelection } from '@threlte/studio/extensions'
import { Mesh } from 'three'
import { MaskThreeObject } from '../../../masks/mask-types/MaskThreeObject.svelte'
import { TourStop } from '../../TourStop.svelte'
import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'

export class SelectTorusTourStop extends TourStop {
  constructor() {
    const { scene } = useThrelte()
    const torus = scene.getObjectByName('Torus')
    if (!torus) throw new Error('Torus not found')
    if (!(torus instanceof Mesh)) throw new Error('Torus is not a Mesh')
    const mask = new MaskThreeObject(torus, 'circle', 0, 'mask')

    const instructions = new InstructionsBasic({
      message: 'You can also select objects by just clicking on them in the viewport.',
      cta: 'Select the Torus',
      tip: 'Use the box-select tool to select multiple objects at once.',
      style: {
        tooltip: {
          placement: 'top'
        }
      }
    })
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
