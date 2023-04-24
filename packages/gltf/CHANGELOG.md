# @threlte/gltf

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
