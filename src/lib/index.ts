// canvas
export { default as Canvas } from './Canvas.svelte'

// cameras
export { default as OrthographicCamera } from './cameras/OrthographicCamera.svelte'
export { default as PerspectiveCamera } from './cameras/PerspectiveCamera.svelte'

// controls
export { default as OrbitControls } from './controls/OrbitControls.svelte'

// effects
export { default as Pass } from './effects/Pass.svelte'

// lights
export { default as AmbientLight } from './lights/AmbientLight.svelte'
export { default as DirectionalLight } from './lights/DirectionalLight.svelte'
export { default as PointLight } from './lights/PointLight.svelte'
export { default as HemisphereLight } from './lights/HemisphereLight.svelte'
export { default as SpotLight } from './lights/SpotLight.svelte'

// misc
export { default as Fog } from './misc/Fog.svelte'
export { default as FogExp2 } from './misc/FogExp2.svelte'
export { default as Layers } from './misc/Layers.svelte'

// objects
export { default as Mesh } from './objects/Mesh.svelte'
export { default as Group } from './objects/Group.svelte'
export { default as Object3D } from './objects/Object3D.svelte'
export { default as Gltf } from './objects/Gltf.svelte'

// text
export { default as Text } from './text/Text.svelte'

// instances
export { default as MeshInstance } from './instances/MeshInstance.svelte'
export { default as Object3DInstance } from './instances/Object3DInstance.svelte'
export { default as LightInstance } from './instances/LightInstance.svelte'
export { default as CameraInstance } from './instances/CameraInstance.svelte'

// utils
export { useFrame } from './hooks/useFrame'
export { useThrelte } from './hooks/useThrelte'
export { useThrelteRoot } from './hooks/useThrelteRoot'
export { useTexture } from './hooks/useTexture'
export type {
  Position,
  Scale,
  Rotation,
  ThrelteContext,
  ThrelteRootContext,
  ThrelteLayers
} from './types/types'
