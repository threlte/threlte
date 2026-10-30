import type { OmitProps, Props } from '@threlte/core'
import type { ShaderMaterial } from 'three'
import type { NodeMaterial } from 'three/webgpu'

export interface MeshDiscardMaterialProps extends OmitProps<
  Props<ShaderMaterial>,
  'fragmentShader' | 'vertexShader'
> {}

export interface MeshDiscardMaterialWebGPUProps extends OmitProps<
  Props<NodeMaterial>,
  'fragmentNode'
> {}
