import type { OmitProps, Props } from '@threlte/core/webgpu'
import type { NodeMaterial } from 'three/webgpu'

export interface MeshDiscardMaterialWebGPUProps extends OmitProps<
  Props<NodeMaterial>,
  'fragmentNode'
> {}
