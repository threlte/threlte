<script lang="ts">
  import { T } from '@threlte/core'
  import { interactivity } from '@threlte/extras'

  interactivity()
</script>

<T.OrthographicCamera
  zoom={80}
  position={[5, 5, 5]}
  makeDefault
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.DirectionalLight position={[1, 2, 5]} />

<T.Mesh
  on:pointerover={(e) => {
    console.log('over red!!!')
  }}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="red" />

  <T.Mesh
    on:pointerover={(e) => {
      console.log('over green!!!')
    }}
    position.x={1}
  >
    <T.BoxGeometry />
    <T.MeshStandardMaterial color="green" />
  </T.Mesh>
</T.Mesh>
