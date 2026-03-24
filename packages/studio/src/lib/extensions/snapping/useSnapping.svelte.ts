import { useStudio } from '../../internal/extensions.js'
import { snappingScope, type SnappingActions, type SnappingState } from './types.js'

export const useSnapping = () => {
  const { useExtension } = useStudio()
  const extension = useExtension<SnappingState, SnappingActions>(snappingScope)

  return {
    /** @reactive */
    get enabled() {
      return extension.state.enabled
    },
    /** @reactive */
    get translate() {
      return extension.state.translate
    },
    /** @reactive */
    get rotate() {
      return extension.state.rotate
    },
    /** @reactive */
    get scale() {
      return extension.state.scale
    },
    setEnabled: extension.setEnabled,
    toggleEnabled: extension.toggleEnabled,
    setTranslate: extension.setTranslate,
    setRotate: extension.setRotate,
    setScale: extension.setScale
  }
}
