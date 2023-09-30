<script lang='ts'>
  import { T, useFrame, useRender } from '$lib'

  let ref: THREE.Mesh
  let elapsed = 0

  useFrame(() => {
    ref.rotation.x += 0.05
  })

  useFrame(() => {

  }, {
    stage: 'fixed',
    fixedStep: 1/10
  })

  useRender((ctx) => {
    ctx.renderer.render(ctx.scene, ctx.camera.current)
  })

  useFrame((ctx, delta) => {
    elapsed += (delta / 1000)
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

<T.Mesh bind:ref>
  <T.MeshStandardMaterial color="hotpink" />
  <T.BoxGeometry />
</T.Mesh>

<T.DirectionalLight />
<T.AmbientLight />