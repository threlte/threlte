// Hooks
export { useCursor } from './hooks/useCursor'
export { useGltf } from './hooks/useGltf'
export { useDraco } from './hooks/useDraco'
export { useMeshopt } from './hooks/useMeshopt'
export { useKtx2 } from './hooks/useKtx2'
export { useGltfAnimations } from './hooks/useGltfAnimations'
export { useProgress } from './hooks/useProgress'
export { useTexture } from './hooks/useTexture'
export { useFBO } from './hooks/useFBO'
export { useGamepad, type StandardGamepadEvent } from './hooks/useGamepad'
export { useMask } from './hooks/useMask'
export { useViewport } from './hooks/useViewport'
export { meshBounds } from './utilities/meshBounds'

// abstractions
export { default as AnimatedSpriteMaterial } from './components/AnimatedSpriteMaterial/AnimatedSpriteMaterial.svelte'
export { default as AsciiRenderer } from './components/AsciiRenderer/AsciiRenderer.svelte'
export { default as Decal } from './components/Decal/Decal.svelte'
export {
  default as CameraControls,
  type CameraControlsRef
} from './components/CameraControls/CameraControls.svelte'
export { default as Edges } from './components/Edges/Edges.svelte'
export { default as HTML } from './components/HTML/HTML.svelte'
export { default as HUD } from './components/HUD/HUD.svelte'
export { default as Float } from './components/Float/Float.svelte'
export { default as GLTF } from './components/GLTF/GLTF.svelte'
export { default as Gizmo, type GizmoOptions } from './components/Gizmo/Gizmo.svelte'
export { default as ContactShadows } from './components/ContactShadows/ContactShadows.svelte'
export { default as CubeEnvironment } from './components/environment/CubeEnvironment/CubeEnvironment.svelte'
export { default as Environment } from './components/environment/Environment/Environment.svelte'
export { default as VirtualEnvironment } from './components/environment/VirtualEnvironment/VirtualEnvironment.svelte'
export { default as ImageMaterial } from './components/ImageMaterial/ImageMaterial.svelte'
export { default as Grid } from './components/Grid/Grid.svelte'
export { default as RoundedBoxGeometry } from './components/RoundedBoxGeometry/RoundedBoxGeometry.svelte'
export { default as TransformControls } from './components/controls/TransformControls/TransformControls.svelte'
export { default as OrbitControls } from './components/controls/OrbitControls/OrbitControls.svelte'
export { default as TrackballControls } from './components/controls/TrackballControls/TrackballControls.svelte'
export { default as InstancedMesh } from './components/Instancing/InstancedMesh.svelte'
export { default as Instance } from './components/Instancing/Instance.svelte'
export { default as InstancedMeshes } from './components/Instancing/InstancedMeshes/InstancedMeshes.svelte'
export { default as SoftShadows } from './components/SoftShadows/SoftShadows.svelte'
export { default as MeshLineGeometry } from './components/MeshLine/MeshLineGeometry.svelte'
export { default as MeshLineMaterial } from './components/MeshLine/MeshLineMaterial.svelte'
export { default as PointsMaterial } from './components/PointsMaterial/PointsMaterial.svelte'
export { default as Sky } from './components/Sky/Sky.svelte'
export { default as Align } from './components/Align/Align.svelte'
export { default as CSM } from './components/CSM/CSM.svelte'
export { default as Billboard } from './components/Billboard/Billboard.svelte'
export { default as FakeGlowMaterial } from './components/FakeGlowMaterial/FakeGlowMaterial.svelte'
export { default as ShadowMaterial } from './components/ShadowMaterial/ShadowMaterial.svelte'
export { default as Stars } from './components/Stars/Stars.svelte'
export { default as SVG } from './components/Svg/Svg.svelte'
export { default as MeshRefractionMaterial } from './components/MeshRefractionMaterial/MeshRefractionMaterial.svelte'
export { default as Text3DGeometry } from './components/Text3DGeometry/Text3DGeometry.svelte'
export { default as PerfMonitor } from './components/PerfMonitor/PerfMonitor.svelte'
export { default as Outlines } from './components/Outlines/Outlines.svelte'
export { default as Mask } from './components/Mask/Mask.svelte'
export { default as BakeShadows } from './components/BakeShadows/BakeShadows.svelte'
export { default as Detailed } from './components/Detailed/Detailed.svelte'
export { default as MeshDiscardMaterial } from './components/MeshDiscardMaterial/MeshDiscardMaterial.svelte'
export { default as Resize } from './components/Resize/Resize.svelte'
export { default as CubeCamera } from './components/CubeCamera/CubeCamera.svelte'
export { default as LinearGradientTexture } from './components/GradientTexture/linear/LinearGradientTexture.svelte'
export { default as RadialGradientTexture } from './components/GradientTexture/radial/RadialGradientTexture.svelte'
export type { ColorStop, RadialGradientOuterRadius } from './components/GradientTexture/types'
export { default as View } from './components/View/View.svelte'
export { default as Wireframe } from './components/Wireframe/Wireframe.svelte'

// Transitions
export { transitions } from './transitions/transltions.svelte'
export { createTransition } from './transitions/createTransition'
export { global } from './transitions/global'
export type { TransitionProps } from './transitions/types'

// suspense
export { default as Suspense } from './suspense/Suspense.svelte'
export { useSuspense } from './suspense/useSuspense'
export { onReveal } from './suspense/onReveal'
export { onSuspend } from './suspense/onSuspend'

// portals
export { default as Portal } from './components/portals/Portal.svelte'
export { default as PortalTarget } from './components/portals/PortalTarget.svelte'

// text component
export { default as Text } from './components/Text/Text.svelte'

// audio components
export { default as AudioListener } from './audio/AudioListener/AudioListener.svelte'
export { default as Audio } from './audio/Audio/Audio.svelte'
export { default as PositionalAudio } from './audio/PositionalAudio/PositionalAudio.svelte'

// audio hooks
export { useAudioListener } from './audio/useAudioListener'
export { useThrelteAudio } from './audio/useThrelteAudio'

// interactivity
export {
  interactivity,
  useInteractivity,
  type DomEvent,
  type EventMap,
  type Intersection,
  type IntersectionEvent,
  type InteractivityProps
} from './interactivity'

// layers
export { layers, type ThrelteLayers, type ThrelteLayersContext } from './layers'

// instanced sprites
export { default as InstancedSprite } from './components/InstancedSprite/InstancedSprite.svelte'
export {
  useInstancedSprite,
  buildSpritesheet,
  type SpritesheetMetadata
} from './components/InstancedSprite/instancedSpriteUtils'

// bvh
export { bvh } from './bvh/bvh.svelte'
export type { BVHOptions, BVHProps } from './bvh/types'
import { SAH, CENTER, AVERAGE } from 'three-mesh-bvh'
export const BVHSplitStrategy = { SAH, CENTER, AVERAGE }

export type { ThrelteGltf } from './types/types'
