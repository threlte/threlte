---
'@threlte/extras': minor
---

Stronger types on typed threlte GLTF-related modules. This is technically a **breaking change** but it's types only.
This is a change that prepares threlte's type system for glTF code generators.

### Upgrade Plan

- Before:

```ts
const { gltf } = useGltf<'MeshA' | 'MeshB' | 'Object3DA', 'MaterialA' | 'MaterialB'>('/some/url')

// -> $gltf.nodes.MeshA -> THREE.Object3D
// -> $gltf.nodes.Object3DA -> THREE.Object3D
// -> $gltf.materials.MaterialA -> THREE.Material
```

- After:

```ts
const { gltf } = useGltf<{
  nodes: {
    MeshA: THREE.Mesh
    MeshB: THREE.Mesh
    Object3DA: THREE.Object3D
  }
  materials: {
    MaterialA: THREE.MeshStandardMaterial
    MaterialB: THREE.MeshBasicMaterial
  }
}>('/some/url')

// -> $gltf.nodes.MeshA -> THREE.Mesh
// -> $gltf.nodes.Object3DA -> THREE.Object3D
// -> $gltf.materials.MaterialA -> THREE.MeshStandardMaterial
```
