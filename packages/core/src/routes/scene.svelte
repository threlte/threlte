<script lang='ts'>
  import { T, useFrame, useRender } from '$lib'

  let ref: THREE.Mesh
  let elapsed = 0

  useFrame((_, delta) => {
    elapsed += (delta)
    ref.rotation.x += 0.05
  })

  useFrame(() => {
    ref.position.y = Math.sin(elapsed * 2)
  }, {
    stage: 'fixed',
    fixedStep: 1/2
  })

  useRender((ctx) => {
    ctx.renderer.render(ctx.scene, ctx.camera.current)
  })

  useFrame(() => {
    ref.position.x = Math.sin(elapsed)
  }, {
    stage: 'after'
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<T.Mesh castShadow receiveShadow bind:ref>
  <T.MeshStandardMaterial color="hotpink" />
  <T.BoxGeometry />
</T.Mesh>

<T.Mesh receiveShadow position.y={-1}>
  <T.MeshStandardMaterial color="turquoise" />
  <T.CylinderGeometry args={[1, 1, 0.1]} />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight
  castShadow
  shadow.mapSize={4096}
  shadow.camera.left={-5}
  shadow.camera.right={5}
  shadow.camera.top={5}
  shadow.camera.bottom={-5}
/>
