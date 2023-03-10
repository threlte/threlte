// Hooks
export { useCursor } from './hooks/useCursor'
export { useGltf } from './hooks/useGltf'
export { useGltfAnimations } from './hooks/useGltfAnimations'
export { useProgress } from './hooks/useProgress'
export { useTexture } from './hooks/useTexture'

// abstractions
export { default as Edges } from './components/Edges/Edges.svelte'
export { default as HTML } from './components/HTML/HTML.svelte'
export { default as Float } from './components/Float/Float.svelte'
export { default as GLTF } from './components/GLTF/GLTF.svelte'
export { default as Disposables } from './components/Disposables/Disposables.svelte'
export { default as ContactShadows } from './components/ContactShadows/ContactShadows.svelte'
export { default as Environment } from './components/Environment/Environment.svelte'
export { default as Grid } from './components/Grid/Grid.svelte'
export { default as TransformControls } from './components/TransformControls/TransformControls.svelte'

// text component
export { default as Text } from './components/Text/Text.svelte'

// audio components
export { default as AudioListener } from './audio/AudioListener/AudioListener.svelte'
export { default as Audio } from './audio/Audio/Audio.svelte'
export { default as PositionalAudio } from './audio/PositionalAudio/PositionalAudio.svelte'

// audio hooks
export { useAudioListener } from './audio/useAudioListener'
export { useThrelteAudio } from './audio/useThrelteAudio'

export type { GLTFProperties } from './types/components'

// plugins
export {
  interactivity,
  type DomEvent,
  type EventMap,
  type Intersection,
  type IntersectionEvent
} from './plugins/interactivity'

export type { ThrelteGltf } from './types/types'
