import type { MarchingCube } from './MarchingCube'
import type { MarchingCubes } from 'three/examples/jsm/Addons.js'
import type { MarchingPlane } from './MarchingPlane'
import type { Props } from '@threlte/core'

export type AddAxisMap = {
  [K in keyof MarchingCubes as K extends `addPlane${infer Axis}` ? Lowercase<Axis> : never]: K
}

export type MarchingPlaneAxis = keyof AddAxisMap

export type MarchingPlaneProps = Props<MarchingPlane>
export type MarchingCubeProps = Props<MarchingCube>
