import type { Props, Stage } from '@threlte/core'
import type { Box3, Group } from 'three'

export type ResizeProps = Props<Group, [{ ref: Group; resize(): void }]> & {
  auto?: boolean
  axis?: 'x' | 'y' | 'z'
  box?: Box3
  precise?: boolean
  onresize?: () => void
  resize?: () => void
  stage?: Stage
}
