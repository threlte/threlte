---
title: Grid
---

<script lang="ts">
import Example from '$examples/extras/grid/App.svelte'
</script>

!!!module_summary title="Grid"|sourcePath=components/Grid/Grid.svelte|name="Grid"|from=extras|type=component}

A robust implementation of a simple helper grid with multiple tweakable parameters.

<ExampleWrapper playgroundHref="/extras/helper-grid">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/extras/grid/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/extras/grid/Scene.svelte)

</div>
</ExampleWrapper>

!!!

# Usage

This component provides sensible defaults an you can simply initiate default grid with `<Grid/>`.

## Cells and Sections
Grid is split into cells and sections. **Cell** is meant to represent the smallest units on your grid, whereas **section** is a group of cells. You can adjust the size of the grid by changing the `cellSize` and `sectionSize` parameters. Size is in Three world units, so for example a mesh with `BoxGeometry(1,1,1)` will fit perfectly into a size 1 cell. By default a cell is 1 unit and a section 10, which means that a grid of 10x10 cells will be outlined with a section line.


## Lines
You can adjust the color and thickness of cell and section lines with `cellColor`, `cellThickness`, `sectionColor`, `sectionThickness`.

## Grid size and fading
The `<Grid/>` component is a `THREE.Mesh` with a `PlaneGeometry` attached to it. The `gridSize` parameter defines the size of the `PlaneGeometry`. 
You can extend the grid into infinity if you set the `infiniteGrid` parameter to `true`. 
Changing `fadeDistance` sets how far from the camera position the grid begins to fade by having it's alpha reduced. `fadeStrength` determines how fast it happens (exponent). `fadeStrength = 0` means that there is no fading (not recommended for large grids).

## Follow camera
Setting `followCamera` to true applies a transform that moves the grid to the camera's position on the chosen `axes`.

`ref` passes a reference from the `<T.Mesh/> the grid is constructed on.

### Properties

```ts  
  axes: 'xzy' | 'xyz' | 'zyx' = 'xzy'
  cellColor: ColorRepresentation = '#000000'
  cellSize: number = 1
  cellThickness: number = 1
  sectionColor: ColorRepresentation = '#0000ee'
  sectionSize: number = 10
  sectionThickness: number = 2
  gridSize: number | [number, number] = [20,20]
  followCamera: boolean = false
  infiniteGrid: boolean = false
  fadeDistance: number = 100
  fadeStrength: number = 1
```
