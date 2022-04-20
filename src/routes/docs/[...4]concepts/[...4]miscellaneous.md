# Miscellaneous

Most component properties are `undefined` by default. So if a constructor argument on a three.js Object is optional, it's most likely also optional for it's respective threlte component. This way, three.js will provide the defaults and threltes reactivity will _not_ kick in, allowing you to take complete control over objects also imperatively.

On top of that, threlte adds some functionality to make it even easier to use.

## lookAt

Use the property `lookAt` on an Object to

- reactively orient an Object3D towards another Object3D

```svelte
<script>
  let mesh
</script>

<PerspectiveCamera lookAt={mesh} />
<Mesh bind:mesh … />
```

- to reactively orient an Object towards a Position

```svelte
<PerspectiveCamera lookAt={{ x: 5, y: 3 }} />
```
