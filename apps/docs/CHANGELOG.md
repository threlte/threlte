# @threlte/docs-next

## 0.14.0-next.4

### Patch Changes

- 4c43bb8: modify useTexture docs. examples use svelte 5 effects, simplify `usage` section and modify headings
- 617f59f: change code snippets to svelte script since `useSuspence must be called in a script tag
- 26e5722: update examples to use svelte 5, use typescript as codeblock language for better highlighting. use `boolean` instead of `Boolean`

## 0.14.0-next.3

### Patch Changes

- a76b62a: replace all mentions of `BoxBufferGeometry` with `BoxGeometry`

## 0.14.0-next.2

### Patch Changes

- c67def6: rewrite of `useFBO` which adds more functionality and is easier to follow in its implementation
- 7e00f60: updates useFBO to use default options of `WebGLRenderTarget`

## 0.14.0-next.1

### Patch Changes

- 2acb567: [next] AsciiRenderer docs update

## 0.14.0-next.0

### Minor Changes

- aba6d5a: adds a <Detailed> component that can be used for displaying different level-of-detail for scene objects

## 0.13.1

### Patch Changes

- 761fc37: Removed font-family property

## 0.13.0

### Minor Changes

- ad7be7f: Added categories to the extras sidebar

## 0.12.0

### Minor Changes

- 842fef9: Added Mask component to Extras

## 0.11.0

### Minor Changes

- 85b9332: Add port of drei's MeshRefractionMaterial

## 0.10.0

### Minor Changes

- e702d7e9: Added a new useFBO hook to extras

## 0.9.0

### Minor Changes

- 2b11b030: Add port of FakeGlowMaterial r3f component from ektogamat

## 0.8.0

### Minor Changes

- dce129b4: Add port of Billboard component from drei

## 0.7.0

### Minor Changes

- b9f5db5c: Add TrackballControls

## 0.6.4

### Patch Changes

- 2df1367f: Add a gizmo component for heads-up camera control

## 0.6.3

### Patch Changes

- bbdd2109: Adjusted widths of lines in Cursor Lines example

## 0.6.2

### Patch Changes

- 348294f6: Added MeshLineMaterial and MeshLineGeometry to extras

## 0.6.1

### Patch Changes

- e05c73a: Add @threlte/xr package and bump three to 155

## 0.6.0

### Minor Changes

- 144b55a: Deprecated the component `<Center>` as it's being renamed to `<Align>`. Renamed the prop `autoCenter` to `auto`, renamed events and slot props accordingly.

## 0.5.0

### Minor Changes

- eb08fe3: Added right sidebar content: contribute (go to source, edit this page, …) & community (join our discord, twitter)
- e6daae5: Enhanced documentation structure and clarity by adding new categories and pages. Included improvements for category ordering in the sidebar. Renamed sections for brevity.

### Patch Changes

- 22b2e12: Added Tailwind to Stackblitz template via CDN for minimal Tailwind support

## 0.4.2

### Patch Changes

- 616bf1e: fix broken doc links and 404s: core/utilities, core/use-render, core/use-frame, extras/instance, extras/instanced-mesh

## 0.4.1

### Patch Changes

- d0745b9: Removed my own testimonial and added Aria's instead

## 0.4.0

### Minor Changes

- 25755e3: Added playground for extras, made `<Text>` component suspense-ready

## 0.3.1

### Patch Changes

- 6f49729: Fix: bad link in Rapier terrain example

## 0.3.0

### Minor Changes

- 0dbdd65: Added `<Center>` component

## 0.2.1

### Patch Changes

- 5b7363b: Fix: docs text and outline examples

## 0.2.0

### Minor Changes

- 9c0035e: Added `<SoftShadows>` component

### Patch Changes

- a6c4a56: Fix: dynamically import studio component instead of npm package

## 0.1.4

### Patch Changes

- 5f3a70e: install guide: Apply extras install on theatre install

## 0.1.3

### Patch Changes

- 7424123: Remove optional type for renderer

## 0.1.2

### Patch Changes

- ee1d319: Update package READMEs to fix banners.

## 0.1.1

### Patch Changes

- 3a68dcf: fix: Replaced instances of "instanceof" with checks that are cross-source compatible

## 0.1.0

### Minor Changes

- 45821797: Remove components for lights, update docs and examples to v5

### Patch Changes

- 818c8cf: add outline example to docs
- a0d72b5: remove debugger statements
- 1a2ad70: fixed up terrain physics example + explanation
- 079f53f: add example titles to doc page content as subtitle
- e28b8ada: Move audio context and components to extras
- 8734041: Add RoundedBoxGeometry component
- eb302d2e: Fix core-transition docs to match preprocessThrelte configuration docs
- 093a06b: maintain left sidebar scroll position on page change

## 0.0.2-next.3

### Patch Changes

- 8734041: Add RoundedBoxGeometry component

## 0.0.2-next.2

### Patch Changes

- 1a2ad70: fixed up terrain physics example + explanation
- 079f53f: add example titles to doc page content as subtitle

## 0.0.2-next.1

### Patch Changes

- 818c8cf: add outline example to docs
- a0d72b5: remove debugger statements
- 093a06b: maintain left sidebar scroll position on page change

## 0.0.2-next.0

### Patch Changes

- e28b8ada: Move audio context and components to extras
