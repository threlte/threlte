import type { OmitProps, Props } from '@threlte/core'
import type { ShaderMaterial } from 'three'

export interface MeshDiscardMaterialProps extends OmitProps<
  Props<ShaderMaterial>,
  'fragmentShader' | 'vertexShader'
> {}
