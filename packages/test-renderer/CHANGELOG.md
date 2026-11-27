# @threlte/test

## 2.1.0

### Minor Changes

- 60a6d23: feat: add mesh to canvas pos helper
- 996b9d6: `render()` now automatically advances the scheduler once with `delta: 0` after mounting

## 2.0.2

### Patch Changes

- d5ba463: Use granular state updates on rerender

## 2.0.1

### Patch Changes

- 88d0a21: Set "autoRender" to true

## 2.0.0

### Major Changes

- 8a165eb: Rewrites internal architecture to align with @testing-library/svelte:
  - discrete modules for cleanup, mounting, setup, and props replace the old core / directory
  - Drop all Svelte 3/4 legacy code paths; Svelte 5 only
  - Use Proxy-based shallow reactive props ($state.raw) instead of $state with Object.assign
  - Task-based cleanup system with addCleanupTask/removeCleanupTask replaces the dual-Set (targetCache/componentCache) approach
  - advance() now returns { frameInvalidated: boolean } for testing on-demand and manual render mode invalidation logic
  - Container accepts contextOptions via renderOptions.context for passing
  - Canvas-level props like colorSpace, toneMapping, shadows, and dpr
  - Container uses a properly sized DOM element so getBoundingClientRect() returns real dimensions, fixing default camera aspect ratio
  - Vite plugin skips adding auto-cleanup setup files when test.globals is enabled

## 1.0.0

### Major Changes

- f685b2d: Add Threlte 8 support, remove Threlte 7 support

## 0.2.9

### Patch Changes

- dc90952: Use external context frameInvalidated prop

## 0.2.8

### Patch Changes

- 6a5112a: Support Threlte 8 frame advancing

## 0.2.7

### Patch Changes

- fa611e8: Add support for Threlte 8 dom context

## 0.2.6

### Patch Changes

- a80bc21: Remove SceneGraphObject usage

## 0.2.5

### Patch Changes

- 6cfe498: Fix exported types

## 0.2.4

### Patch Changes

- 21bdb2b: Fix memory leak and potential props clash

## 0.2.3

### Patch Changes

- a54d0ce: Create threlte cache for every test

## 0.2.2

### Patch Changes

- f4f821a: Return frameInvalidated from advance function

## 0.2.1

### Patch Changes

- 8efcb4e: Add type export

## 0.2.0

### Minor Changes

- 95aaf3d: Add vite plugin

## 0.1.1

### Patch Changes

- f40f5fe: Swallow THREE multiple instances warning

## 0.1.0

### Minor Changes

- 73f1a2f: Initial release

## 0.0.2

### Patch Changes

- ba56072: Initial release

## 0.0.1

### Patch Changes

- b045a91: Initial release
