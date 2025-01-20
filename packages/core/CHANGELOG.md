# @threlte/core

## 8.0.0

### Major Changes

- 98b9789: Change oncreate API to return a cleanup function instead of passing it to a function argument
- e7b0273: Make AgXToneMapping the default toneMapping
- f25685a: Experimental Svelte 5 compatibility
- 5d3d231: Remove automatic deeply recursive disposal in favor of disposal of objects that are referenced by a `<T>` component.
- b7e6927: Refactor attachment API
- 6ead49a: Added new View component. Adjusted core and other components to make use of the changes.
- 6016286: Remove memoize, remove createObjectStore
- 6016286: Refactored Threlte Plugin API
- 6e8bcc2: Stricter types on dispose, args, makeDefault and manual

### Minor Changes

- 10ceb5b: Add UserProps
- 0f84459: Add preliminary event types on `<T>`
- cec4b57: Make children snippet arguments a type parameter on type `Props`
- 1c73aa0: Add the isInstanceOf utility function
- d7eb71b: Custom user catalogue types

### Patch Changes

- 6aced15: Fix types of component exports
- a8f7cc0: Expose fragment contexts
- b7045f5: Svelte dependency update
- 9f00bd3: Return context from createThrelteContext
- 52d0b9f: fix: remove .d.ts import from dist/index.js
- d36f77f: fix: Set `started` store of `useTask` correctly
- c12ff98: Fix event cleanup of <T>
- f7c501d: Remove legacy useFrame and useRender hooks
- 2ccf508: Remove userSize canvas prop
- fa8a61c: Bump Svelte compiler version
- 2ac3d48: Dependency updates
- 81e354d: Remove deprecated event handling from export
- 4154987: Added toCurrentReadable to storeUtils
- cec4b57: update deps
- ccafaaa: Fix renderer resize flickering
- f102bfb: Simplify resizeObserver.
- e732e58: export `Size` type from contexts/canvas to fix import errors regarding `Size` not being an export. for example in `useViewport`
- d44a1d3: Replace dependency of useThrelte in useTask hook with useSheduler hook instead
- 45fae01: Granular updates on T
- a340d61: Fix setting camera context in useCamera
- b8b8214: Implement type guard utility, clean up
- 89d4fd5: Fix core types entry for dev
- 36128d5: Replace events with callback props and slots with snippets
- cc4ccf2: Update Three.js
- 4ee76e8: JSDocs cleanup
- 3a1ae36: fix: Include auto-generated d.ts file
- 60fcc29: Bump dev dependencies
- 7051420: Inline type-fest types
- 750550b: Remove useLegacyLights prop
- 6a442b9: Allow dispose prop on every T instance
- 1791c99: useTask invalidation fix
- f76d1e4: Migrate additional components to runes mode
- a257643: Update Svelte + Three.js deps
- c53d7a9: Split out contexts by domain
- 42ee4c9: Fix svelte compiler warnings
- 790794d: Add HUD component and useViewport hook
- eae09cd: Fix `<T>` types

## 8.0.0-next.41

### Patch Changes

- 9f00bd3: Return context from createThrelteContext

## 8.0.0-next.40

### Patch Changes

- 1791c99: useTask invalidation fix

## 8.0.0-next.39

### Patch Changes

- f102bfb: Simplify resizeObserver.

## 8.0.0-next.38

### Patch Changes

- 6a442b9: Allow dispose prop on every T instance

## 8.0.0-next.37

### Major Changes

- 6ead49a: Added new View component. Adjusted core and other components to make use of the changes.

## 8.0.0-next.36

### Patch Changes

- a257643: Update Svelte + Three.js deps

## 8.0.0-next.35

### Patch Changes

- 4ee76e8: JSDocs cleanup

## 8.0.0-next.34

### Patch Changes

- 89d4fd5: Fix core types entry for dev

## 8.0.0-next.33

### Patch Changes

- 52d0b9f: fix: remove .d.ts import from dist/index.js

## 8.0.0-next.32

### Minor Changes

- d7eb71b: Custom user catalogue types

## 8.0.0-next.31

### Patch Changes

- e732e58: export `Size` type from contexts/canvas to fix import errors regarding `Size` not being an export. for example in `useViewport`

## 8.0.0-next.30

