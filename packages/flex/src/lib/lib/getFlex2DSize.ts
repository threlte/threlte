import type { FlexPlane } from './props.js'

export function getFlex2DSize(sizes: [number, number, number], plane: FlexPlane) {
  switch (plane) {
    case 'xy':
      return [sizes[0], sizes[1]]
    case 'yz':
      return [sizes[1], sizes[2]]
    case 'xz':
      return [sizes[0], sizes[2]]
  }
}
