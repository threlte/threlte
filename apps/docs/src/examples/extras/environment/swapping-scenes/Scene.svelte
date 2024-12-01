<script lang="ts">
  import { Env } from '@threlte/extras'
  import { PerspectiveCamera, Scene } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'

  type Side = 'left' | 'right'

  type Props = {
    side?: Side
  }

  let { side = 'left' }: Props = $props()

  const scenes: Record<Side, Scene> = {
    left: new Scene(),
    right: new Scene()
  }

  const scene = $derived(scenes[side])

  const { autoRender, renderer, size, renderStage } = useThrelte()

  // scene is split vertically so the aspect needs to be adjusted
  const camera = new PerspectiveCamera(45, 0.5)
  camera.position.setZ(5)

  useTask(
    () => {
      const halfWidth = 0.5 * size.current.width
      renderer.setViewport(0, 0, halfWidth, size.current.height)
      renderer.setScissor(0, 0, halfWidth, size.current.height)
      renderer.render(scenes.left, camera)
      renderer.setViewport(halfWidth, 0, halfWidth, size.current.height)
      renderer.setScissor(halfWidth, 0, halfWidth, size.current.height)
      renderer.render(scenes.right, camera)
    },
    { stage: renderStage, autoInvalidate: false }
  )

  $effect(() => {
    const lastAutoRender = autoRender.current
    const lastScissorTest = renderer.getScissorTest()
    autoRender.set(false)
    renderer.setScissorTest(true)
    return () => {
      autoRender.set(lastAutoRender)
      renderer.setScissorTest(lastScissorTest)
    }
  })
</script>

<T.Mesh attach={scenes.left}>
  <T.SphereGeometry args={[0.5]} />
  <T.MeshStandardMaterial
    metalness={1}
    roughness={0}
  />
</T.Mesh>
<T.Mesh attach={scenes.right}>
  <T.CapsuleGeometry args={[0.5]} />
  <T.MeshStandardMaterial
    metalness={1}
    roughness={0}
  />
</T.Mesh>

<Env
  file="/environment-maps/hdr/shanghai_riverside_1k.hdr"
  {scene}
  isBackground
/>
