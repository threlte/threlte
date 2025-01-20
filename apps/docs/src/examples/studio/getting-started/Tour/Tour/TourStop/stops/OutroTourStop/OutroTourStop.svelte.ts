import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'
import { MaskNone } from '../../../masks/mask-types/MaskNone'
import { ClickAnywhereTourStop } from '../../ClickAnywhereTourStop'

export class OutroTourStop extends ClickAnywhereTourStop {
  constructor() {
    const mask = new MaskNone(true, true)
    const instructions = new InstructionsBasic({
      headline: 'Congratulations!',
      message: 'You have completed the Threlte Studio Tour. Feel free to explore and experiment.',
      tip: 'This demo environment is not persisting any settings, changes, or data. Reload the page to reset the environment.',
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
