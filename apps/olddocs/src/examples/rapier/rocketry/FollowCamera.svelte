<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Portal } from '@threlte/extras'
  import { Group, PerspectiveCamera, Vector3 } from 'three'

  const vector3 = new Vector3()

  let initial = false
  let group = new Group()
  let camera = new PerspectiveCamera()

  useTask(() => {
    group.getWorldPosition(vector3)
    vector3.z = camera.position.z
    if (!initial) {
      initial = true
      camera.position.copy(vector3)
    } else {
      camera.position.lerp(vector3, 0.05)
    }
  })
</script>

<T is={group} />

<Portal id="scene">
  <T
    is={camera}
    makeDefault
    position={[0, 0, 10]}
  />
</Portal>
