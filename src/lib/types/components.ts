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

export type HierarchicalObjectProps = {
  object: Object3D
}

export type InteractiveObjectProps = {
  object: Object3D
  interactive: boolean
  ignorePointer: boolean
}

export type LayerableObjectProps = {
  object: Object3D
}

export type TransformableObjectProps = {
  object: Object3D
  position: Position | undefined
  scale: Scale | undefined
  rotation: Rotation | undefined
  lookAt: LookAt | undefined
}

export type ViewportAwareObjectProps = {
  object: Object3D
  viewportAware: boolean
  /**
   * Use as a binding.
   */
  inViewport: boolean
}

export type Object3DInstanceProps = HierarchicalObjectProps &
  LayerableObjectProps &
  TransformableObjectProps &
  ViewportAwareObjectProps & {
    castShadow: boolean | undefined
    receiveShadow: boolean | undefined
    frustumCulled: boolean | undefined
    renderOrder: number | undefined
  }

export type MeshInstanceProps = Omit<Object3DInstanceProps, 'object'> &
  Omit<InteractiveObjectProps, 'object'> & {
    mesh: Mesh
  }

export type LightInstanceProps = Omit<Object3DInstanceProps, 'object'> & {
  light: Light
  color: ColorRepresentation | undefined
  intensity: number | undefined
}

export type CameraInstanceProps = Omit<Object3DInstanceProps, 'object'> & {
  camera: Camera
  useCamera: boolean
}

export type OrthographicCameraProps = Omit<CameraInstanceProps, 'camera'> & {
  near: number
  far: number
  zoom: number
}

export type PerspectiveCameraProps = Omit<CameraInstanceProps, 'camera'> & {
  near: number
  far: number
  fov: number
}

export type OrbitControlsProps = {
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
  target: TransformableObjectProps['position'] | undefined
}

export type PassProps = {
  pass: Pass
}

export type AmbientLightProps = Omit<LightInstanceProps, 'light'>

export type DirectionalLightProps = Omit<LightInstanceProps, 'light' | 'castShadow'> & {
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

export type HemisphereLightProps = Omit<LightInstanceProps, 'color' | 'light'> & {
  skyColor: LightInstanceProps['color']
  groundColor: ColorRepresentation | undefined
}

export type PointLightProps = Omit<LightInstanceProps, 'light' | 'castShadow'> & {
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

export type SpotLightProps = Omit<LightInstanceProps, 'lookAt' | 'light' | 'castShadow'> & {
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

export type FogProps = {
  color: ColorRepresentation
  near: number | undefined
  far: number | undefined
}

export type FogExp2Props = {
  color: ColorRepresentation
  density: number | undefined
}

export type LayersProps = {
  layers: ThrelteLayers | undefined
}

export type GLTFProps = Omit<Object3DInstanceProps, 'object'> & {
  url: string
  dracoDecoderPath: string | undefined
  ktxTranscoderPath: string | undefined
}

export type GroupProps = Omit<Object3DInstanceProps, 'object'>

export type MeshProps = Omit<MeshInstanceProps, 'mesh'> & {
  geometry: BufferGeometry
  material: Material | Material[]
}

export type Object3DProps = Omit<Object3DInstanceProps, 'object'>

export type TextProps = Omit<MeshInstanceProps, 'mesh'> & {
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
