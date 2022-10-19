---
title: TransformControls
---

<script lang="ts">
import Wrapper from '$examples/core/transform-controls/App.svelte'
</script>

!!!module_summary title=TransformControls|sourcePath=controls/TransformControls.svelte|name=TransformControls|from=core|type=component|relatedDocs={[{name:"three.js TransformControls reference",url:"https://threejs.org/docs/#examples/en/controls/TransformControls"}]}
This component can be used to transform objects in 3D space by adapting a similar interaction model of DCC tools like Blender. Unlike other controls, it is not intended to transform the scenes camera.

The component `<TransformControls>` needs to be a direct child of the component to be transformed.

To accommodate `<OrbitControls>` as well as a `<TransformControls>` component in the same scene, the `<TransformControls>` component is able automatically pause the currently active `<OrbitControls>` component when the user is interacting with the `<TransformControls>` component. You can opt out of this behaviour by setting the property `autoPauseOrbitControls` to `false`.

<ExampleWrapper playgroundHref="/core/transform-controls">
<Wrapper />

<div slot="code">

@[code svelte|title=Wrapper.svelte](../../examples/core/transform-controls/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/core/transform-controls/Scene.svelte)

</div>
</ExampleWrapper>

!!!

### Examples

```svelte
<script>
  import { TransformControls, Mesh, TransformControls } from '@threlte/core'
  import { MeshStandardMaterial, BoxBufferGeometry } from 'three'
</script>

<Mesh geometry={new BoxBufferGeometry(1, 1, 1)} material={new MeshStandardMaterial()}>
  <TransformControls />
</Mesh>
```

The `<TransformControls>` component can also be used to transform [`<Instance>`](/core/instance) components:

```svelte
<script>
  import { Instance, TransformControls } from '@threlte/core'
</script>

<Instance>
  <TransformControls />
</Instance>
```

### Properties

```ts
// optional
autoPauseOrbitControls: boolean = true
mode: 'translate' | 'rotate' | 'scale' | undefined = undefined
enabled: boolean | undefined = undefined
translationSnap: number | undefined = undefined
scaleSnap: number | undefined = undefined
rotationSnap: number | undefined = undefined
showX: boolean | undefined = undefined
showY: boolean | undefined = undefined
showZ: boolean | undefined = undefined
size: number | undefined = undefined
space: 'world' | 'local' | undefined = undefined
```

### Bindings

```ts
axis: 'X' | 'Y' | 'Z' | 'E' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | 'XYZE' | null
dragging: boolean
```

### Events

```ts
change: void
'camera-changed': {
  type: 'camera-changed'
  value: Camera
}
'object-changed': {
  type: 'object-changed'
  value: Object3D
}
'enabled-changed': {
  type: 'enabled-changed'
  value: boolean
}
'axis-changed': {
  type: 'axis-changed'
  value: 'X' | 'Y' | 'Z' | 'E' | 'XY' | 'YZ' | 'XZ' | 'XYZ' | 'XYZE' | null
}
'mode-changed': {
  type: 'mode-changed'
  value: 'translate' | 'rotate' | 'scale'
}
'translationSnap-changed': {
  type: 'translationSnap-changed'
  value: number
}
'rotationSnap-changed': {
  type: 'rotationSnap-changed'
  value: number
}
'scaleSnap-changed': {
  type: 'scaleSnap-changed'
  value: number
}
'space-changed': {
  type: 'space-changed'
  value: 'world' | 'local'
}
'size-changed': {
  type: 'size-changed'
  value: number
}
'dragging-changed': {
  type: 'dragging-changed'
  value: boolean
}
'showX-changed': {
  type: 'showX-changed'
  value: boolean
}
'showY-changed': {
  type: 'showY-changed'
  value: boolean
}
'showZ-changed': {
  type: 'showZ-changed'
  value: boolean
}
'worldPosition-changed': {
  type: 'worldPosition-changed'
  value: Vector3
}
'worldPositionStart-changed': {
  type: 'worldPositionStart-changed'
  value: Vector3
}
'worldQuaternion-changed': {
  type: 'worldQuaternion-changed'
  value: Quaternion
}
'worldQuaternionStart-changed': {
  type: 'worldQuaternionStart-changed'
  value: Quaternion
}
'cameraPosition-changed': {
  type: 'cameraPosition-changed'
  value: Vector3
}
'cameraQuaternion-changed': {
  type: 'cameraQuaternion-changed'
  value: Quaternion
}
'pointStart-changed': {
  type: 'pointStart-changed'
  value: Vector3
}
'pointEnd-changed': {
  type: 'pointEnd-changed'
  value: Vector3
}
'rotationAxis-changed': {
  type: 'rotationAxis-changed'
  value: Vector3
}
'rotationAngle-changed': {
  type: 'rotationAngle-changed'
  value: number
}
'eye-changed': {
  type: 'eye-changed'
  value: Vector3
}
mouseDown: void
mouseUp: void
objectChange: void
```
