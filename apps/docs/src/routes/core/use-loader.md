---
title: useLoader
---

!!!module_summary title=useLoader|sourcePath=hooks/useLoader.ts|name=useLoader|from=core|type=hook
`useLoader` memoizes Loaders to reuse them at any time. Pass in the Loaders class and a function to instantiate the loader.
!!!

### Example <!-- omit in toc -->

```ts
import { useLoader } from 'threlte'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const loader = useLoader(OBJLoader, () => new OBJLoader())
loader.load('models/model.obj', (obj) => {
	console.log(object)
})
```