### Patch Changes

- eae09cd: Fix `<T>` types

## 8.0.0-next.29

### Minor Changes

- 10ceb5b: Add UserProps

## 8.0.0-next.28

### Patch Changes

- 60fcc29: Bump dev dependencies

## 8.0.0-next.27

### Patch Changes

- 3a1ae36: fix: Include auto-generated d.ts file

## 8.0.0-next.26

### Major Changes

- 6e8bcc2: Stricter types on dispose, args, makeDefault and manual

## 8.0.0-next.25

### Major Changes

- 5d3d231: Remove automatic deeply recursive disposal in favor of disposal of objects that are referenced by a `<T>` component.

## 8.0.0-next.24

### Minor Changes

- 0f84459: Add preliminary event types on `<T>`

### Patch Changes

- d44a1d3: Replace dependency of useThrelte in useTask hook with useSheduler hook instead

## 8.0.0-next.23

### Minor Changes

- cec4b57: Make children snippet arguments a type parameter on type `Props`

### Patch Changes

- cec4b57: update deps

## 8.0.0-next.22

### Major Changes

- 6016286: Remove memoize, remove createObjectStore
- 6016286: Refactored Threlte Plugin API

## 8.0.0-next.21

### Patch Changes

- b7045f5: Svelte dependency update

## 8.0.0-next.20

### Minor Changes

- 1c73aa0: Add the isInstanceOf utility function

### Patch Changes

- b8b8214: Implement type guard utility, clean up

## 8.0.0-next.19

### Patch Changes

- 2ac3d48: Dependency updates

## 8.0.0-next.18

### Patch Changes

- a340d61: Fix setting camera context in useCamera

## 8.0.0-next.17

### Major Changes

- b7e6927: Refactor attachment API

## 8.0.0-next.16

### Major Changes

- 98b9789: Change oncreate API to return a cleanup function instead of passing it to a function argument

## 8.0.0-next.15

### Patch Changes

- 7051420: Inline type-fest types

## 8.0.0-next.14

### Patch Changes

- 6aced15: Fix types of component exports

## 8.0.0-next.13

### Patch Changes

- c12ff98: Fix event cleanup of <T>

## 8.0.0-next.12

### Patch Changes

- cc4ccf2: Update Three.js

## 8.0.0-next.11

### Major Changes

- e7b0273: Make AgXToneMapping the default toneMapping

## 8.0.0-next.10

### Patch Changes

- fa8a61c: Bump Svelte compiler version
- 81e354d: Remove deprecated event handling from export

## 8.0.0-next.9

### Patch Changes

- a8f7cc0: Expose fragment contexts
- d36f77f: fix: Set `started` store of `useTask` correctly
- 4154987: Added toCurrentReadable to storeUtils
- 790794d: Add HUD component and useViewport hook

## 8.0.0-next.8

### Patch Changes

- 42ee4c9: Fix svelte compiler warnings

## 8.0.0-next.7

### Patch Changes

- c53d7a9: Split out contexts by domain

## 8.0.0-next.6

### Patch Changes

- 36128d5: Replace events with callback props and slots with snippets

## 8.0.0-next.5

### Patch Changes

- 2ccf508: Remove userSize canvas prop
- 750550b: Remove useLegacyLights prop

## 8.0.0-next.4

### Patch Changes

- f7c501d: Remove legacy useFrame and useRender hooks

## 8.0.0-next.3

### Patch Changes

- ccafaaa: Fix renderer resize flickering

## 8.0.0-next.2

### Patch Changes

- f76d1e4: Migrate additional components to runes mode

## 8.0.0-next.1

### Patch Changes

- 45fae01: Granular updates on T

## 8.0.0-next.0

### Major Changes

- Experimental Svelte 5 compatibility

## 7.3.1

### Patch Changes

- 79b002b: Add missing package.json fields to improve npmjs.com pages

## 7.3.0

### Minor Changes

- e9ae00d: add createThrelteContext export

## 7.2.1

### Patch Changes

- 6ed92af: Cleaned up default camera creation and removed unused ThrelteUserData type
- d0fbeb5: Import paths rewrote to include file extensions for Three.js imports that are outside of the main 'three' export.

## 7.2.0

### Minor Changes

