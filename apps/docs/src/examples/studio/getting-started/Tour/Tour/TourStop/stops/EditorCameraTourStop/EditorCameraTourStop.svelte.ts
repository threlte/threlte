import { useEditorCamera } from '@threlte/studio/extensions'
import { TourStop } from '../../TourStop.svelte'
import { MaskDom } from '../../../masks/mask-types/MaskDom.svelte'
import { InstructionsBasic } from '../../../instructions/instructions-types/basic/InstructionsBasic'

export class EditorCameraTourStop extends TourStop {
  constructor() {
    const instructions = new InstructionsBasic({
      message:
        "Freely move around the scene with the Editor Camera. The scene's default camera will be rendered in an additional pane.",
      cta: 'Enable the Editor Camera'
    })
    const mask = new MaskDom('[aria-label="Editor Camera"]', 'rectangle', 4, 'mask')
    super(mask, instructions)

    const editorCamera = useEditorCamera()

    $effect(() => {
      if (!this.isActive) return
      if (editorCamera.enabled) this.stopCompleted()
    })
  }
}
