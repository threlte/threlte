import type { FlexPlane } from '../types/types'

export function getDepthAxis(plane: FlexPlane) {
  switch (plane) {
    case 'xy':
      return 'z'
    case 'yz':
      return 'x'
    case 'xz':
      return 'y'
  }
}
