import type {
  BufferGeometry,
  Camera,
  ColorRepresentation,
  Light,
  Material,
  Mesh,
  Object3D
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
  position: Position | undefined
  scale: Scale | undefined
  rotation: Rotation | undefined
  lookAt: LookAt | undefined
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
    castShadow: boolean | undefined
    receiveShadow: boolean | undefined
    frustumCulled: boolean | undefined
    renderOrder: number | undefined
  }

export type MeshInstanceProperties = Omit<Object3DInstanceProperties, 'object'> &
  Omit<InteractiveObjectProperties, 'object'> & {
    mesh: Mesh
  }

export type LightInstanceProperties = Omit<Object3DInstanceProperties, 'object'> & {
  light: Light
  color: ColorRepresentation | undefined
  intensity: number | undefined
}

export type CameraInstanceProperties = Omit<Object3DInstanceProperties, 'object'> & {
  camera: Camera
  useCamera: boolean
}

export type OrthographicCameraProperties = Omit<CameraInstanceProperties, 'camera'> & {
  near: number | undefined
  far: number | undefined
  zoom: number | undefined
}

export type PerspectiveCameraProperties = Omit<CameraInstanceProperties, 'camera'> & {
  near: number | undefined
  far: number | undefined
  fov: number | undefined
}

export type OrbitControlsProperties = {
  autoRotate: boolean | undefined
  autoRotateSpeed: number | undefined
  dampingFactor: number | undefined
  enableDamping: boolean | undefined
  enabled: boolean | undefined
  enablePan: boolean | undefined
  enableRotate: boolean | undefined
  enableZoom: boolean | undefined
  keyPanSpeed: number | undefined
  keys: OrbitControls['keys'] | undefined
  maxAzimuthAngle: number | undefined
  maxDistance: number | undefined
  maxPolarAngle: number | undefined
  maxZoom: number | undefined
  minAzimuthAngle: number | undefined
  minDistance: number | undefined
  minPolarAngle: number | undefined
  minZoom: number | undefined
  mouseButtons: OrbitControls['mouseButtons'] | undefined
  panSpeed: number | undefined
  rotateSpeed: number | undefined
  screenSpacePanning: boolean | undefined
  touches: OrbitControls['touches'] | undefined
  zoomSpeed: number | undefined
  target: TransformableObjectProperties['position'] | undefined
}

export type PassProperties = {
  pass: Pass
}

export type AmbientLightProperties = Omit<LightInstanceProperties, 'light'>

export type DirectionalLightProperties = Omit<
  LightInstanceProperties,
  'light' | 'castShadow' | 'lookAt'
> & {
  target: Position | Object3D | undefined
  shadow:
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
    | undefined
}

export type HemisphereLightProperties = Omit<LightInstanceProperties, 'color' | 'light'> & {
  skyColor: LightInstanceProperties['color']
  groundColor: ColorRepresentation | undefined
}

export type PointLightProperties = Omit<LightInstanceProperties, 'light' | 'castShadow'> & {
  distance: number | undefined
  decay: number | undefined
  power: number | undefined
  shadow:
    | boolean
    | {
        mapSize?: [number, number]
        camera?: { near?: number; far?: number }
        bias?: number
        radius?: number
      }
    | undefined
}

export type SpotLightProperties = Omit<
  LightInstanceProperties,
  'lookAt' | 'light' | 'castShadow'
> & {
  angle: number | undefined
  decay: number | undefined
  distance: number | undefined
  penumbra: number | undefined
  power: number | undefined
  target: LookAt | undefined
  shadow:
    | boolean
    | {
        mapSize?: [number, number]
        camera?: { near?: number; far?: number }
        bias?: number
        radius?: number
      }
    | undefined
}

export type FogProperties = {
  color: ColorRepresentation
  near: number | undefined
  far: number | undefined
}

export type FogExp2Properties = {
  color: ColorRepresentation
  density: number | undefined
}

export type LayersProperties = {
  layers: ThrelteLayers
}

export type GLTFProperties = Omit<Object3DInstanceProperties, 'object'> & {
  url: string
  dracoDecoderPath: string | undefined
  ktxTranscoderPath: string | undefined
}

export type GroupProperties = Omit<Object3DInstanceProperties, 'object'>

export type MeshProperties = Omit<MeshInstanceProperties, 'mesh'> & {
  geometry: BufferGeometry
  material: Material | Material[]
}

export type Object3DProperties = Omit<Object3DInstanceProperties, 'object'>

export type TextProperties = Omit<MeshInstanceProperties, 'mesh'> & {
  text: TextType['text'] | undefined
  anchorX: TextType['anchorX'] | undefined
  anchorY: TextType['anchorY'] | undefined
  curveRadius: TextType['curveRadius'] | undefined
  font: TextType['font'] | undefined
  fontSize: TextType['fontSize'] | undefined
  letterSpacing: TextType['letterSpacing'] | undefined
  lineHeight: TextType['lineHeight'] | undefined
  maxWidth: TextType['maxWidth'] | undefined
  overflowWrap: TextType['overflowWrap'] | undefined
  textAlign: TextType['textAlign'] | undefined
  textIndent: TextType['textIndent'] | undefined
  whiteSpace: TextType['whiteSpace'] | undefined
  material: TextType['material'] | undefined | null
  color: TextType['color'] | undefined
  depthOffset: TextType['depthOffset'] | undefined
  clipRect: TextType['clipRect'] | undefined
  glyphGeometryDetail: TextType['glyphGeometryDetail'] | undefined
  sdfGlyphSize: TextType['sdfGlyphSize'] | undefined
  outlineWidth: TextType['outlineWidth'] | undefined
  outlineColor: TextType['outlineColor'] | undefined
  outlineOpacity: TextType['outlineOpacity'] | undefined
  outlineBlur: TextType['outlineBlur'] | undefined
  outlineOffsetX: TextType['outlineOffsetX'] | undefined
  outlineOffsetY: TextType['outlineOffsetY'] | undefined
  strokeWidth: TextType['strokeWidth'] | undefined
  strokeColor: TextType['strokeColor'] | undefined
  strokeOpacity: TextType['strokeOpacity'] | undefined
  fillOpacity: TextType['fillOpacity'] | undefined
}
