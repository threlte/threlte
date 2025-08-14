// Components
export { default as ARButton } from './components/ARButton.svelte'
export { default as VRButton } from './components/VRButton.svelte'
export { default as XRButton } from './components/XRButton.svelte'
export { default as Controller } from './components/Controller.svelte'
export { default as Hand } from './components/Hand.svelte'
export { default as Headset } from './components/Headset.svelte'
export { default as XR } from './components/XR.svelte'

// Utilities
export { getXRSupportState } from './lib/getXRSupportState'
export { toggleXRSession } from './lib/toggleXRSession'
export { handJoints } from './lib/handJoints'

// Plugins
export { pointerControls } from './plugins/pointerControls'
export { teleportControls } from './plugins/teleportControls'

// Hooks
export { useController } from './hooks/useController.svelte'
export { useHand } from './hooks/useHand.svelte'
export { useHandJoint } from './hooks/useHandJoint.svelte'
export { useHeadset } from './hooks/useHeadset'
export { useHitTest } from './hooks/useHitTest.svelte'
export { useTeleport } from './hooks/useTeleport'
export { useXR } from './hooks/useXR'

// Types
export type {
  XRSessionEventType,
  XRControllerEventType,
  XRHandEventType,
  XRSessionEvent,
  XRControllerEvent,
  XRController,
  XRHand,
  XRHandEvent
} from './types'
