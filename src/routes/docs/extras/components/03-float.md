---
title: Float
---

<script lang="ts">
import Wrapper from '$examples/extras/float/Wrapper.svelte'
</script>

!!!module_summary title=Float|sourcePath=extras/components/abstractions/Float.svelte|name=Float|from=threlte/extras|type=component

This component is a port of [drei's `<Html>` component](https://github.com/pmndrs/drei#html). It allows you to tie Float content to any object of your scene. It will be projected to the objects whereabouts automatically.

:::admonition type="tip"
The container of your `<Canvas>` component needs to be set to `position: relative | absolute | sticky | fixed`. This is because the DOM element will be mounted as a sibling to the `<canvas>` element.
:::

<ExampleWrapper>
  <Wrapper />
</ExampleWrapper>

&&&code_wrapper
@[code svelte|title=Wrapper.svelte](../../../../examples/extras/float/Wrapper.svelte)
@[code svelte|title=Scene.svelte](../../../../examples/extras/float/Scene.svelte)
&&&

!!!

### Examples

#### Basic Example

```svelte
<script lang="ts">
  import { Float } from 'threlte/extras'
</script>

<Float>
  <h1>Hello World</h1>
</Float>
```

#### Transform

`transform` applies matrix3d transformations.

```svelte
<script lang="ts">
  import { Float } from 'threlte/extras'
</script>

<Float transform>
  <h1>Hello World</h1>
</Float>
```

#### Occlude

`<Html>` can be occluded behind geometry using the occlude `occlude` property.

```svelte
<script lang="ts">
  import { Float } from 'threlte/extras'
</script>

<Float transform occlude>
  <h1>Hello World</h1>
</Float>
```

#### Visibility Change Event

Use the property `occlude` and bind to the event `visibilitychange` to implement a custom hide/show behaviour.

```svelte
<script lang="ts">
  import { Float } from 'threlte/extras'

  const onVisibilityChange = (isVisible: boolean) => {
    console.log(isVisible)
  }
</script>

<Float transform occlude on:visibilitychange={onVisibilityChange}>
  <h1>Hello World</h1>
</Float>
```

:::admonition type="info"
When binding to the event `visibilitychange` the contents of `<Float>` is _not_ automatically hidden when it's occluded.
:::

#### Sprite Rendering

Use the property `sprite` in `transform` mode to render the contents of `<Float>` as a sprite.

```svelte
<script lang="ts">
  import { Float } from 'threlte/extras'
</script>

<Float transform sprite>
  <h1>Hello World</h1>
</Float>
```

#### Center

Add a -50%/-50% css transform with `center` when _not_ in `transform` mode.

```svelte
<script lang="ts">
  import { Float } from 'threlte/extras'
</script>

<Float center>
  <h1>Hello World</h1>
</Float>
```

#### Portal

Use the property `portal` to mount the contents of the `<Float>` component on another `FloatElement`.  
By default the contents are mounted as a sibling to the rendering `<canvas>`.

```svelte
<script lang="ts">
  import { Float } from 'threlte/extras'
</script>

<Float portal={document.body}>
  <h1>Hello World</h1>
</Float>
```

### Properties

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
transform: boolean = false
calculatePosition: (
  obj: Object3D,
  camera: Camera,
  size: { width: number; height: number }
) => [number, number] = defaultCalculatePosition
eps: number = 0.001
occlude: boolean | Object3D[] | undefined = undefined
zIndexRange: [number, number] = [16777271, 0]
sprite: boolean = false
pointerEvents:
  | 'auto'
  | 'none'
  | 'visiblePainted'
  | 'visibleFill'
  | 'visibleStroke'
  | 'visible'
  | 'painted'
  | 'fill'
  | 'stroke'
  | 'all'
  | 'inherit' = 'auto'
center: boolean = false
fullscreen: boolean = false
distanceFactor: number | undefined = undefined
as: keyof FloatElementTagNameMap = 'div'
portal: FloatElement | undefined = undefined
```

### Bindings

```ts
inViewport: boolean
```

### Events

```ts
visibilitychange: CustomEvent<boolean>
viewportenter: undefined
viewportleave: undefined
```
