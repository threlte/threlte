import { useStudio } from '../../internal/extensions.js'
import { editorCameraScope, type EditorCameraActions, type EditorCameraState } from './types.js'

export const useEditorCamera = () => {
  const { useExtension } = useStudio()

  const editorCamera = useExtension<EditorCameraState, EditorCameraActions>(editorCameraScope)

  return {
    get enabled() {
      return editorCamera.state.enabled
    }
  }
}