- cd5f31d: Remove deprecated encoding-related code to allow compatibility with r162.

  ### Migration

  Three.js r152 or later is now required.

## 7.1.2

### Patch Changes

- 36f8eef: Import fix

## 7.1.1

### Patch Changes

- 7b90778: Small `<T>` optimizations

## 7.1.0

### Minor Changes

- 127c03f: Remove children binding from HierarchicalObject component

## 7.0.12

### Patch Changes

- 722f8c27: Export Three.js revision int

## 7.0.11

### Patch Changes

- 04ac53aa: Added args to useLoader options

## 7.0.10

### Patch Changes

- 94f687ec: fix: respect useTask autoStart

## 7.0.9

### Patch Changes

- 22373297: Remove mitt from peer dependencies

## 7.0.8

### Patch Changes

- 1c8f29bb: Fixed sorting flag check on DAG

## 7.0.7

### Patch Changes

- 71797f73: Minor optimizations to internal frame scheduling classes (preparations for devtools)

## 7.0.6

### Patch Changes

- 60b78f27: useTask: key can be an actual Key type

## 7.0.5

### Patch Changes

- 6729814b: Fixed eslint config and fixed some linting errors

## 7.0.4

### Patch Changes

- 3cc3fdcc: Removed bun types from @threlte/core tsconfig to fix useLoader type export (affects possibly other packages)

## 7.0.3

### Patch Changes

- 407640a8: hotfix: remove console import

## 7.0.2

### Patch Changes

- cc4085d2: Fixes a bug where calling `useThrelte().shouldRender()` resets the invalidation flags and makes it impossible to invoke more than once per frame.

## 7.0.1

### Patch Changes

- ac981216: Fixed useTask options

## 7.0.0

### Major Changes

