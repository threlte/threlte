export const spaceScope = 'space'

export type SpaceState = {
  space: 'local' | 'world'
}

export type SpaceActions = {
  setSpace: (space: 'local' | 'world') => void
  toggleSpace: () => void
}
