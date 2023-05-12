# @threlte/extras

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
  const { gltf } = useGltf<'MeshA' | 'MeshB' | 'Object3DA', 'MaterialA' | 'MaterialB'>('/some/url')
  ```

  - After:

  ```ts
  const { gltf } = useGltf<{
    nodes: {
      MeshA: THREE.Mesh
      MeshB: THREE.Mesh
      Object3DA: THREE.Object3D
    }
    materials: {
      MaterialA: THREE.MeshStandardMaterial
      MaterialB: THREE.MeshBasicMaterial
    }
  }>('/some/url')
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
