import type { Object3D } from 'three'
import { useStudio } from '../../internal/extensions'
import {
  objectSelectionScope,
  type ObjectSelectionActions,
  type ObjectSelectionState
} from './types'

export const useObjectSelection = () => {
  const { useExtension } = useStudio()
  const extension = useExtension<ObjectSelectionState, ObjectSelectionActions>(objectSelectionScope)

  const selectObjects = (objects: Object3D[]) => {
    extension.selectObjects(objects)
  }

  const clearSelection = () => {
    extension.clearSelection()
  }

  const addToSelection = (objects: Object3D[]) => {
    extension.addToSelection(objects)
  }

  const removeFromSelection = (objects: Object3D[]) => {
    extension.removeFromSelection(objects)
  }

  const toggleSelection = (objects: Object3D[]) => {
    extension.toggleSelection(objects)
  }

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
    selectObjects,
    clearSelection,
    addToSelection,
    removeFromSelection,
    toggleSelection
  }
}
