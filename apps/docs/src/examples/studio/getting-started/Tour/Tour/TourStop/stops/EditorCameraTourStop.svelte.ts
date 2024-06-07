import { useEditorCamera } from '@threlte/studio/extensions'
import { TourStop } from '../TourStop.svelte'
import { MaskDom } from '../../masks/mask-types/MaskDom.svelte'

export class EditorCameraTourStop extends TourStop {
  constructor() {
    const mask = new MaskDom('[aria-label="Editor Camera"]', 'circle', 2, true)
    super(mask)

    const editorCamera = useEditorCamera()

    $effect(() => {
      if (!this.isActive) return
      if (editorCamera.enabled) this.stopCompleted()
    })
  }
}
