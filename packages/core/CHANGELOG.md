# @threlte/core

## 5.0.9

### Patch Changes

- 2629f80: Remove unnecessary get(store) calls

## 5.0.8

### Patch Changes

- 104ba90: Republishing due to <TransformControls> inconsistency

## 5.0.7

### Patch Changes

- 185c15f: Fixes a bug where the TransformControls would not re-enable the OrbitControls after auto-pausing.

## 5.0.6

### Patch Changes

- 357bb54: fixes a bug where if the initial value was nullish, it wasn't reset

## 5.0.5

### Patch Changes

- 20ed409: Expose Props, Events and Slots type to move forward with v5 syntax exposure and abstraction abilities

## 5.0.4

### Patch Changes

- 5e475db: More robust rendering of props

## 5.0.3

### Patch Changes

- ff8ae66: Added optimizations to check if the \$\$restProps actually changed
- c969ea4: Rolling back changes about base props. Changing a base prop and a restProp would NOT update the restProp, which is undesirable

## 5.0.2

### Patch Changes

- 920c040: Fixed a bug where the cameras updater would run on size changes

## 5.0.1

### Patch Changes

- 7b3aced: Prop types should be optional

## 5.0.0

### Major Changes

- 2a44ca8: This release introduces rendering as a concept to `@threlte/core` and subsequently to all other packages. See https://threlte.xyz/core-transition for details.

## 4.3.3

### Patch Changes

- f0449df: Pass the default THREE.DefaultLoadingManager to all relevant loaders

## 4.3.2

### Patch Changes

- 45d018d: OrthographicCamera component now accepts all frustum props

## 4.3.1

### Patch Changes

- 6d81f56: force disposing resources on Canvas unmounting

## 4.3.0

### Minor Changes

- 36cb173: Advanced automatic disposal: a resource is not disposed when it's still present somewhere in the scene graph

## 4.2.0

### Minor Changes

- 834f333: Added a new property "userData" which is useful to debug, add custom properties and filter objects
- a066d3b: Added automatic disposal of three.js objects. See documentation for more info.

### Patch Changes

- 458c49b: proper prop types on `<Object3DInstance>`

## 4.1.3

### Patch Changes

- f7abfad: Line2 now accepts an empty points array as well as points length changes

## 4.1.2

### Patch Changes

- cd07968: Validate click events to make sure the last pointerdown event hit the same instance as the click
  event did. This heuristic more closely resembles how the DOM works, and prevents accidental clicks
  while e.g. using OrbitControls or otherwise dragging on the canvas.

## 4.1.1

### Patch Changes

- 287e8eb: Fixed broken interactivity on MeshInstance at element 0 (@Klowes)

## 4.1.0

### Minor Changes

- e310ff5: Added export of trait components, see docs

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
