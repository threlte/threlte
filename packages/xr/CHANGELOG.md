# @threlte/xr

## 1.0.0-next.4

### Patch Changes

- 2107848: Fix xr events and migrate remaining slots to snippets

## 1.0.0-next.3

### Patch Changes

- 36128d5: Replace events with callback props and slots with snippets

## 1.0.0-next.2

### Patch Changes

- 7cc5701: Remove raw event dispatching

## 1.0.0-next.1

### Patch Changes

- f76d1e4: Migrate additional components to runes mode

## 1.0.0-next.0

### Major Changes

- Experimental Svelte 5 compatibility

## 0.1.3

### Patch Changes

- d0fbeb5: Import paths rewrote to include file extensions for Three.js imports that are outside of the main 'three' export.

## 0.1.2

### Patch Changes

- 3cc3fdcc: Removed bun types from @threlte/core tsconfig to fix useLoader type export (affects possibly other packages)

## 0.1.1

### Patch Changes

- 56b5fee5: Replace useFrame with useTask internally

## 0.1.0

### Minor Changes

- 44488636: Declared beta

## 0.0.13

### Patch Changes

- 02802bf3: - Fix teleport cursor rotation when hovering on rotated objects.
  - Fix useController and useHand did not populate store values if a <Controller> / <Hand> component was not created.
  - Fix XR Controllers not rendering default models if unmounted and remounted.
  - Fix XR Hands not properly unmounting objects in the wrist slot if they lost connnection.
  - Fix hit tests not stopping when a session is exited.
  - Removed some uncommon optional features from the ARButton to prevent console warnings appearing in most apps.

## 0.0.12

### Patch Changes

- 038107fd: - Added the `pointerControls` plugin.
  - Added the `teleportControls` plugin.
  - **breaking**: Removed `<TeleportControls>`. Use the `teleportControls` plugin instead.

## 0.0.11

### Patch Changes

- 8ebaa97b: Force svelte/motion to use session.requestAnimationFrame when presenting

## 0.0.10

### Patch Changes

- 6d5e8339: Allow sessionInit overrides and fix useHeadset android chrome bug"

## 0.0.9

### Patch Changes

- 34741ea7: \* (xr) - useHitTest: Allow hit testing from controllers / hands
  - (core) - Do not attempt to resize renderer when in an immersive xr session

## 0.0.8

### Patch Changes

- 052f0345: fix: Add missing useHeadset export

## 0.0.7

### Patch Changes

- 1a872d57: Add useHeadset hook

## 0.0.6

### Patch Changes

- fca15c2: Fix hands, hand joints, and useHitTest docs examples

## 0.0.5

### Patch Changes

- 3df22efc: - Stop duplicate events from firing for XR controllers.
  - Remove `useControllerEvent` and `useHandEvent` hooks.
- 38f95de5: Fix `<Headset>`` position when teleporting and sync `<Headset>` with current camera when not presenting.

## 0.0.4

### Patch Changes

- 96257d4c: Tighten types of `<Controller>`
- 7498fb62: Added slot `"fallback"` to `<XR>`
- e71b6408: Add `<Headset />` component to allow attaching to viewer headset.
- 271a8723: Changed `controller` to `targetRay` (adhering to type and slot name rather than function call)

## 0.0.3

### Patch Changes

- 64d72dc3: Adapted README

## 0.0.2

### Patch Changes

- e05c73a: Add @threlte/xr package and bump three to 155
