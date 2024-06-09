import { InstructionsBasic } from '../../instructions/InstructionsBasic'
import { MaskNone } from '../../masks/mask-types/MaskNone'
import { ClickAnywhereTourStop } from '../ClickAnywhereTourStop'

export class OutroTourStop extends ClickAnywhereTourStop {
  constructor() {
    const mask = new MaskNone(true, true)
    const instructions = new InstructionsBasic(
      'Congratulations! You have completed the Threlte Studio Tour. Click anywhere to finish. Feel free to explore the studio, reload this page to reset.'
    )
    super(mask, instructions)
  }
}
