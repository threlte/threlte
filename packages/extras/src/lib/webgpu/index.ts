/**
 * `@threlte/extras/webgpu` mirrors `@threlte/extras`, minus everything that is
 * built on raw GLSL. `WebGPURenderer` compiles materials through the node
 * system, so anything relying on `ShaderMaterial`, `onBeforeCompile` or
 * `ShaderChunk` patching can't be used with it.
 *
 * Omitted from this entrypoint:
 * `AnimatedSpriteMaterial`, `InstancedSprite`, `useInstancedSprite`,
 * `buildSpritesheet`, `ContactShadows`, `CSM`, `FakeGlowMaterial`, `Gizmo`,
 * `Grid`, `ImageMaterial`, `MeshLineMaterial`, `MeshRefractionMaterial`,
 * `Outlines`, `PerfMonitor`, `PointsMaterial`, `ShadowAlpha`, `Sky`,
 * `SoftShadows`, `Sparkles`, `Stars`, `Text`, `UvMaterial`, `Wireframe` and
 * `Wobble`.
 *
 * Migrating these components to TSL is in progress. Each one gets a `webgpu`
 * folder next to its GLSL original, and is exported from here once it lands.
 */

// Hooks
export {
  useCursor,
  useGltf,
  useDraco,
  useMeshopt,
  useKtx2,
  useGltfAnimations,
  useProgress,
  useTexture,
  useFBO,
  useGamepad,
  type StandardGamepadEvent,
  type StandardGamepad,
  type StandardXRGamepad,
  useKeyboard,
  useInputMap,
  useFollow,
  useMask,
  useViewport,
  useTrailTexture,
  useCameraControls,
  useOrbitControls,
  useTrackballControls,
  useTransformControls,
  meshBounds
} from '../index.js'

// abstractions migrated to TSL
export { default as MeshDiscardMaterial } from '../components/MeshDiscardMaterial/webgpu/MeshDiscardMaterial.svelte'

// abstractions
export {
  AsciiRenderer,
  BackdropGeometry,
  Decal,
  CameraControls,
  CameraControlsRef,
  Edges,
  HTML,
  HUD,
  Float,
  GLTF,
  CubeEnvironment,
  Environment,
  VirtualEnvironment,
  Bounds,
  RoundedBoxGeometry,
  TransformControls,
  OrbitControls,
  TrackballControls,
  InstancedMesh,
  Instance,
  InstancedMeshes,
  MeshLineGeometry,
  Align,
  Billboard,
  ShadowMaterial,
  SVG,
  Text3DGeometry,
  Mask,
  BakeShadows,
  Detailed,
  Resize,
  CubeCamera,
  LinearGradientTexture,
  RadialGradientTexture,
  type ColorStop,
  type RadialGradientOuterRadius,
  View
} from '../index.js'

// Transitions
export { transitions, createTransition, global, type TransitionProps } from '../index.js'

// suspense
export { Suspense, useSuspense, onReveal, onSuspend } from '../index.js'

// portals
export { Portal, PortalTarget } from '../index.js'

// audio components
export { AudioListener, Audio, PositionalAudio } from '../index.js'

// audio hooks
export { useAudioListener, useThrelteAudio } from '../index.js'

// interactivity
export {
  interactivity,
  useInteractivity,
  type DomEvent,
  type EventMap,
  type Intersection,
  type IntersectionEvent,
  type InteractivityProps
} from '../index.js'

// layers
export { layers, type ThrelteLayers, type ThrelteLayersContext } from '../index.js'

// bvh
export { bvh, type BVHOptions, type BVHProps, BVHSplitStrategy } from '../index.js'

export type { ThrelteGltf } from '../index.js'
