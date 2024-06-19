import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'
import { MaskDom } from '../../../masks/mask-types/MaskDom.svelte'
import { ClickAnywhereTourStop } from '../../ClickAnywhereTourStop'

export class JumpToCodeTourStop extends ClickAnywhereTourStop {
  constructor() {
    const mask = new MaskDom('[aria-label="Open In Editor"]', 'rectangle', 4, true)
    const instructions = new InstructionsBasic({
      message:
        "Click to jump directly to the code editor, where you can view and edit the selected object's code.",
      clickAnywhere: true,
      style: {
        tooltip: {
          placement: 'left'
        }
      }
    })
    super(mask, instructions)
  }
}
