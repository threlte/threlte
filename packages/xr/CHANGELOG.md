# @threlte/xr

## 1.3.0

### Minor Changes

- d7203d0: Introduce the 'running' option for useTask

## 1.2.0

### Minor Changes

- ffc74ea: update "module" and "moduleResolution" to "NodeNext" and adjust all relative imports

## 1.1.1

### Patch Changes

- c351b20: Improve internal types

## 1.1.0

### Minor Changes

- 40c52ae: Migrate internals to runes

## 1.0.8

### Patch Changes

- 05a642f: Simplify internal components and replace deprecated svelte APIs

## 1.0.7

### Patch Changes

- 774445e: Bump supported Three.js version to greater than 159

## 1.0.6

### Patch Changes

- 183eb5a: Fix pointer controls still sending pointerdown/pointerup/click events when disabled

## 1.0.5

### Patch Changes

- 3798493: Fix an issue where the XR session was left presenting after navigating away from the Threlte scene

## 1.0.4

### Patch Changes

- d8392bf: Improve TS Configs

## 1.0.3

### Patch Changes

- 4fdc0dc: Upgrade Eslint to v9

## 1.0.2

### Patch Changes

- 0ba3ebe: update deps

## 1.0.1

### Patch Changes

- fa5c4e9: Fixed a check for secure contexts that previously prevented WebXR apps from running on localhost

## 1.0.0

### Major Changes

- f25685a: Experimental Svelte 5 compatibility

### Patch Changes

- b8ea70d: Fix teleport plugin
- b7e6927: Adapt new core Attachment API
- b7045f5: Svelte dependency update
- 6016286: Adapt plugins to new plugin API
- fa8a61c: Bump Svelte compiler version
- 2ac3d48: Dependency updates
- c9a65a3: Bump core dependency version
- cec4b57: update deps
- 7cc5701: Remove raw event dispatching
- 995e592: Implement type guard utility, clean up
- 36128d5: Replace events with callback props and slots with snippets
- cc4ccf2: Update Three.js
- 60fcc29: Bump dev dependencies
- 2107848: Fix xr events and migrate remaining slots to snippets
- f76d1e4: Migrate additional components to runes mode
- a257643: Update Svelte + Three.js deps

## 1.0.0-next.16

### Patch Changes

- b8ea70d: Fix teleport plugin

## 1.0.0-next.15

### Patch Changes

- a257643: Update Svelte + Three.js deps

## 1.0.0-next.14

### Patch Changes

- c9a65a3: Bump core dependency version

## 1.0.0-next.13

### Patch Changes

- 60fcc29: Bump dev dependencies

## 1.0.0-next.12

### Patch Changes

- cec4b57: update deps

## 1.0.0-next.11

### Patch Changes

- 6016286: Adapt plugins to new plugin API

## 1.0.0-next.10

### Patch Changes

- b7045f5: Svelte dependency update

## 1.0.0-next.9

### Patch Changes

- 995e592: Implement type guard utility, clean up

## 1.0.0-next.8

### Patch Changes

- 2ac3d48: Dependency updates

## 1.0.0-next.7

### Patch Changes

- b7e6927: Adapt new core Attachment API

## 1.0.0-next.6

### Patch Changes

- cc4ccf2: Update Three.js

## 1.0.0-next.5

### Patch Changes

- fa8a61c: Bump Svelte compiler version

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

## 0.1.4

### Patch Changes

- 79b002b: Add missing package.json fields to improve npmjs.com pages

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
