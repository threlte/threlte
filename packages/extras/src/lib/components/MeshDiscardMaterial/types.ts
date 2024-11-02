import type { Props } from '@threlte/core'
import type { ShaderMaterial } from 'three'

export type MeshDiscardMaterialProps = Props<
  Omit<ShaderMaterial, 'fragmentShader' | 'vertexShader'>
>
