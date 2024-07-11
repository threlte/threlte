import { useObjectSelection } from '@threlte/studio/extensions'
import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'
import { MaskDom } from '../../../masks/mask-types/MaskDom.svelte'
import { TourStop } from '../../TourStop.svelte'

export class SceneHierarchyTourStop extends TourStop {
  constructor() {
    const mask = new MaskDom(
      () => {
        const xpath = "//div[text()='Scene Hierarchy']"
        const matchingElement = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue
        return matchingElement?.parentElement?.parentElement?.parentElement as Element
      },
      'rectangle',
      5,
      'mask'
    )

    const instructions = new InstructionsBasic({
      message: 'This is the Scene Hierarchy, it outlines the structure of your scene.',
      style: {
        tooltip: {
          placement: 'right'
        }
      },
      cta: 'Select the camera'
    })

    super(mask, instructions)

    const selection = useObjectSelection()

    $effect(() => {
      if (!this.isActive) return
      if (selection.selectedObjects.length !== 1) return
      const selectedObject = selection.selectedObjects[0]
      if (selectedObject?.name !== 'Camera') return
      this.stopCompleted()
    })
  }
}
