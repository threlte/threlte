import { InstructionsBasic } from '../../instructions/instructions-types/basic/InstructionsBasic'
import { MaskNone } from '../../masks/mask-types/MaskNone'
import { ClickAnywhereTourStop } from '../ClickAnywhereTourStop'

export class IntroTourStop extends ClickAnywhereTourStop {
  constructor() {
    const mask = new MaskNone(true, false)
    const instructions = new InstructionsBasic(
      'Welcome to the Threlte Studio Tour! Click anywhere to continue.'
    )
    super(mask, instructions)
  }
}
