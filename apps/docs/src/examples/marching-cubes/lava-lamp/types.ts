import type { MarchingCubes } from 'three/examples/jsm/Addons.js'

export type AddAxisMap = {
  [K in keyof MarchingCubes as K extends `addPlane${infer Axis}` ? Lowercase<Axis> : never]: K
}

export type MarchingPlaneAxis = keyof AddAxisMap
