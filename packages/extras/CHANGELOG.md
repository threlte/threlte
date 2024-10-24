# @threlte/extras

## 9.0.0-next.29

### Patch Changes

- 81da20a: Fixed type of `scale` in `PerfMonitor`

## 9.0.0-next.28

### Patch Changes

- b7045f5: Svelte dependency update

## 9.0.0-next.27

### Patch Changes

- 865515f: Implement type guard utility, clean up

## 9.0.0-next.26

### Patch Changes

- 5a08cd1: OrbitControls fix for Three.js R169
- 2ac3d48: Dependency updates

## 9.0.0-next.25

### Patch Changes

- 72a1004: Use regular ts files for shader files in MeshDiscardMaterial

## 9.0.0-next.24

### Minor Changes

- 97004c3: adds `useMeshBounds` which is a faster raycast function for the cost of pointer accuracy
- aba6d5a: adds a <Detailed> component that can be used for displaying different level-of-detail for scene objects
- bf72ead: adds <MeshDiscardMaterial>` which is a material that completely hides the mesh but doesn't hide its children or shadows

### Patch Changes

- 01c1e3a: Adds a `<BakeShadows>` component that "freezes" shadows for scenes where shadows only need to be calculated once or very infrequently.'

## 9.0.0-next.23

### Patch Changes

- b7e6927: Adapt new core Attachment API

## 9.0.0-next.22

### Patch Changes

- 9b6967f: Update vertex.ts to fix ERROR: 0:167: 'isPerspectiveMatrix' : no matching overloaded function found

## 9.0.0-next.21

### Patch Changes

- be301d2: Fix useSuspense types

## 9.0.0-next.20

### Patch Changes

- 52926fa: Fix suspense timing & types

## 9.0.0-next.19

### Patch Changes

- afc3ffa: Allow multiple useProgress hooks, fixes for useGamepad and audio extras types

## 9.0.0-next.18

### Patch Changes

- 7a3281c: Split out gltf-related loaders into hooks for better tree shaking

## 9.0.0-next.17

### Patch Changes

- cc4ccf2: Update Three.js

## 9.0.0-next.16

### Patch Changes

- e7b0273: Make AgXToneMapping the default toneMapping

## 9.0.0-next.15

### Major Changes

- 2b699c7: Remove transitions plugin

### Patch Changes

- fa8a61c: Bump Svelte compiler version

## 9.0.0-next.14

### Patch Changes

- 790794d: Add HUD component and useViewport hook

## 9.0.0-next.13

### Patch Changes

- e4bf75c: Remove $events reference in HTML component

## 9.0.0-next.12

### Patch Changes

- 42ee4c9: Fix svelte compiler warnings

## 9.0.0-next.11

### Patch Changes

- 8508b11: Add drei occlusion features to HTML component

## 9.0.0-next.10

### Patch Changes

- 36128d5: Replace events with callback props and slots with snippets

## 9.0.0-next.9

### Patch Changes

- 750550b: Remove useLegacyLights prop

## 9.0.0-next.8

### Patch Changes

- e8bf233: Add lang to module block, cleanup imports

## 9.0.0-next.7

### Patch Changes

- 13aff20: Migrate Billboard to runes mode

## 9.0.0-next.6

### Patch Changes

- 1973ebe: Fix performance regression where non-interactive objects would be added to the interactivity plugin

## 9.0.0-next.5

### Patch Changes

- 3883665: Reduce interactivity footprint

## 9.0.0-next.4

### Patch Changes

- c03a430: Grid: Fix frame invalidation on prop change

## 9.0.0-next.3

### Patch Changes

- 025ebb4: Fix TransformComtrols prop reactivity

## 9.0.0-next.2

### Patch Changes

- 32aa5bb: Fix <TransformControls> bindings and prop updates
- f76d1e4: Migrate additional components to runes mode

## 9.0.0-next.1

### Patch Changes

- 3b39c4e: Remove grid useTask invalidate call

## 9.0.0-next.0

### Major Changes

- Experimental Svelte 5 compatibility

## 8.11.4

### Patch Changes

- 79b002b: Add missing package.json fields to improve npmjs.com pages

## 8.11.3

### Patch Changes

- 943b0bd: imported classes as types not values in Gizmo and MeshRefractionMaterial components

## 8.11.2

### Patch Changes

- 4867f80: Improve MeshLineGeometry performance, fix interactivity NaN bug

## 8.11.1

### Patch Changes

- 82c93bc: Remove unused 'filter' prop from InstancedSprite

## 8.11.0

### Minor Changes

- 842fef9: Added Mask component to Extras
- a3866b0: NEW COMPONENT: InstancedSprite

### Patch Changes

- e6c4250: Add `<Image>` component.

## 8.10.3

### Patch Changes

- d3cd996: Minor grid improvements

## 8.10.2

### Patch Changes

- 345035c: Add `<Outlines>` component

## 8.10.1

### Patch Changes

- d0fbeb5: Import paths rewrote to include file extensions for Three.js imports that are outside of the main 'three' export.

## 8.10.0

### Minor Changes

- 07af192: Add Text3D component

## 8.9.0

### Minor Changes

- cd5f31d: Remove deprecated encoding-related code to allow compatibility with r162.

  ### Migration

  Three.js r152 or later is now required.

## 8.8.1

### Patch Changes

- b039ee4: Small interactivity internals improvements

## 8.8.0

### Minor Changes

- 34a35f5: <PerfMonitor/> component - easy access to rendering stats like draw calls, triangles, fps etc.

## 8.7.5

### Patch Changes

- 5d9ca58: Fixed a bug where `<Sky>`'s renderTarget wasn't able to be disposed because the canvas context did not exist anymore.

## 8.7.4

### Patch Changes

- 6c3807f: Remove three/addons import for compatibility with older Three versions

## 8.7.3

### Patch Changes

- 392a14f: Remove svelte/internal dependency from <Suspense>

## 8.7.2

### Patch Changes

- 3c29bc9: Remove three-mesh-bvh from peer dependencies

## 8.7.1

### Patch Changes

- 7f04878: Mark three-mesh-bvh as an optional dependency in package.json"

## 8.7.0

### Minor Changes

- 9036f10: Add port of drei's Stars component

## 8.6.0

### Minor Changes

- 85b9332: Add port of drei's MeshRefractionMaterial

## 8.5.1

### Patch Changes

- a31b5a3: Fix GroundedSkybox import for r161

## 8.5.0

### Minor Changes

- e702d7e9: Added a new useFBO hook to extras

## 8.4.0

### Minor Changes

- 2b11b030: Add port of FakeGlowMaterial r3f component from ektogamat

## 8.3.0

### Minor Changes

- e6f83529: Bumped version of troika-three-text, added prop `colorRanges` to `<Text>`

## 8.2.1

### Patch Changes

- 0214300f: On-demand rendering for damped OrbitControls

## 8.2.0

### Minor Changes

- dce129b4: Add port of Billboard component from drei

## 8.1.2

### Patch Changes

- e7b24a2f: fix Gizmo click events when the Canvas is not taking up the full viewport

## 8.1.1

### Patch Changes

- aa6e2ce4: On-demand rendering for the `<TrackballControls>` as well as JSDoc test for tsdocs.dev

## 8.1.0

### Minor Changes

- b9f5db5c: Add TrackballControls

## 8.0.10

### Patch Changes

- 722f8c27: Fix instancedMesh deprecation warning

## 8.0.9

### Patch Changes

- 04ac53aa: fixed useTexture signature

## 8.0.8

### Patch Changes

- 87c45a86: Changed color interface from number to THREE.ColorRepresentation in `<Gizmo>`

## 8.0.7

### Patch Changes

- 5c07b714: `<Gizmo>` div position fix

## 8.0.6

### Patch Changes

- 514824bf: Performance improvements on `<Gizmo>`
- 430e89cf: Added tonemapping and padding as well as visual optimizations to `<Gizmo>`

## 8.0.5

### Patch Changes

- aaa94569: Perf bug fixed in `<Gizmo>`

## 8.0.4

### Patch Changes

- 018ee0c5: Improved Gizmo visuals
- 97f2e889: Allow reactive <Portal> ids
- 2df1367f: Add a gizmo component for heads-up camera control

## 8.0.3

### Patch Changes

- 6729814b: Fixed eslint config and fixed some linting errors

## 8.0.2

### Patch Changes

- 3cc3fdcc: Removed bun types from @threlte/core tsconfig to fix useLoader type export (affects possibly other packages)

## 8.0.1

### Patch Changes

- 8b62e472: useTexture release fix
- ea50d08f: Fixed frame guards of `<AnimatedSpriteMaterial>`

## 8.0.0

### Major Changes

- 33367cbf: @threlte/core ^7 is now required as useTask is used by default

## 7.5.4

### Patch Changes

- fa8c1677: Added support for reverse animation direction in `<AnimatedSpriteMaterial>`

## 7.5.3

### Patch Changes

- 050a7128: Set `pointerEvents` for `noTransform` divs

## 7.5.2

### Patch Changes

- 2ae76e18: Threlte 7 compatibility

## 7.5.1

### Patch Changes

- 56330979: Fixed prop defaults of `<Text>`

## 7.5.0

### Minor Changes

- bcc96f23: Added `<AnimatedSpriteMaterial>`

## 7.4.0

### Minor Changes

- 20e8711a: Added `<CSM>` to extras

## 7.3.0

### Minor Changes

- c2ddef77: Added `suspended` store to return type of `useSuspense`

## 7.2.0

### Minor Changes

- 206fbc83: Added suspense support to `<GLTF>` and `<Environment>`

### Patch Changes

- 79a7fa4f: Aligned `onReveal` with `onMount` in that you may return a cleanup function that runs whenever a component is resuspended or unmounted

## 7.1.1

### Patch Changes

- 060fbbdf: Changed eventDispatcher to rawEventDispatcher in `<Suspense>`, added type def

## 7.1.0

### Minor Changes

- cd27881c: Added suspend event to `<Suspense>`

## 7.0.1

### Patch Changes

- 62d3f395: Add ref binding to `<InstancedMesh>`

## 7.0.0

### Major Changes

- 30e87470: `useTexture` is assigning the correct `colorSpace` based on the renderer. Migration: If you rely on a different `colorSpace` in your texture than the renderer is set to, use the option [`transform`](https://threlte.xyz/docs/reference/extras/use-texture#transforming-the-texture) to transform the texture to THREE.NoColorSpace, which used to be the default.
- ca47ae2a: Remove deprecated props, events and slot props on `<Align>`, remove `<Center>` export. Migration: Replace `<Center>` with `<Align>`, replace the prop `autoCenter` with `auto`, replace the event `on:center` with `on:align`, replace the slot prop `let:center` with `let:align`.

## 6.0.0

### Major Changes

- be722cf: ## Grid component update:

  - New types of grid: lines, circular and polar.
  - Added background option to to the Grid
  - **breaking**: renamed `axes` property to `plane`. It now accepts two letter prop `'xz' | 'xy' | 'zy'` instead of 3 letter prop `'xzy' | 'xyz' | 'zyx'`

  **Migration:**

  - change `axes` to `plane` in all of your `<Grid/>` components and use the new two-letter values (for example, `xzy` would become `xz`).

## 5.7.0

### Minor Changes

- f4b7d2d2: Add useGamepad hook

## 5.6.4

### Patch Changes

- a79ef10d: Orbit controls - now calls `update` on initialization to set a correct camera position.
- 8296c7aa: ContactShadows: use WebGLRenderTarget#colorSpace when available

## 5.6.3

### Patch Changes

- 8b490b8: Fix MeshLineMaterial shader to calculate normals and offsets correctly

## 5.6.2

### Patch Changes

- 348294f6: Added MeshLineMaterial and MeshLineGeometry to extras
- 1e550a62: Include proper colorspace shader chunk via Three.js revision in `<Grid>`

## 5.6.1

### Patch Changes

- e05c73a: Add @threlte/xr package and bump three to 155

## 5.6.0

### Minor Changes

- 59607f3: Added the component `<Sky>` which renders the Three.js Sky object, creates a cubemap from it and applies it to the scene env.
- 0ab9c29: Added the option `setEnvironment` to the component `<Sky>`

### Patch Changes

- 7974f0e: Cleanup import in `<OrbitControls>`

## 5.5.1

### Patch Changes

- 6c18d9cc: Properly deprecate `<Center>`

## 5.5.0

### Minor Changes

- 144b55a: Deprecated the component `<Center>` as it's being renamed to `<Align>`. Renamed the prop `autoCenter` to `auto`, renamed events and slot props accordingly.

### Patch Changes

- 8a037ec: Deduped `<Align>` event data

## 5.4.1

### Patch Changes

- de3341f: Fixed a bug where the component `<Text>` would not render custom fonts, character sets or SDF glyph sizes

## 5.4.0

### Minor Changes

- b29f2ec: Add the ability to provide a custom DRACOLoader in useGltf hook.

## 5.3.0

### Minor Changes

- 25755e3: Added playground for extras, made `<Text>` component suspense-ready

## 5.2.0

### Minor Changes

- 0dbdd65: Added `<Center>` component

## 5.1.0

### Minor Changes

- 9c0035e: Added `<SoftShadows>` component

## 5.0.5

### Patch Changes

- dfa5cbd: Use peer dependencies for svelte and three

Note: We're considering this a bug fix, but it might be a breaking change for you depending on your setup. If you run into dependency issues, reinstall the packages following the [installation guide](https://threlte.xyz/docs/learn/getting-started/installation).

## 5.0.4

### Patch Changes

- 7424123: Remove optional type for renderer

## 5.0.3

### Patch Changes

- 5b74e1a: Fix #478 Switch to lodash-es to solve vite build issues

## 5.0.2

### Patch Changes

- ee1d319: Update package READMEs to fix banners.

## 5.0.1

### Patch Changes

- 3a68dcf: fix: Replaced instances of "instanceof" with checks that are cross-source compatible

## 5.0.0

### Major Changes

- fcfcc0e4: Refactored <Audio> as well as <PositionalAudio>. The new main source prop is now called "src" to accomodate the original prop "source" alognside.
- 0620502: Removed <Disposables> component
- 8ed809b2: The hook useGltfAnimations does not provide a callback anymore because its usage was ambiguous. The signature also changed slightly. Check its documentation for details
- 15309755: Converted <ContactShadows> to v5
- 4b383b0a: requires min. three.js version 151

  WHAT: we changed import name to match update-to-date three.js names
  WHY: see [this pull request](https://github.com/mrdoob/three.js/pull/25645) for details.

- df4b307b: Converted <Text> to v5

### Minor Changes

- bd4a4b76: Added Portal and PortalTarget component
- 151cdc08: useGltfAnimations now can also set a root object after its creation, the creation of the mixer etc is deferred by tick()
- 1f4e3e0: Added the experimental transitions feature. This feature is marked as experimental and might change or be removed.
- ae514436: Moved <TransformControls> from core to extras, added createRawEventDispatcher to core
- 2720cd4: Added lifecycle methods onReveal and onSuspend
- e28b8ada: Move audio context and components to extras
- fef242de: Added the components InstancedMesh, Instance and InstancedMeshes
- 4b67b473: Environment uses threlte cache
- aac59eb1: - Float component updated to V5.
  - Float added features: float direction and rotation can now happen on all 3 axes
    Backwards compatible
- 23049766: Added Suspense component and useSuspense hook.

### Patch Changes

- f9f8e61: changed return signature of useSuspense->suspend
- 33c37682: Moved lodash from dev dep to regular dep
- 300cbe4e: Converted <Edges> component to use Threlte v5 syntax. Changed prop name "threshold" to "thresholdAngle" (as it is used by three.js)
- 9526d5d: Fixed bindings of TransformControls
- dd686a7: upgrade troika-three-text to 0.47.2
- 3868395: Updated prettier
- 5df4ca0: Added transitions plugin props
- 1505665: Fixed a bug in interactivity plugin
- 8734041: Add RoundedBoxGeometry component
- feab5e8: "Unsimplified" types of transitions plugin
- 5238844: Updated all packages to use Svelte 4, minimal Svelte version is 4.1.1
- b71145ea: Environment: update Types to Threlte V5 standard
- 4b67b473: Audio bugfix
- 5ba62e2: Removed log

## 5.0.0-next.17

### Major Changes

- [#272](https://github.com/threlte/threlte/pull/272) [`0620502`](https://github.com/threlte/threlte/commit/0620502ba9d9fbd0fc15100c298816130ed526d7) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Removed <Disposables> component

### Patch Changes

- [#380](https://github.com/threlte/threlte/pull/380) [`9526d5d`](https://github.com/threlte/threlte/commit/9526d5d2d6285b8ddb8c81dc9e6ce819a90db193) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Fixed bindings of TransformControls

- [#380](https://github.com/threlte/threlte/pull/380) [`5238844`](https://github.com/threlte/threlte/commit/523884441ec8d7d2894f7ab3dbde2aecc68cf2bf) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Updated all packages to use Svelte 4, minimal Svelte version is 4.1.1

## 5.0.0-next.16

### Patch Changes

- 5ba62e2: Removed log

## 5.0.0-next.15

### Patch Changes

- 3868395: Updated prettier
- 8734041: Add RoundedBoxGeometry component

## 5.0.0-next.14

### Patch Changes

- dd686a7: upgrade troika-three-text to 0.47.2

## 5.0.0-next.13

### Patch Changes

- 5df4ca04: Added transitions plugin props

## 5.0.0-next.12

### Patch Changes

- feab5e8b: "Unsimplified" types of transitions plugin

## 5.0.0-next.11

### Patch Changes

- 1505665c: Fixed a bug in interactivity plugin

## 5.0.0-next.10

### Minor Changes

- 1f4e3e01: Added the experimental transitions feature. This feature is marked as experimental and might change or be removed.

## 5.0.0-next.9

### Minor Changes

- 2720cd42: Added lifecycle methods onReveal and onSuspend

## 5.0.0-next.8

### Patch Changes

- f9f8e615: changed return signature of useSuspense->suspend

## 5.0.0-next.7

### Minor Changes

- 23049766: Added Suspense component and useSuspense hook.

## 5.0.0-next.6

### Minor Changes

- fef242de: Added the components InstancedMesh, Instance and InstancedMeshes

## 5.0.0-next.5

### Minor Changes

- 4b67b473: Environment uses threlte cache

### Patch Changes

- 4b67b473: Audio bugfix

## 5.0.0-next.4

### Major Changes

- 4b383b0a: requires min. three.js version 151

  WHAT: we changed import name to match update-to-date three.js names
  WHY: see [this pull request](https://github.com/mrdoob/three.js/pull/25645) for details.

## 5.0.0-next.3

### Major Changes

- 8ed809b2: The hook useGltfAnimations does not provide a callback anymore because its usage was ambiguous. The signature also changed slightly. Check its documentation for details

### Minor Changes

- 151cdc08: useGltfAnimations now can also set a root object after its creation, the creation of the mixer etc is deferred by tick()

## 5.0.0-next.2

### Minor Changes

- bd4a4b76: Added Portal and PortalTarget component

## 5.0.0-next.1

### Patch Changes

- 33c37682: Moved lodash from dev dep to regular dep

## 5.0.0-next.0

### Major Changes

- fcfcc0e4: Refactored <Audio> as well as <PositionalAudio>. The new main source prop is now called "src" to accomodate the original prop "source" alognside.
- 15309755: Converted <ContactShadows> to v5
- df4b307b: Converted <Text> to v5

### Minor Changes

- ae514436: Moved <TransformControls> from core to extras, added createRawEventDispatcher to core
- e28b8ada: Move audio context and components to extras
- aac59eb1: - Float component updated to V5.
  - Float added features: float direction and rotation can now happen on all 3 axes
    Backwards compatible

### Patch Changes

- 300cbe4e: Converted <Edges> component to use Threlte v5 syntax. Changed prop name "threshold" to "thresholdAngle" (as it is used by three.js)
- b71145ea: Environment: update Types to Threlte V5 standard

## 4.9.3

### Patch Changes

- fb70869: required props in Grid component

## 4.9.2

### Patch Changes

- 65d2b64: all <Grid> props should be optional

## 4.9.1

### Patch Changes

- 8120433: Added Mesh props to <Grid>

## 4.9.0

### Minor Changes

- 8a6e02f: Feature: Grid component

## 4.8.0

### Minor Changes

- 5a98c4f: Add support for glTF Meshopt decoding

## 4.7.0

### Minor Changes

- 0fa8d16: Added overload to useGltfAnimations to set the root of an animation

## 4.6.0

### Minor Changes

- 2a44ca8: This release introduces rendering as a concept to `@threlte/core` and subsequently to all other packages. See https://threlte.xyz/core-transition for details.

## 4.5.1

### Patch Changes

- f0449df: Pass the default THREE.DefaultLoadingManager to all relevant loaders
- b0bea2e: The component `<Environment>` can attach to the immediate parent if the parent is a `THREE.Scene`

## 4.5.0

### Minor Changes

- 060798a: Stronger types on typed threlte GLTF-related modules. This is technically a **breaking change** but it's types only.
  This is a change that prepares threlte's type system for glTF code generators.

  ### Upgrade Plan

  - Before:

  ```ts
  const { gltf } = useGltf<
    "MeshA" | "MeshB" | "Object3DA",
    "MaterialA" | "MaterialB"
  >("/some/url");
  ```

  - After:

  ```ts
  const { gltf } = useGltf<{
    nodes: {
      MeshA: THREE.Mesh;
      MeshB: THREE.Mesh;
      Object3DA: THREE.Object3D;
    };
    materials: {
      MaterialA: THREE.MeshStandardMaterial;
      MaterialB: THREE.MeshBasicMaterial;
    };
  }>("/some/url");
  ```

## 4.4.1

### Patch Changes

- e91ce33: Environment - GroundProjection reactivity bugfix & docs update

## 4.4.0

### Minor Changes

- 3a0d3c6: Environment component

## 4.3.0

### Minor Changes

- 8f1a904: Added a port of dreis `<ContactShadows>` component

## 4.2.0

### Minor Changes

- 4a94f6c: Added `useDraco` to GLTF component, and deprecated `dracoDecoderPath`

## 4.1.0

### Minor Changes

- 834f333: Added a new property "userData" which is useful to debug, add custom properties and filter objects
- 7e36568: Added component <Disposables> to easily create a disposal strategy

## 4.0.1

### Patch Changes

- 1c4d78f: <HTML> component checks for visibility of ancestors.

## 4.0.0

### Major Changes

- 52e021c: # Breaking Change

  The threlte repository has been moved to its own GitHub Organization: [https://github.com/threlte/threlte](https://github.com/threlte/threlte).
  threlte consists now of two npm packages: `@threlte/core` and `@threlte/extras`, managed in a mono repository:

  `@threlte/core` consists of components, hooks and other utilites that follow three.js principles, nomenclature and inheritance as closely as useful and possible. Therefore components that have been part of the package `threlte` have been moved to the new home of all kinds of useful abstractons: `@threlte/extras`.

  `@threlte/extras` consists of useful abstractions and helpers that you may find yourself use all the time. These components do not need to follow three.js principles as strict as exports from `@threlte/core`, but they do where it makes sense.

  ## The breaking changes in detail:

  - Moved `<GLTF>` component as well as `useGltf` hook to `@threlte/extras`.
  - Moved `<Text>` component to `@threlte/extras`.

  ## How to update

  Replace imports from `threlte` and `threlte/extras`:

  1. `npm rm threlte`
  2. `npm i -D @threlte/core @threlte/extras`
  3. Replace `import {…} from 'threlte'` with `import {…} from '@threlte/core'`
  4. Replace `import {…} from 'threlte/extras'` with `import {…} from '@threlte/extras'`

  Specifically replace imports of `<GLTF>`, `useGltf` or `<Text>`:

  3. Replace `import { GLTF, useGltf, Text } from 'threlte'` with `import { GLTF, useGltf, Text } from '@threlte/extras'`

  # Other changes

  - The documentation is now hosted on Vercel and as such we are hoping for a Vercel Sponsorship for OSS. There have also been some style fixes and overhauls.

## 3.13.10

### Patch Changes

- 4de7371: added svelte identifier

## 3.13.9

### Patch Changes

- 41cc5a1: test

## 3.13.8

### Patch Changes

- 79a64f5: test

## 3.13.7

### Patch Changes

- test

## 3.13.6

### Patch Changes

- trying to delete

## 3.13.5

### Patch Changes

- 11aa5eb: yes

## 3.13.4

### Patch Changes

- 0c40456: added scripts to clean up packages
- 7cc4e5d: added node types

## 3.13.3

### Patch Changes

- a2a6d93: test

## 3.13.2

### Patch Changes

- 8dbf8cd: Test
