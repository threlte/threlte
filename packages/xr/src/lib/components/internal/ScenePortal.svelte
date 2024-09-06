<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { Object3D } from 'three'

  const { scene } = useThrelte()

  const proxy = new Object3D()
  proxy.add = (child) => {
    scene.add(child)
    return child
  }
  proxy.remove = (child) => {
    scene.remove(child)
    return child
  }
</script>

<T
  is={proxy}
  attach={false}
>
  <slot />
</T>
