# @threlte/extras

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

  // -> $gltf.nodes.MeshA -> THREE.Object3D
  // -> $gltf.nodes.Object3DA -> THREE.Object3D
  // -> $gltf.materials.MaterialA -> THREE.Material
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

  // -> $gltf.nodes.MeshA -> THREE.Mesh
  // -> $gltf.nodes.Object3DA -> THREE.Object3D
  // -> $gltf.materials.MaterialA -> THREE.MeshStandardMaterial
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
