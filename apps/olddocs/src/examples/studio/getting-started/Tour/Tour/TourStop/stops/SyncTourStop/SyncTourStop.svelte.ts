import { InstructionsAdvanced } from '../../../instructions/instructions-types/advanced/InstructionsAdvanced'
import { MaskNone } from '../../../masks/mask-types/MaskNone'
import { ClickAnywhereTourStop } from '../../ClickAnywhereTourStop'
import SyncInstructions from './SyncInstructions.svelte'

export class SyncTourStop extends ClickAnywhereTourStop {
  constructor() {
    const mask = new MaskNone(true, true)
    const instructions = new InstructionsAdvanced(
      {
        component: SyncInstructions
      },
      {
        subtitle: {
          placement: 'center'
        }
      }
    )
    super(mask, instructions)
  }
}
