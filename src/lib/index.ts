// canvas
export { default as Canvas } from './Canvas.svelte'

// cameras
export { default as OrthographicCamera } from './cameras/OrthographicCamera.svelte'
export { default as PerspectiveCamera } from './cameras/PerspectiveCamera.svelte'

// controls
export { default as OrbitControls } from './controls/OrbitControls.svelte'

// objects
export { default as Mesh } from './objects/Mesh.svelte'
export { default as Group } from './objects/Group.svelte'
export { default as Object3D } from './instances/Object3DInstance.svelte'

// misc
export { default as Fog } from './misc/Fog.svelte'
export { default as FogExp2 } from './misc/FogExp2.svelte'
export { default as Layer } from './misc/Layer.svelte'

// text
export { default as Text } from './text/Text.svelte'

// lights
export { default as AmbientLight } from './lights/AmbientLight.svelte'
export { default as DirectionalLight } from './lights/DirectionalLight.svelte'
export { default as PointLight } from './lights/PointLight.svelte'

// effects
export { default as Pass } from './effects/Pass.svelte'

// utils
export { useFrame } from './lib/useFrame'
export { useThrelte } from './lib/useThrelte'
export { useThrelteRoot } from './lib/useThrelteRoot'
export { useTexture } from './lib/useTexture'
export type {
	PositionProp,
	ScaleProp,
	RotationProp,
	ThrelteContext,
	ThrelteRootContext
} from './lib/types'