- 44488636: See the [migration guide](https://threlte.xyz/docs/learn/advanced/migration-guides#threlte-7)

## 6.1.1

### Patch Changes

- f026619b: Eagerly set canvas size on start

## 6.1.0

### Minor Changes

- 8b55284e: Added `loader.load` support to `useLoader`

## 6.0.10

### Patch Changes

- 34741ea7: \* (xr) - useHitTest: Allow hit testing from controllers / hands
  - (core) - Do not attempt to resize renderer when in an immersive xr session

## 6.0.9

### Patch Changes

- 17f938b: Make canvas properties reactive and document non-reactive properties

## 6.0.8

### Patch Changes

- b08a992d: Add error messages to context-based hooks

## 6.0.7

### Patch Changes

- e05c73a: Add @threlte/xr package and bump three to 155

## 6.0.6

### Patch Changes

- 0602a68: Removed circular import, cleanup

## 6.0.5

### Patch Changes

- c886c65: Set useLegacyLights to false if greater than or equal to r155

## 6.0.4

### Patch Changes

- 6e5f929: fix size store to provide fresh new object on change

## 6.0.3

### Patch Changes

- dfa5cbd: Use peer dependencies for svelte and three

Note: We're considering this a bug fix, but it might be a breaking change for you depending on your setup. If you run into dependency issues, reinstall the packages following the [installation guide](https://threlte.xyz/docs/learn/getting-started/installation).

## 6.0.2

### Patch Changes

- 7424123: Remove optional type for renderer

## 6.0.1

### Patch Changes

- ee1d319: Update package READMEs to fix banners.
- 5bb6746: Use a resize observer for handling parent size

## 6.0.0

### Major Changes

- f0065c38: Removed components <Line>, <Line2>, <LineSegments> and <LineInstance>
- fef242de: Removed the stale types of Pass, removed MeshInstance, Object3DInstance, Instance and InstancedMesh from core.
- eb0dc69f: Removed the component TransformableObject, removed stale types from rapier package
- ae514436: Moved <TransformControls> from core to extras, added createRawEventDispatcher to core
- e28b8ada: Move audio context and components to extras
- d649e237: Removed <Mesh> and respective type exports
- 45821797: Remove components for lights, update docs and examples to v5
- d9647fdc: Changed the default lighting mode from legacy to physical
- a764739: Removed type export "InstanceProps"
- a39ccd68: Removed ViewportAwareObject (replaced in user-land by plugins)

### Minor Changes

- a27edc5f: Added option "useLegacyLights" on Canvas component, now defaulting to "true" to stay in line with defaults of three.js. Added prop types to plugins
- 9291b0c: Added strong event map types for component "T"
- 848af1ae: Added useRender: a hook that runs code after a frame has been invalidated, typically to implement custom render pipelines. Added the option to not automatically invalidate a frame with useFrame.

### Patch Changes

- 4b67b473: Event on:create bugfix
- e58cb58: Use three.js REVISION export for breaking api changes
- 3868395: Updated prettier
- b14aa99: removed unused hook, cleaned up types and improved create event of T component.
- 71f5efa: Sort render and frame handlers only when new ordered callbacks are introduced
- 5238844: Updated all packages to use Svelte 4, minimal Svelte version is 4.1.1
- 4bcf0ee: changed return signature of useSuspense->suspend
- 3a9a26c: Changed return signature of asyncWritable
- 2943cb3: Fixed a bug which could lead to memory leaks, removed unused type import
- b845685: replace requestanimationframe with setanimationloop
- d9fdbd7: Collocate types with respective hooks and components

## 6.0.0-next.12

### Major Changes

- [#380](https://github.com/threlte/threlte/pull/380) [`a764739`](https://github.com/threlte/threlte/commit/a764739674a9d97c9f43fe40cee2f0893116b5ac) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Removed type export "InstanceProps"

### Patch Changes

- [#454](https://github.com/threlte/threlte/pull/454) [`e58cb58`](https://github.com/threlte/threlte/commit/e58cb5842e9a77240376c30827f046ad75afa17f) Thanks [@michealparks](https://github.com/michealparks)! - Use three.js REVISION export for breaking api changes

- [#380](https://github.com/threlte/threlte/pull/380) [`5238844`](https://github.com/threlte/threlte/commit/523884441ec8d7d2894f7ab3dbde2aecc68cf2bf) Thanks [@grischaerbe](https://github.com/grischaerbe)! - Updated all packages to use Svelte 4, minimal Svelte version is 4.1.1

## 6.0.0-next.11

### Patch Changes

- 3868395: Updated prettier
- 71f5efa: Sort render and frame handlers only when new ordered callbacks are introduced

## 6.0.0-next.10

### Patch Changes

- b845685: replace requestanimationframe with setanimationloop

## 6.0.0-next.9

### Patch Changes

- b14aa99: removed unused hook, cleaned up types and improved create event of T component.

## 6.0.0-next.8

### Patch Changes

- 2943cb32: Fixed a bug which could lead to memory leaks, removed unused type import

## 6.0.0-next.7

### Minor Changes

- 9291b0cf: Added strong event map types for component "T"

## 6.0.0-next.6

### Patch Changes

- d9fdbd7f: Collocate types with respective hooks and components

## 6.0.0-next.5

### Patch Changes

- 4bcf0ee4: changed return signature of useSuspense->suspend

## 6.0.0-next.4

### Patch Changes

- 3a9a26c6: Changed return signature of asyncWritable

## 6.0.0-next.3

### Major Changes

- fef242de: Removed the stale types of Pass, removed MeshInstance, Object3DInstance, Instance and InstancedMesh from core.
- eb0dc69f: Removed the component TransformableObject, removed stale types from rapier package
- a39ccd68: Removed ViewportAwareObject (replaced in user-land by plugins)

## 6.0.0-next.2

### Patch Changes

- 4b67b473: Event on:create bugfix

## 6.0.0-next.1

### Major Changes

- d9647fdc: Changed the default lighting mode from legacy to physical

### Minor Changes

- a27edc5f: Added option "useLegacyLights" on Canvas component, now defaulting to "true" to stay in line with defaults of three.js. Added prop types to plugins

## 6.0.0-next.0

### Major Changes

- f0065c38: Removed components <Line>, <Line2>, <LineSegments> and <LineInstance>
- ae514436: Moved <TransformControls> from core to extras, added createRawEventDispatcher to core
- e28b8ada: Move audio context and components to extras
- d649e237: Removed <Mesh> and respective type exports
- 45821797: Remove components for lights, update docs and examples to v5

### Minor Changes

- 848af1ae: Added useRender: a hook that runs code after a frame has been invalidated, typically to implement custom render pipelines. Added the option to not automatically invalidate a frame with useFrame.

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
