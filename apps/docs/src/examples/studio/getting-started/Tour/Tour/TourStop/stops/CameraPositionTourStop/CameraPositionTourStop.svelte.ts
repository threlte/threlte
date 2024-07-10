import { useTask, useThrelte } from '@threlte/core'
import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'
import { MaskDom } from '../../../masks/mask-types/MaskDom.svelte'
import { TourStop } from '../../TourStop.svelte'
import type { Camera } from 'three'

export class CameraPositionTourStop extends TourStop {
  constructor() {
    const mask = new MaskDom(
      () => {
        const xpath = "//div[text()='position']"
        const matchingElement = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue
        return matchingElement?.parentElement?.querySelector(
          '.tp-pndtxtv_a:nth-child(2)'
        ) as Element
      },
      'rectangle',
      5,
      'mask'
    )

    const instructions = new InstructionsBasic({
      message: 'Use the Inspector to manually set properties of the selected objects.',
      cta: "Set the camera's position to 1",
      style: {
        tooltip: {
          placement: 'left'
        }
      }
    })

    super(mask, instructions)

    const { scene } = useThrelte()
    const camera = scene.getObjectByName('Camera') as Camera

    useTask(() => {
      if (!this.isActive) return

      if (camera.position.y === 1) {
        this.stopCompleted()
      }
    })
  }
}
