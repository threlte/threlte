import type { Props } from '@threlte/core'
import type { MeshStandardMaterial } from 'three'
import type CustomShaderMaterial from 'three-custom-shader-material/vanilla'

export type DissolveMaterialProps = Props<CustomShaderMaterial<typeof MeshStandardMaterial>> & {
  progress: number
  scale: number
}
