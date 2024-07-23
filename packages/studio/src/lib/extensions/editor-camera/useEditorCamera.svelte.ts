import { useStudio } from '../../internal/extensions'
import { editorCameraScope, type EditorCameraActions, type EditorCameraState } from './types'

export const useEditorCamera = () => {
  const { useExtension } = useStudio()

  const editorCamera = useExtension<EditorCameraState, EditorCameraActions>(editorCameraScope)

  return {
    get enabled() {
      return editorCamera.state.enabled
    }
  }
}
