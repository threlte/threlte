// Hooks
export { useCursor } from './hooks/useCursor'
export { useGltf } from './hooks/useGltf'
export { useGltfAnimations } from './hooks/useGltfAnimations'
export { useProgress } from './hooks/useProgress'

// abstractions
export { default as Edges } from './components/Edges/Edges.svelte'
export { default as HTML } from './components/HTML/HTML.svelte'
export { default as Float } from './components/Float/Float.svelte'
export { default as GLTF } from './components/GLTF/GLTF.svelte'
export { default as Spotlight } from './components/Spotlight/Spotlight.svelte'
export { default as Disposables } from './components/Disposables/Disposables.svelte'

// text component
export { default as Text } from './components/Text/Text.svelte'

export type {
	EdgesProperties,
	FloatProperties,
	HTMLProperties,
	TextProperties,
	GLTFProperties
} from './types/components'

export type { ThrelteGltf } from './types/types'
