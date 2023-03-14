import { SvelteComponentTyped } from 'svelte'
import type { Camera, Object3D, Quaternion, Vector3 } from 'three'

export type TransformControlsEvents = {
  change: void
  'camera-changed': {
    type: 'camera-changed'
    value: Camera
  }
  'object-changed': {
    type: 'object-changed'
    value: Object3D
  }
  'enabled-changed': {
    type: 'enabled-changed'
    value: boolean
  }
  'axis-changed': {
    type: 'axis-changed'
    value: 'X' | 'Y' | 'Z' | 'E' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | 'XYZE' | null
  }
  'mode-changed': {
    type: 'mode-changed'
    value: 'translate' | 'rotate' | 'scale'
  }
  'translationSnap-changed': {
    type: 'translationSnap-changed'
    value: number
  }
  'rotationSnap-changed': {
    type: 'rotationSnap-changed'
    value: number
  }
  'scaleSnap-changed': {
    type: 'scaleSnap-changed'
    value: number
  }
  'space-changed': {
    type: 'space-changed'
    value: 'world' | 'local'
  }
  'size-changed': {
    type: 'size-changed'
    value: number
  }
  'dragging-changed': {
    type: 'dragging-changed'
    value: boolean
  }
  'showX-changed': {
    type: 'showX-changed'
    value: boolean
  }
  'showY-changed': {
    type: 'showY-changed'
    value: boolean
  }
  'showZ-changed': {
    type: 'showZ-changed'
    value: boolean
  }
  'worldPosition-changed': {
    type: 'worldPosition-changed'
    value: Vector3
  }
  'worldPositionStart-changed': {
    type: 'worldPositionStart-changed'
    value: Vector3
  }
  'worldQuaternion-changed': {
    type: 'worldQuaternion-changed'
    value: Quaternion
  }
  'worldQuaternionStart-changed': {
    type: 'worldQuaternionStart-changed'
    value: Quaternion
  }
  'cameraPosition-changed': {
    type: 'cameraPosition-changed'
    value: Vector3
  }
  'cameraQuaternion-changed': {
    type: 'cameraQuaternion-changed'
    value: Quaternion
  }
  'pointStart-changed': {
    type: 'pointStart-changed'
    value: Vector3
  }
  'pointEnd-changed': {
    type: 'pointEnd-changed'
    value: Vector3
  }
  'rotationAxis-changed': {
    type: 'rotationAxis-changed'
    value: Vector3
  }
  'rotationAngle-changed': {
    type: 'rotationAngle-changed'
    value: number
  }
  'eye-changed': {
    type: 'eye-changed'
    value: Vector3
  }
  mouseDown: void
  mouseUp: void
  objectChange: void
}

export type TransformControlsProps = {
  autoPauseOrbitControls?: boolean
  mode?: 'translate' | 'rotate' | 'scale' | undefined
  axis?: 'X' | 'Y' | 'Z' | 'E' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | 'XYZE' | null
  dragging?: boolean
  enabled?: boolean
  translationSnap?: number | null
  scaleSnap?: number | null
  rotationSnap?: number | null
  showX?: boolean
  showY?: boolean
  showZ?: boolean
  size?: number
  space?: 'world' | 'local' | undefined
}

export default class Grid extends SvelteComponentTyped<
  TransformControlsProps,
  TransformControlsEvents
> {}
