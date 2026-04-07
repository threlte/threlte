import { useStudio } from '../../internal/extensions.js'
import {
  objectSelectionScope,
  type ObjectSelectionActions,
  type ObjectSelectionState
} from './types.js'

export const useObjectSelection = () => {
  const { useExtension } = useStudio()
  const extension = useExtension<ObjectSelectionState, ObjectSelectionActions>(objectSelectionScope)

  const selectedObjects = $derived(extension.state.selectedObjects ?? [])

  return {
    /** @reactive */
    get selectedObjects() {
      return selectedObjects
    },
    /** @reactive */
    get inUse() {
      return extension.state.inUse
    },
    selectObjects: extension.selectObjects,
    clearSelection: extension.clearSelection,
    addToSelection: extension.addToSelection,
    removeFromSelection: extension.removeFromSelection,
    toggleSelection: extension.toggleSelection
  }
}
