# @threlte/extras

## 3.0.0-next.2

### Patch Changes

- 36128d5: Replace events with callback props and slots with snippets

## 3.0.0-next.1

### Patch Changes

- f76d1e4: Migrate additional components to runes mode

## 3.0.0-next.0

### Major Changes

- Experimental Svelte 5 compatibility

### Patch Changes

- Updated dependencies
  - @threlte/extras@9.0.0-next.0
  - @threlte/core@8.0.0-next.0

## 2.1.7

### Patch Changes

- d0fbeb5: Import paths rewrote to include file extensions for Three.js imports that are outside of the main 'three' export.

## 2.1.6

### Patch Changes

- 4f7de350: Theatre module fix

## 2.1.5

### Patch Changes

- 3cc3fdcc: Removed bun types from @threlte/core tsconfig to fix useLoader type export (affects possibly other packages)

## 2.1.4

### Patch Changes

- 2ae76e18: Threlte 7 compatibility

## 2.1.3

### Patch Changes

- c5cf4080: Fix color management of Theatre.js color picker

## 2.1.2

### Patch Changes

- e05c73a: Add @threlte/xr package and bump three to 155

## 2.1.1

### Patch Changes

- ef17718: fix: imported theatre/core from own named exports

## 2.1.0

### Minor Changes

- 82ee149: Added capturing in <Sync> component

## 2.0.0

### Patch Changes

- a6c4a56: Fix: dynamically import studio component instead of npm package
- Updated dependencies [9c0035e]
  - @threlte/extras@5.1.0

## 1.0.5

### Patch Changes

- dfa5cbd: Use peer dependencies for svelte and three

Note: We're considering this a bug fix, but it might be a breaking change for you depending on your setup. If you run into dependency issues, reinstall the packages following the [installation guide](https://threlte.xyz/docs/learn/getting-started/installation).

- Updated dependencies [dfa5cbd]
  - @threlte/extras@5.0.5
  - @threlte/core@6.0.3

## 1.0.4

### Patch Changes

- Updated dependencies [7424123]
  - @threlte/extras@5.0.4
  - @threlte/core@6.0.2

## 1.0.3

### Patch Changes

- Updated dependencies [5b74e1a]
  - @threlte/extras@5.0.3

## 1.0.2

### Patch Changes

- ee1d319: Update package READMEs to fix banners.
- Updated dependencies [ee1d319]
- Updated dependencies [5bb6746]
  - @threlte/core@6.0.1
  - @threlte/extras@5.0.2

## 1.0.1

### Patch Changes

- 3a68dcf: fix: Replaced instances of "instanceof" with checks that are cross-source compatible
- Updated dependencies [3a68dcf]
  - @threlte/extras@5.0.1

## 1.0.0

### Major Changes

- a764739: Renamed slotted components of <SheetObject> to <Sync>, <Declare> and <Transform>, added change event on <SheetObject>
- 3756ba2: Removed <Editable> component

### Minor Changes

- 3f0ce85: Added Sequence component and SequenceController store
- 4b67b473: The hook useStudio exposes Theatre.js' studio instance.
- df6ca2d: Added snap settings to <Transform>

### Patch Changes

- d4612fc: unsubscribe in createSheetObjectAction
- 3868395: Updated prettier
- d41cb6cf: Adapted theatre package to new TransformControls syntax
- 1ef92b9: fixed frame invalidation after values changed
- 5238844: Updated all packages to use Svelte 4, minimal Svelte version is 4.1.1
- Updated dependencies [f0065c38]
- Updated dependencies [f9f8e61]
- Updated dependencies [33c37682]
- Updated dependencies [300cbe4e]
- Updated dependencies [9526d5d]
- Updated dependencies [4b67b473]
- Updated dependencies [bd4a4b76]
- Updated dependencies [151cdc08]
- Updated dependencies [dd686a7]
- Updated dependencies [e58cb58]
- Updated dependencies [3868395]
- Updated dependencies [5df4ca0]
- Updated dependencies [1f4e3e0]
- Updated dependencies [fef242de]
- Updated dependencies [fcfcc0e4]
- Updated dependencies [1505665]
- Updated dependencies [eb0dc69f]
- Updated dependencies [ae514436]
- Updated dependencies [0620502]
- Updated dependencies [b14aa99]
- Updated dependencies [2720cd4]
- Updated dependencies [e28b8ada]
- Updated dependencies [fef242de]
- Updated dependencies [a27edc5f]
- Updated dependencies [8ed809b2]
- Updated dependencies [8734041]
- Updated dependencies [d649e237]
- Updated dependencies [9291b0c]
- Updated dependencies [45821797]
- Updated dependencies [71f5efa]
- Updated dependencies [feab5e8]
- Updated dependencies [848af1ae]
- Updated dependencies [5238844]
- Updated dependencies [4b67b473]
- Updated dependencies [d9647fdc]
- Updated dependencies [aac59eb1]
- Updated dependencies [4bcf0ee]
- Updated dependencies [3a9a26c]
- Updated dependencies [a764739]
- Updated dependencies [23049766]
- Updated dependencies [15309755]
- Updated dependencies [b71145ea]
- Updated dependencies [2943cb3]
- Updated dependencies [4b67b473]
- Updated dependencies [b845685]
- Updated dependencies [d9fdbd7]
- Updated dependencies [4b383b0a]
- Updated dependencies [5ba62e2]
- Updated dependencies [a39ccd68]
- Updated dependencies [df4b307b]
  - @threlte/core@6.0.0
  - @threlte/extras@5.0.0

