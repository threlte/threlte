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
    extension.run('selectObjects', objects)
  }

  const clearSelection = () => {
    extension.run('clearSelection')
  }

  const addToSelection = (objects: Object3D[]) => {
    extension.run('addToSelection', objects)
  }

  const removeFromSelection = (objects: Object3D[]) => {
    extension.run('removeFromSelection', objects)
  }

  const toggleSelection = (objects: Object3D[]) => {
    extension.run('toggleSelection', objects)
  }

  const selectedObjects = $derived(extension.state.selectedObjects ?? [])

  return {
    get selectedObjects() {
      return selectedObjects
    },
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
