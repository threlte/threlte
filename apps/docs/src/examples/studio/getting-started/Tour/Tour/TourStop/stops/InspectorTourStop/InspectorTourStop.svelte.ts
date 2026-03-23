import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'
import { MaskDom } from '../../../masks/mask-types/MaskDom.svelte'
import { ClickAnywhereTourStop } from '../../ClickAnywhereTourStop'

export class InspectorTourStop extends ClickAnywhereTourStop {
  constructor() {
    const mask = new MaskDom(
      () => {
        const xpath = "//div[text()='Camera (PerspectiveCamera)']"
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
      true
    )

    const instructions = new InstructionsBasic({
      message:
        'This is the Inspector. It displays the properties of the selected object based on the type of the object.',
      tip: 'Rotation values are automatically converted to degrees for your convenience.',
      style: {
        tooltip: {
          placement: 'left'
        }
      },
      clickAnywhere: true
    })

    super(mask, instructions)
  }
}
