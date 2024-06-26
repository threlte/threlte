# @threlte/gltf

## 3.0.0-next.1

### Patch Changes

- 36128d5: Replace events with callback props and slots with snippets

## 3.0.0-next.0

### Major Changes

- e27c1e4: Remove forwardEventHandlers from generated svelte files

## 2.0.3

### Patch Changes

- f7f561d: Downgraded sharp

## 2.0.2

### Patch Changes

- 4fbfab2: updating sharp dependency

## 2.0.1

### Patch Changes

- 3cc3fdcc: Removed bun types from @threlte/core tsconfig to fix useLoader type export (affects possibly other packages)

## 2.0.0

### Major Changes

- 15a15873: Removed pascal-casing of output file in favor of more reliable output file naming for automation purposes. The output file will now be 1:1 filename.glb -> filename.svelte.

## 1.0.1

### Patch Changes

- ee1d319: Update package READMEs to fix banners.

## 1.0.0

### Major Changes

- a07850e4: Removed the name from the exported preload function (seems silly and might collide anyway), updated deps and included three-stdlib instead of rolling an own implementation of GLTFLoader and DRACOLoader. Added option to make the component suspense-ready, updated README.
- 3a5376e2: Adapted gltf package to Threlte 6 T syntax
- d5abde5: Simplified root option to more reasonable approach. When no root is given, the path supplied will be normalized and used as a file path, if root is given, takes full control.

### Minor Changes

- e91cc09: await instead of if clause for less if-blocks (helps with transitions)
- 72c71414: Added option to add a preload method that makes preloading an asset easy. Also, added the option to make an isolated component (so no \$\$restProps usage)
- 05d9170: Added forwarding event handlers

### Patch Changes

- 6d56d11: Added proper types for new slots error & fallback
- 119a04d: Downgrading three and reusing own GLTFLoader and DRACOLoader implementations
- 89e0c7a: Updated dependencies
- 16e75c31: Fixed a bug where the suspense was created in the wrong place when preloading was activated.
- da70d570: typo
- 81834dd4: Refactored the pascal case function
- 124eabab: Fixed preload method to return a Promise
- 89710f3: Removed logs

## 1.0.0-next.13

### Major Changes

- d5abde5: Simplified root option to more reasonable approach. When no root is given, the path supplied will be normalized and used as a file path, if root is given, takes full control.

## 1.0.0-next.12

### Patch Changes

- 6d56d11c: Added proper types for new slots error & fallback

## 1.0.0-next.11

### Minor Changes

- e91cc094: await instead of if clause for less if-blocks (helps with transitions)

## 1.0.0-next.10

### Minor Changes

- 05d91701: Added forwarding event handlers

## 1.0.0-next.9

### Patch Changes

- 89710f3e: Removed logs

## 1.0.0-next.8

### Patch Changes

- 119a04d1: Downgrading three and reusing own GLTFLoader and DRACOLoader implementations

## 1.0.0-next.7

### Patch Changes

- 89e0c7a9: Updated dependencies

## 1.0.0-next.6

### Patch Changes

- 81834dd4: Refactored the pascal case function

## 1.0.0-next.5

### Patch Changes

- da70d570: typo

## 1.0.0-next.4

### Patch Changes

- 16e75c31: Fixed a bug where the suspense was created in the wrong place when preloading was activated.

## 1.0.0-next.3

### Major Changes

- a07850e4: Removed the name from the exported preload function (seems silly and might collide anyway), updated deps and included three-stdlib instead of rolling an own implementation of GLTFLoader and DRACOLoader. Added option to make the component suspense-ready, updated README.

## 1.0.0-next.2

### Patch Changes

- 124eabab: Fixed preload method to return a Promise

## 1.0.0-next.1

### Minor Changes

- 72c71414: Added option to add a preload method that makes preloading an asset easy. Also, added the option to make an isolated component (so no \$\$restProps usage)

## 1.0.0-next.0

### Major Changes

- 3a5376e2: Adapted gltf package to Threlte 6 T syntax

## 0.0.5

### Patch Changes

- 8520f65: useDraco bugfix
