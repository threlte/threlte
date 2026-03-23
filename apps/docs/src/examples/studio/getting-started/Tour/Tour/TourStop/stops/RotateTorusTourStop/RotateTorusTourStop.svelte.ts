import { useThrelte } from '@threlte/core'
import { Mesh } from 'three'
import { MaskThreeObject } from '../../../masks/mask-types/MaskThreeObject.svelte'
import { TourStop } from '../../TourStop.svelte'
import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'
import { useObjectSelection, useTransformControls } from '@threlte/studio/extensions'

export class RotateTorusTourStop extends TourStop {
  private tcHGaveBeenInUse = $state(false)

  constructor() {
    const { scene } = useThrelte()
    const torus = scene.getObjectByName('Torus')
    if (!torus) throw new Error('Torus not found')
    if (!(torus instanceof Mesh)) throw new Error('Torus is not a Mesh')
    const mask = new MaskThreeObject(torus, 'circle', 0, 'mask', false, false)
    const instructions = new InstructionsBasic({
      message: 'Snapping is enabled, so the object will rotate in 15 degree increments.',
      cta: 'Rotate the Torus object'
    })
    super(mask, instructions)

    const tc = useTransformControls()
    const selection = useObjectSelection()

    $effect(() => {
      if (!this.isActive) return
      // reset the selection if the user selects something else
      if (selection.selectedObjects.length !== 1 || selection.selectedObjects[0] !== torus) {
        selection.clearSelection()
        selection.addToSelection([torus])
      }
    })

    const initialRotation = torus.rotation.clone()

    $effect(() => {
      if (!this.isActive) return
      if (tc.inUse && !this.tcHGaveBeenInUse) {
        this.tcHGaveBeenInUse = true
      }
    })

    $effect(() => {
      if (!this.isActive) return
      if (this.tcHGaveBeenInUse && !tc.inUse) {
        if (torus.rotation.equals(initialRotation)) return
        this.stopCompleted()
      }
    })
  }
}
