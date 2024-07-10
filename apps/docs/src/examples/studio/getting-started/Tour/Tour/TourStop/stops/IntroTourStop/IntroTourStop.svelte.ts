import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'
import { MaskNone } from '../../../masks/mask-types/MaskNone'
import { ClickAnywhereTourStop } from '../../ClickAnywhereTourStop'

export class IntroTourStop extends ClickAnywhereTourStop {
  constructor() {
    const mask = new MaskNone(true, false)
    const instructions = new InstructionsBasic({
      headline: 'Threlte Studio',
      message:
        'Welcome to the Threlte Studio Guided Tour! This tour will guide you through the various features and functionalities of the Threlte Studio. Get ready to explore and learn!',
      clickAnywhere: true,
      style: {
        subtitle: {
          placement: 'center'
        }
      }
    })
    super(mask, instructions)
  }
}
