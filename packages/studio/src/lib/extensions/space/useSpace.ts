import { useStudio } from '../../internal/extensions'
import { spaceScope, type SpaceActions, type SpaceState } from './types'

export const useSpace = () => {
  const { useExtension } = useStudio()
  const extension = useExtension<SpaceState, SpaceActions>(spaceScope)

  return {
    /** @reactive */
    get space() {
      return extension.state.space
    },
    setSpace: extension.setSpace,
    toggleSpace: extension.toggleSpace
  }
}
