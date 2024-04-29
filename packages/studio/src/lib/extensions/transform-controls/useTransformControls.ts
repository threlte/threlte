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
    get inUse() {
      return extension.state.inUse
    }
  }
}
