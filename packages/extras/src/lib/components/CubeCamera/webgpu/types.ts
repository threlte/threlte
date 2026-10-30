import type { Props } from '@threlte/core'
import type { CubeCamera, CubeRenderTarget, Group } from 'three/webgpu'
import type { CubeCameraChildrenArgs, CubeCameraOptions } from '../types.js'

export interface CubeCameraWebGPUProps
  extends Props<Group, CubeCameraChildrenArgs<CubeCamera, CubeRenderTarget>>, CubeCameraOptions {}
