import type { Props } from '@threlte/core'
import type { ShaderMaterial } from 'three'

export type MeshDiscardMaterialProps = Omit<
  Props<ShaderMaterial>,
  'fragmentShader' | 'vertexShader'
>
