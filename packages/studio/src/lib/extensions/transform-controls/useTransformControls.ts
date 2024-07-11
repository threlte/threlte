import { useStudio } from '../../internal/extensions'
import {
  transformControlsScope,
  type TransformControlsActions,
  type TransformControlsState
} from './types'

export const useTransformControls = () => {
  const { useExtension } = useStudio()
  const extension = useExtension<Partial<TransformControlsState>, TransformControlsActions>(
    transformControlsScope
  )

  return {
    /** @reactive */
    get inUse() {
      return extension.state.inUse
    },
    get mode() {
      return extension.state.mode
    },
    setMode: extension.setMode,
    enable: extension.enable,
    disable: extension.disable,
    toggle: extension.toggle,
    translate: extension.translate,
    rotate: extension.rotate,
    scale: extension.scale
  }
}
