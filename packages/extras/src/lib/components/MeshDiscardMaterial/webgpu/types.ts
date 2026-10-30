import type { OmitProps, Props } from '@threlte/core'
import type { NodeMaterial } from 'three/webgpu'

export interface MeshDiscardMaterialWebGPUProps extends OmitProps<
  Props<NodeMaterial>,
  'fragmentNode'
> {}
