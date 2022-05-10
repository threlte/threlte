import type {
  Audio,
  BufferGeometry,
  Camera,
  ColorRepresentation,
  Light,
  Material,
  Mesh,
  Object3D,
  PositionalAudio
} from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { Pass } from 'three/examples/jsm/postprocessing/Pass'
import type { LookAt, Position, Rotation, Scale, Text as TextType, ThrelteLayers } from './types'

export type HierarchicalObjectProperties = {
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

export type Object3DInstanceProperties = HierarchicalObjectProperties &
  LayerableObjectProperties &
  TransformableObjectProperties &
  ViewportAwareObjectProperties & {
    castShadow?: boolean
    receiveShadow?: boolean
    frustumCulled?: boolean
    renderOrder?: number
    visible?: boolean
  }

export type MeshInstanceProperties = Omit<Object3DInstanceProperties, 'object'> &
  Omit<InteractiveObjectProperties, 'object'> & {
    mesh: Mesh
  }

export type LightInstanceProperties = Omit<Object3DInstanceProperties, 'object'> & {
  light: Light
  color?: ColorRepresentation
  intensity?: number
}

export type CameraInstanceProperties = Omit<Object3DInstanceProperties, 'object'> & {
  camera: Camera
  useCamera: boolean
}

export type OrthographicCameraProperties = Omit<CameraInstanceProperties, 'camera'> & {
  near?: number
  far?: number
  zoom?: number
}

export type PerspectiveCameraProperties = Omit<CameraInstanceProperties, 'camera'> & {
  near?: number
  far?: number
  fov?: number
}

export type OrbitControlsProperties = {
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

export type PassProperties = {
  pass: Pass
}

export type AmbientLightProperties = Omit<LightInstanceProperties, 'light'>

export type DirectionalLightProperties = Omit<
  LightInstanceProperties,
  'light' | 'castShadow' | 'lookAt'
> & {
  target?: Position | Object3D
  shadow?:
    | boolean
    | {
        mapSize?: [number, number]
        camera?: {
          left?: number
          right?: number
          top?: number
          bottom?: number
          near?: number
          far?: number
        }
        bias?: number
        radius?: number
      }
}

export type HemisphereLightProperties = Omit<LightInstanceProperties, 'color' | 'light'> & {
  skyColor: LightInstanceProperties['color']
  groundColor?: ColorRepresentation
}

export type PointLightProperties = Omit<LightInstanceProperties, 'light' | 'castShadow'> & {
  distance?: number
  decay?: number
  power?: number
  shadow?:
    | boolean
    | {
        mapSize?: [number, number]
        camera?: { near?: number; far?: number }
        bias?: number
        radius?: number
      }
}

export type SpotLightProperties = Omit<
  LightInstanceProperties,
  'lookAt' | 'light' | 'castShadow'
> & {
  angle?: number
  decay?: number
  distance?: number
  penumbra?: number
  power?: number
  target?: Position | Object3D
  shadow?:
    | boolean
    | {
        mapSize?: [number, number]
        camera?: { near?: number; far?: number }
        bias?: number
        radius?: number
      }
}

export type FogProperties = {
  color: ColorRepresentation
  near?: number
  far?: number
}

export type FogExp2Properties = {
  color: ColorRepresentation
  density?: number
}

export type LayersProperties = {
  layers: ThrelteLayers
}

export type GLTFProperties = Omit<Object3DInstanceProperties, 'object'> & {
  url: string
  dracoDecoderPath?: string
  ktxTranscoderPath?: string
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
}

export type InstanceProperties = Omit<TransformableObjectProperties, 'object'> & {
  color?: ColorRepresentation
}

export type Object3DProperties = Omit<Object3DInstanceProperties, 'object'>

export type TextProperties = Omit<MeshInstanceProperties, 'mesh'> & {
  text?: TextType['text']
  anchorX?: TextType['anchorX']
  anchorY?: TextType['anchorY']
  curveRadius?: TextType['curveRadius']
  font?: TextType['font']
  fontSize?: TextType['fontSize']
  letterSpacing?: TextType['letterSpacing']
  lineHeight?: TextType['lineHeight']
  maxWidth?: TextType['maxWidth']
  overflowWrap?: TextType['overflowWrap']
  textAlign?: TextType['textAlign']
  textIndent?: TextType['textIndent']
  whiteSpace?: TextType['whiteSpace']
  material?: TextType['material'] | null
  color?: TextType['color']
  depthOffset?: TextType['depthOffset']
  clipRect?: TextType['clipRect']
  glyphGeometryDetail?: TextType['glyphGeometryDetail']
  sdfGlyphSize?: TextType['sdfGlyphSize']
  outlineWidth?: TextType['outlineWidth']
  outlineColor?: TextType['outlineColor']
  outlineOpacity?: TextType['outlineOpacity']
  outlineBlur?: TextType['outlineBlur']
  outlineOffsetX?: TextType['outlineOffsetX']
  outlineOffsetY?: TextType['outlineOffsetY']
  strokeWidth?: TextType['strokeWidth']
  strokeColor?: TextType['strokeColor']
  strokeOpacity?: TextType['strokeOpacity']
  fillOpacity?: TextType['fillOpacity']
}

export type AudioListenerProperties = Omit<Object3DInstanceProperties, 'object'> & {
  id?: string
}

export type AudioInstanceProperties = Omit<Object3DInstanceProperties, 'object'> & {
  audio: Audio | PositionalAudio
  autoplay?: boolean
  detune?: number
  buffer?: AudioBuffer
  url?: string
  volume?: number
  loop?: boolean
}

export type AudioProperties = Omit<AudioInstanceProperties, 'audio'> & {
  id?: string
}

export type PositionalAudioProperties = Omit<AudioInstanceProperties, 'audio'> & {
  id?: string
}
