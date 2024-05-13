import { useStudio } from '../../internal/extensions'
import { spaceScope, type SpaceActions, type SpaceState } from './types'

export const useSpace = () => {
  const { useExtension } = useStudio()

  const extension = useExtension<SpaceState, SpaceActions>(spaceScope)

  const setSpace = (space: SpaceState['space']) => {
    extension.setSpace(space)
  }

  const toggleSpace = () => {
    extension.toggleSpace()
  }

  return {
    get space() {
      return extension.state.space
    },
    setSpace,
    toggleSpace
  }
}
