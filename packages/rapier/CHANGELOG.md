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

## 2.0.0

### Major Changes

- 04c9e7df: Replace internal usage of useFrame with useTask.

  ### Note

  `@threlte/core@7` is now required.

## 1.1.4

### Patch Changes

- 3cc3fdcc: Removed bun types from @threlte/core tsconfig to fix useLoader type export (affects possibly other packages)

## 1.1.3

### Patch Changes

- a3f9cc43: \* Add create event for RigidBody, Collider, and AutoCollider
  - Set `frustumCulled = true` on `<Debug>`
  - Minor performance improvements

## 1.1.2

### Patch Changes

- e05c73a: Add @threlte/xr package and bump three to 155

## 1.1.1

### Patch Changes

- 204838b: Added proper event types to `<RigidBody>` components, updated from `SvelteComponentTyped` to `SvelteComponent`

## 1.1.0

### Minor Changes

- 6239c5b: Added prop for userData on `<RigidBody>`

## 1.0.4

### Patch Changes

- dfa5cbd: Use peer dependencies for svelte and three

Note: We're considering this a bug fix, but it might be a breaking change for you depending on your setup. If you run into dependency issues, reinstall the packages following the [installation guide](https://threlte.xyz/docs/learn/getting-started/installation).

## 1.0.3

### Patch Changes

- 7424123: Remove optional type for renderer

## 1.0.2

### Patch Changes

- ee1d319: Update package READMEs to fix banners.

## 1.0.1

### Patch Changes

- 3a68dcf: fix: Replaced instances of "instanceof" with checks that are cross-source compatible

## 1.0.0

### Major Changes

- 4b67b473: Removed transform properties on rapier components Collider, AutoColliders and RigidBody
- d41cb6cf: Adapted rapier package to Threlte v6 syntax

### Patch Changes

- 3868395: Updated prettier
- eb0dc69f: Removed the component TransformableObject, removed stale types from rapier package
- 5238844: Updated all packages to use Svelte 4, minimal Svelte version is 4.1.1

## 1.0.0-next.4

### Patch Changes

- [#380](https://github.com/threlte/threlte/pull/380) [`5238844`](https://github.com/threlte/threlte/commit/523884441ec8d7d2894f7ab3dbde2aecc68cf2bf) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Updated all packages to use Svelte 4, minimal Svelte version is 4.1.1

## 1.0.0-next.3

### Patch Changes

- 3868395: Updated prettier

## 1.0.0-next.2

### Patch Changes

- eb0dc69f: Removed the component TransformableObject, removed stale types from rapier package

## 1.0.0-next.1

### Major Changes

- 4b67b473: Removed transform properties on rapier components Collider, AutoColliders and RigidBody

## 1.0.0-next.0

### Major Changes

- d41cb6cf: Adapted rapier package to Threlte v6 syntax

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
