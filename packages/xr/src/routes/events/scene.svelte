<script lang='ts'>

import { T, useThrelte } from '@threlte/core'
import { XR, Controllers, Hands, useControllerEvent, useHandEvent } from '$lib'
  
const { camera } = useThrelte()

useControllerEvent('select', (event) => console.log('useControllerEvent', event), {
  handedness: 'right'
})

useControllerEvent('squeeze', (event) => console.log('useControllerEvent', event), {
  handedness: 'right'
})

useHandEvent('connected', (event) => console.log('useHandEvent', event), {
  handedness: 'left'
})

useHandEvent('pinchstart', (event) => console.log('useHandEvent', event), {
  handedness: 'left'
})

useHandEvent('pinchend', (event) => console.log('useHandEvent', event), {
  handedness: 'left'
})

camera.current.position.z = 1.75
camera.current.lookAt(0, 1.75, 1)

</script>

<XR
  on:sessionstart={(event) => console.log('sessionstart', event)}
  on:sessionend={(event) => console.log('sessionend', event)}
  on:visibilitychange={(event) => console.log('visibilitychange', event)}
  on:inputsourceschange={(event) => console.log('inputsourceschange', event)}
>
  <Controllers
    on:connected={(event) => console.log('connected:controller', event)}
    on:disconnected={(event) => console.log('disconnected:controller', event)}
    on:select={(event) => console.log('select', event)}
    on:selectstart={(event) => console.log('selectstart', event)}
    on:selectend={(event) => console.log('selectend', event)}
    on:squeeze={(event) => console.log('squeeze', event)}
    on:squeezestart={(event) => console.log('squeezestart', event)}
    on:squeezeend={(event) => console.log('squeezeend', event)}
  />

  <Hands
    on:connected={(event) => console.log('connected:controller', event)}
    on:disconnected={(event) => console.log('disconnected:controller', event)}
    on:pinchstart={(event) => console.log('pinchstart', event)}
    on:pinchend={(event) => console.log('pinchend', event)}
  />
</XR>

<T.Mesh rotation={[-Math.PI / 2, 0, 0]}>
  <T.CircleGeometry args={[1]} />
  <T.MeshBasicMaterial />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight />
