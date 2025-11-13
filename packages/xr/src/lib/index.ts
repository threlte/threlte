// Components
export { default as ARButton } from './components/ARButton.svelte'
export { default as VRButton } from './components/VRButton.svelte'
export { default as XRButton } from './components/XRButton.svelte'
export { default as Controller } from './components/Controller.svelte'
export { default as Hand } from './components/Hand.svelte'
export { default as Headset } from './components/Headset.svelte'
export { default as XR } from './components/XR.svelte'

// Utilities
export { getXRSupportState } from './lib/getXRSupportState.js'
export { toggleXRSession } from './lib/toggleXRSession.js'
export { handJoints } from './lib/handJoints.js'

// Plugins
export { pointerControls } from './plugins/pointerControls/index.js'
export { teleportControls } from './plugins/teleportControls/index.js'

// Hooks
export { useController } from './hooks/useController.svelte.js'
export { useHand } from './hooks/useHand.svelte.js'
export { useHandJoint } from './hooks/useHandJoint.svelte.js'
export { useHeadset } from './hooks/useHeadset.js'
export { useHitTest } from './hooks/useHitTest.svelte.js'
export { useTeleport } from './hooks/useTeleport.js'
export { useXR } from './hooks/useXR.js'

// Types
export type {
  XRSessionEventType,
  XRControllerEventType,
  XRHandEventType,
  XRControllerEvent,
  XRController,
  XRHandObject,
  XRHandEvent
} from './types.js'
