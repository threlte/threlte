---
title: InstancedMesh
---

<script lang="ts">
import Example from '$examples/core/instanced-mesh/App.svelte'
</script>

!!!module_summary title=InstancedMesh|sourcePath=objects/InstancedMesh.svelte|name=InstancedMesh|from=core|type=component|divider=false|relatedDocs={[{name:"three.js InstancedMesh reference",url:"https://threejs.org/docs/#api/en/objects/InstancedMesh"}]}

:::deprecated moveToExtras=true
:::

The `<InstancedMesh>` is a special version of [`<Mesh>`](/core/mesh) with instanced rendering support. Use `<InstancedMesh>` if you have to render a large number of objects with the same geometry and material but with different world transformations and colors. The usage of `<InstancedMesh>` will help you to reduce the number of draw calls and thus improve the overall rendering performance in your application.

<ExampleWrapper playgroundHref="/core/instanced-mesh">
<Example />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/core/instanced-mesh/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/core/instanced-mesh/Scene.svelte)
@[code svelte|title=Sphere.svelte](../../examples/core/instanced-mesh/Sphere.svelte)

</div>
</ExampleWrapper>

!!!

---

### Usage

An `<InstancedMesh>` is used in conjunction with the [`<Instance>`](/core/instance) component:

```svelte
<InstancedMesh {geometry} {material}>
  <Instance />
  <Instance />
</InstancedMesh>
```

It's also possible to nest other objects in an `<InstancedMesh>` component:

```svelte
<InstancedMesh {geometry} {material}>
  <Instance />
  <Instance />

  <GLTF />
</InstancedMesh>
```

Provide an `id` to use multiple `<InstancedMesh>` components:

```svelte
<InstancedMesh id="tree" geometry={treeGeometry} material={treeMaterial}>
  <InstancedMesh id="leaf" geometry={leafGeometry} material={leafMaterial}>
    <Group position={{ x: 1 }}>
      <Instance id="tree" /> // Instance of InstancedMesh with id="tree"
      <Instance id="leaf" /> // Instance of InstancedMesh with id="leaf"
    </Group>

    <Group position={{ x: -2 }}>
      <Instance id="tree" />
      <Instance id="leaf" />
    </Group>
  </InstancedMesh>
</InstancedMesh>
```

### Instance count

Usually you don't have to worry to set the [property count](https://threejs.org/index.html?q=insta#api/en/objects/InstancedMesh.count) of the underlying `THREE.InstancedMesh` as the component `<InstancedMesh>` automatically scales with the nested `<Instance>` components. In some occasions (e.g. when the amount of instances changes frequently) it might be beneficial to explicitly set the _maximum_ amount of instances:

```svelte
<InstancedMesh count={10} {geometry} {material}>
  <Instance />
  <Instance />
</InstancedMesh>
```

### Events

Instances also supports DOM-like events like the `<Mesh>` component, the setup however is a bit different. Although you can listen to events on `<Instance>` components, `interactive` and `ignorePointer` need to be set on the `<InstancedMesh>` component:

```svelte
<InstancedMesh interactive {geometry} {material}>
  <Instance on:click={onClick} />
</InstancedMesh>
```

:::admonition type="note"
This means you can't exclude one instance from raycasting while listening for events on another.
:::

### Nesting

Instances can be nested in other objects and all parent transformations apply as usual:

```svelte
<InstancedMesh interactive {geometry} {material}>
  <Group rotation={{ z: DEG2RAD * 180 }}>
    <Instance />

    <Group position={{ y: 2 }}>
      <Instance />
    </Group>
  </Group>
</InstancedMesh>
```

:::admonition type="info"
Nesting instances might have a slight performance hit, the frameloop will run continuously. Use with caution.
:::

### Example

<script lang="ts">
import ExampleSimple from '$examples/core/instanced-mesh-simple/App.svelte'
</script>

<ExampleWrapper playgroundHref="/core/instanced-mesh-simple">
<ExampleSimple />

<div slot="code">

@[code svelte|title=App.svelte](../../examples/core/instanced-mesh-simple/App.svelte)
@[code svelte|title=Scene.svelte](../../examples/core/instanced-mesh-simple/Scene.svelte)

</div>
</ExampleWrapper>

### Properties

```ts
// required
geometry: THREE.BufferGeometry
material: THREE.Material | THREE.Material[]


// optional
count: number | undefined = undefined
id: string = ''
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
renderOrder: number | undefined = undefined
visible: boolean | undefined = undefined
dispose: boolean | undefined = undefined
userData: Record<string, any> | undefined = undefined
interactive: boolean = false
ignorePointer: boolean = false
```

### Bindings

```ts
instancedMesh: Writable<InstancedMesh>
inViewport: boolean
```

### Events

```ts
viewportenter: undefined
viewportleave: undefined
```
