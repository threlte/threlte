import type {
  Audio,
  BufferGeometry,
  Camera,
  ColorRepresentation,
  Material,
  Mesh,
  Object3D,
  PositionalAudio
} from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { Pass } from 'three/examples/jsm/postprocessing/Pass'
import type { SetOptional } from 'type-fest'
import type { LookAt, Position, Rotation, Scale, ThrelteLayers } from './types'

export type HierarchicalObjectProperties = {
  object?: Object3D
  onChildMount?: (child: Object3D) => void
  onChildDestroy?: (child: Object3D) => void
}

export type DisposableThreeObject = {
  dispose?: () => void
  type?: string
} & Record<string, any>

export type DisposableObjectProperties = {
  object?: DisposableThreeObject
  dispose?: boolean
}

export type SceneGraphObjectProperties = {
  object: Object3D
}

export type InteractiveObjectProperties = {
  object: Object3D
  interactive: boolean
  ignorePointer: boolean
}

export type LayerableObjectProperties = {
  object: Object3D
}

export type TransformableObjectProperties = {
  object: Object3D
  position?: Position
  scale?: Scale
  rotation?: Rotation
  lookAt?: LookAt
}

export type ViewportAwareObjectProperties = {
  object: Object3D
  viewportAware: boolean
  /**
   * Use as a binding.
   */
  inViewport: boolean
}

export type Object3DInstanceProperties = SceneGraphObjectProperties &
  LayerableObjectProperties &
  TransformableObjectProperties &
  ViewportAwareObjectProperties &
  DisposableObjectProperties & {
    castShadow?: boolean
    receiveShadow?: boolean
    frustumCulled?: boolean
    renderOrder?: number
    visible?: boolean
    userData?: Record<string, any>
  }

export type MeshInstanceProperties = Omit<Object3DInstanceProperties, 'object'> &
  Omit<InteractiveObjectProperties, 'object'> & {
    mesh: Mesh
  }

export type CameraInstanceProperties = Omit<Object3DInstanceProperties, 'object'> & {
  camera: Camera
  useCamera: boolean
}

export type OrthographicCameraProperties = Omit<CameraInstanceProperties, 'camera'> & {
  near?: number
  far?: number
  left?: number
  right?: number
  top?: number
  bottom?: number
  zoom?: number
}

export type PerspectiveCameraProperties = Omit<CameraInstanceProperties, 'camera'> & {
  near?: number
  far?: number
  fov?: number
}

export type OrbitControlsProperties = {
  dispose?: boolean
  autoRotate?: boolean
  autoRotateSpeed?: number
  dampingFactor?: number
  enableDamping?: boolean
  enabled?: boolean
  enablePan?: boolean
  enableRotate?: boolean
  enableZoom?: boolean
  keyPanSpeed?: number
  keys?: OrbitControls['keys']
  maxAzimuthAngle?: number
  maxDistance?: number
  maxPolarAngle?: number
  maxZoom?: number
  minAzimuthAngle?: number
  minDistance?: number
  minPolarAngle?: number
  minZoom?: number
  mouseButtons?: OrbitControls['mouseButtons']
  panSpeed?: number
  rotateSpeed?: number
  screenSpacePanning?: boolean
  touches?: OrbitControls['touches']
  zoomSpeed?: number
  target?: TransformableObjectProperties['position']
}

export type TransformControlsProperties = {
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
  dispose?: boolean
}

export type PassProperties = {
  pass: Pass
}

export type LayersProperties = {
  layers: ThrelteLayers
}

export type GroupProperties = Omit<Object3DInstanceProperties, 'object'>

export type MeshProperties = Omit<MeshInstanceProperties, 'mesh'> & {
  geometry: BufferGeometry
  material: Material | Material[]
}

export type InstancedMeshProperties = Omit<MeshInstanceProperties, 'mesh' | 'frustumCulled'> & {
  geometry: BufferGeometry
  material: Material | Material[]
  count?: number
  id?: string
}

export type InstanceProperties = Omit<TransformableObjectProperties, 'object'> & {
  color?: ColorRepresentation
  id?: string
}

export type Object3DProperties = Omit<Object3DInstanceProperties, 'object'>

export type AudioListenerProperties = Omit<Object3DInstanceProperties, 'object'> & {
  id?: string
  masterVolume?: number
}

type AudioSource = string | AudioBuffer | HTMLMediaElement | AudioBufferSourceNode | MediaStream

export type AudioInstanceProperties<T extends Audio<GainNode> | PositionalAudio> = Omit<
  Object3DInstanceProperties,
  'object'
> & {
  audio: T
  autoplay?: boolean
  detune?: number
  source?: AudioSource
  volume?: number
  loop?: boolean
  filters?: BiquadFilterNode[] | BiquadFilterNode
  playbackRate?: number
  // TODO unknown is used here to be able to directly use
  // the function in a svelte event handler: on:click={play}
  // as otherwise TypeScript will complain about the type
  // of the argument 'delay'. It's not a perfect solution though.
  play: (delay?: number | any) => Promise<T>
  pause: () => T
  stop: () => T
}

export type AudioProperties = Omit<
  SetOptional<AudioInstanceProperties<Audio>, 'play' | 'pause' | 'stop'>,
  'audio'
> & {
  id?: string
}

export type PositionalAudioProperties = Omit<
  SetOptional<AudioInstanceProperties<PositionalAudio>, 'play' | 'pause' | 'stop'>,
  'audio'
> & {
  id?: string
  refDistance?: number
  rolloffFactor?: number
  distanceModel?: string
  maxDistance?: number
  directionalCone?: {
    coneInnerAngle: number
    coneOuterAngle: number
    coneOuterGain: number
  }
}
