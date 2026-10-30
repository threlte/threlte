import type { OmitProps, Props } from '@threlte/core'
import type { NodeMaterial } from 'three/webgpu'
import type { MeshLineMaterialOptions } from '../types.js'

export interface MeshLineMaterialWebGPUProps
  extends
    OmitProps<Props<NodeMaterial>, 'vertexNode' | 'colorNode' | 'opacityNode'>,
    MeshLineMaterialOptions {}