## 1.0.0-next.3

### Major Changes

- [#380](https://github.com/threlte/threlte/pull/380) [`a764739`](https://github.com/threlte/threlte/commit/a764739674a9d97c9f43fe40cee2f0893116b5ac) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Renamed slotted components of <SheetObject> to <Sync>, <Declare> and <Transform>, added change event on <SheetObject>

- [#380](https://github.com/threlte/threlte/pull/380) [`3756ba2`](https://github.com/threlte/threlte/commit/3756ba2a866a898dbd85ad506ed5f63477f2c21c) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Removed <Editable> component

### Minor Changes

- [#380](https://github.com/threlte/threlte/pull/380) [`3f0ce85`](https://github.com/threlte/threlte/commit/3f0ce85b965422f4d87496fb3b3be0cdfe33fd9e) Thanks [@ixxie](https://github.com/ixxie)! - Added Sequence component and SequenceController store

- [#380](https://github.com/threlte/threlte/pull/380) [`df6ca2d`](https://github.com/threlte/threlte/commit/df6ca2d89af8c5df11bfa26a21ad5b321c852dbe) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Added snap settings to <Transform>

### Patch Changes

- [#380](https://github.com/threlte/threlte/pull/380) [`d4612fc`](https://github.com/threlte/threlte/commit/d4612fc02c4587c2f1fc9fe46738c2c340c2a0d0) Thanks [@grischaerbe](https://github.com/grischaerbe)! - unsubscribe in createSheetObjectAction

- [#380](https://github.com/threlte/threlte/pull/380) [`1ef92b9`](https://github.com/threlte/threlte/commit/1ef92b9aac89fbefdc23d3b25e59068b482d13f5) Thanks [@grischaerbe](https://github.com/grischaerbe)! - fixed frame invalidation after values changed

- [#380](https://github.com/threlte/threlte/pull/380) [`5238844`](https://github.com/threlte/threlte/commit/523884441ec8d7d2894f7ab3dbde2aecc68cf2bf) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Updated all packages to use Svelte 4, minimal Svelte version is 4.1.1

- Updated dependencies [[`9526d5d`](https://github.com/threlte/threlte/commit/9526d5d2d6285b8ddb8c81dc9e6ce819a90db193), [`e58cb58`](https://github.com/threlte/threlte/commit/e58cb5842e9a77240376c30827f046ad75afa17f), [`0620502`](https://github.com/threlte/threlte/commit/0620502ba9d9fbd0fc15100c298816130ed526d7), [`5238844`](https://github.com/threlte/threlte/commit/523884441ec8d7d2894f7ab3dbde2aecc68cf2bf), [`a764739`](https://github.com/threlte/threlte/commit/a764739674a9d97c9f43fe40cee2f0893116b5ac)]:
  - @threlte/extras@5.0.0-next.17
  - @threlte/core@6.0.0-next.12

## 0.1.0-next.2

### Patch Changes

- 3868395: Updated prettier

## 0.1.0-next.1

### Minor Changes

- 4b67b473: The hook useStudio exposes Theatre.js' studio instance.

## 0.0.3-next.0

### Patch Changes

- d41cb6cf: Adapted theatre package to new TransformControls syntax

## 0.0.2

### Patch Changes

- 8e1b3d4: Unsubscribe from theatre.js sheet object onDestroy

## 0.5.0

### Minor Changes

- d69391a: Add Attractor component and documentation

## 0.4.0

### Minor Changes

- 4b4d7be: Added rapiers damping properties to the component <RigidBody>

## 0.3.2

### Patch Changes

- c7e226f: useJoint is now exported and its types are fixed

## 0.3.1

### Patch Changes

- 9d29fc0: removed unused variable

## 0.3.0

### Minor Changes

- 1a0f305: removed properties "manifold" and "flipped" from contact force event

### Patch Changes

- 291af9b: Exporting rapier event types for easier method typing

## 0.2.0

### Minor Changes

- 73b533d: Added contact force events and streamlined event management

### Patch Changes

- 7d46de2: sensors need events too!

## 0.1.0

### Minor Changes

- c272617: Hooks added to add Joints, Collider and AutoColliders now accepts density, mass or massProperties, documentation for joints hooks added, "Basic Vehicle Controller" Recipe added.

## 0.0.3

### Patch Changes

- cd6dac6: cleaned up dead code in RigidBody component

## 0.0.2

### Patch Changes

- 62d2c5c: fixed `<RigidBody>` initial transforms

## 0.0.1

### Patch Changes

- 7a3fa6b: # NEW PACKAGE: @threlte/rapier

  This package provides easy to use components and hooks to use the [rapier](https://rapier.rs/) physics engine in threlte.

  It comes with several components to get you started: [`<World>`](https://threlte.xyz/rapier/world), [`<RigidBody>`](https://threlte.xyz/rapier/rigid-body), [`<Collider>`](https://threlte.xyz/rapier/collider), [`<AutoColliders>`](https://threlte.xyz/rapier/auto-colliders), [`<CollisionGroups>`](https://threlte.xyz/rapier/collision-groups) and [`<Debug>`](https://threlte.xyz/rapier/debug).

  It also features several handy hooks: [`<useRapier>`](https://threlte.xyz/rapier/use-rapier), [`<useCollisionGroups>`](https://threlte.xyz/rapier/use-collision-groups) and [`<useRigidBody>`](https://threlte.xyz/rapier/use-rigid-body).

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
