<script>
  import { T, useTask } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { StudioState } from '@threlte/studio'

  interactivity()

  class MyState extends StudioState {
    count = $state(0)
    name = $state('')
    color = $state('#ff00ff')
    position = $state({ x: 10, y: 10, z: 10 })
  }

  const s = new MyState()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[s.position.x, s.position.y, s.position.z]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<T.DirectionalLight position={[3, 10, 7]} />

<T.Mesh>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="hotpink" />
</T.Mesh>
