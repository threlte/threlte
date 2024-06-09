import { InstructionsBasic } from '../../instructions/instructions-types/basic/InstructionsBasic'
import { MaskNone } from '../../masks/mask-types/MaskNone'
import { ClickAnywhereTourStop } from '../ClickAnywhereTourStop'

export class SyncTourStop extends ClickAnywhereTourStop {
  constructor() {
    const mask = new MaskNone(true, true)
    const instructions = new InstructionsBasic(
      'All changes made to your objects are persisted back to your code in real-time (limitations apply).'
    )
    super(mask, instructions)
  }
}
