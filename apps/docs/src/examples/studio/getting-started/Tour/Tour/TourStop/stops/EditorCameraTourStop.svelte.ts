import { useEditorCamera } from '@threlte/studio/extensions'
import { TourStop } from '../TourStop.svelte'
import { MaskDom } from '../../masks/mask-types/MaskDom.svelte'
import { InstructionsBasic } from '../../instructions/InstructionsBasic'

export class EditorCameraTourStop extends TourStop {
  constructor() {
    const instructions = new InstructionsBasic(
      "Enable the Editor Camera to freely move around the scene. The scene's default camera will be rendered in an additional pane."
    )
    const mask = new MaskDom('[aria-label="Editor Camera"]', 'rectangle', 4, 'mask')
    super(mask, instructions)

    const editorCamera = useEditorCamera()

    $effect(() => {
      if (!this.isActive) return
      if (editorCamera.enabled) this.stopCompleted()
    })
  }
}
