import { useStudio } from '../../internal/extensions'
import { snappingScope, type SnappingActions, type SnappingState } from './types'

export const useSnapping = () => {
  const { useExtension } = useStudio()

  const extension = useExtension<SnappingState, SnappingActions>(snappingScope)

  const setEnabled = (enabled: boolean) => {
    extension.setEnabled(enabled)
  }

  const toggleEnabled = () => {
    extension.toggleEnabled()
  }

  const setTranslate = (translate: number) => {
    extension.setTranslate(translate)
  }

  const setRotate = (rotate: number) => {
    extension.setRotate(rotate)
    extension.setRotate(rotate)
  }

  const setScale = (scale: number) => {
    extension.setScale(scale)
  }

  return {
    get enabled() {
      return extension.state.enabled
    },
    get translate() {
      return extension.state.translate
    },
    get rotate() {
      return extension.state.rotate
    },
    get scale() {
      return extension.state.scale
    },
    setEnabled,
    toggleEnabled,
    setTranslate,
    setRotate,
    setScale
  }
}
