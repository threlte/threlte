import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'
import { MaskDom } from '../../../masks/mask-types/MaskDom.svelte'
import { ClickAnywhereTourStop } from '../../ClickAnywhereTourStop'

export class ToolbarTourStop extends ClickAnywhereTourStop {
  constructor() {
    const mask = new MaskDom(
      () => {
        const xpath = "//div[text()='Threlte Studio']"
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
      4,
      true
    )

    const instructions = new InstructionsBasic({
      message:
        'This is the Toolbar. Change the working space, toggle snapping, and more from here.',
      style: {
        tooltip: {
          placement: 'bottom'
        }
      },
      tip: 'Customize the toolbar by extending the Studio with your own tools.',
      clickAnywhere: true
    })

    super(mask, instructions)
  }
}
