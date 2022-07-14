---
title: useThrelteRoot
---

!!!module_summary title=useThrelteRoot|sourcePath=hooks/useThrelteRoot.ts|name=useThrelteRoot|from=threlte|type=hook|needsContext=true
This hook lets you consume the root context. Although it can be useful, this is mostly used internally.  
The properties `linear`, `flat` and `dpr` are reactive and can also be set.
!!!

### Types

```ts
const {
  setCamera, // (camera: Camera) => void
  linear, // Writable<boolean>
  flat, // Writable<boolean>
  dpr, // Writable<number>
  addPass, // (pass: Pass) => void
  removePass, // (pass: Pass) => void
  addRaycastableObject, // (obj: Object3D) => void
  removeRaycastableObject, // (obj: Object3D) => void
  addInteractiveObject, // (obj: Object3D) => void
  removeInteractiveObject, // (obj: Object3D) => void
  interactiveObjects, // Set<Object3D>
  raycastableObjects, // Set<Object3D>
  raycaster, // Raycaster
  lastIntersection // Intersection<Object3D<Event>> | null
} = useThrelteRoot()
```
