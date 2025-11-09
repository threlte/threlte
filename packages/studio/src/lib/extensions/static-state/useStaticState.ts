import { useStudio } from '../../extend'
import { staticStateScope, type StaticStateActions, type StaticStateState } from './types'

export const useStaticState = () => {
  const { useExtension } = useStudio()

  const extension = useExtension<StaticStateState, StaticStateActions>(staticStateScope)

  return {
    toggleEditor() {
      return extension.toggleEditor()
    },
    enableEditor() {
      return extension.enableEditor()
    },
    disableEditor() {
      return extension.disableEditor()
    },
    get editorEnabled() {
      return extension.state.editorEnabled
    }
  }
}
