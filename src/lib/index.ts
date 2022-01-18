// canvas
export { default as Canvas } from './Canvas.svelte'
export type { CanvasProps } from './Canvas.svelte'

// cameras
export { default as OrthographicCamera } from './cameras/OrthographicCamera.svelte'
export type { OrthographicCameraProps } from './cameras/OrthographicCamera.svelte'
export { default as PerspectiveCamera } from './cameras/PerspectiveCamera.svelte'
export type { PerspectiveCameraProps } from './cameras/PerspectiveCamera.svelte'

// controls
export { default as OrbitControls } from './controls/OrbitControls.svelte'
export type { OrbitControlsProps } from './controls/OrbitControls.svelte'

// effects
export { default as Pass } from './effects/Pass.svelte'
export type { PassProps } from './effects/Pass.svelte'

// lights
export { default as AmbientLight } from './lights/AmbientLight.svelte'
export type { AmbientLightProps } from './lights/AmbientLight.svelte'
export { default as DirectionalLight } from './lights/DirectionalLight.svelte'
export type { DirectionalLightProps } from './lights/DirectionalLight.svelte'
export { default as PointLight } from './lights/PointLight.svelte'
export type { PointLightProps } from './lights/PointLight.svelte'
export { default as HemisphereLight } from './lights/HemisphereLight.svelte'
export type { HemisphereLightProps } from './lights/HemisphereLight.svelte'
export { default as SpotLight } from './lights/SpotLight.svelte'
export type { SpotLightProps } from './lights/SpotLight.svelte'

// misc
export { default as Fog } from './misc/Fog.svelte'
export type { FogProps } from './misc/Fog.svelte'
export { default as FogExp2 } from './misc/FogExp2.svelte'
export type { FogExp2Props } from './misc/FogExp2.svelte'
export { default as Layers } from './misc/Layers.svelte'
export type { LayersProps } from './misc/Layers.svelte'

// objects
export { default as Mesh } from './objects/Mesh.svelte'
export type { MeshProps } from './objects/Mesh.svelte'
export { default as Group } from './objects/Group.svelte'
export type { GroupProps } from './objects/Group.svelte'
export { default as Object3D } from './objects/Object3D.svelte'
export type { Object3DProps } from './objects/Object3D.svelte'
export { default as GLTF } from './objects/GLTF.svelte'
export type { GLTFProps } from './objects/GLTF.svelte'

// text
export { default as Text } from './text/Text.svelte'
export type { TextProps } from './text/Text.svelte'

// instances
export { default as MeshInstance } from './instances/MeshInstance.svelte'
export type { MeshInstanceProps } from './instances/MeshInstance.svelte'
export { default as Object3DInstance } from './instances/Object3DInstance.svelte'
export type { Object3DInstanceProps } from './instances/Object3DInstance.svelte'
export { default as LightInstance } from './instances/LightInstance.svelte'
export type { LightInstanceProps } from './instances/LightInstance.svelte'
export { default as CameraInstance } from './instances/CameraInstance.svelte'
export type { CameraInstanceProps } from './instances/CameraInstance.svelte'

// utils
export { useFrame } from './hooks/useFrame'
export { useThrelte } from './hooks/useThrelte'
export { useThrelteRoot } from './hooks/useThrelteRoot'
export { useLoader } from './hooks/useLoader'
export { useTexture } from './hooks/useTexture'
export type {
  Position,
  Scale,
  Rotation,
  LookAt,
  ThrelteUseFrameOptions,
  ThrelteContext,
  ThrelteRootContext,
  ThrelteLayers,
  ThrelteUseLoader
} from './types/types'
