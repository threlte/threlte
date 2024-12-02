<script lang="ts">
  import { Env } from '@threlte/extras'
  import { Color, PerspectiveCamera, Scene } from 'three'
  import { T, observe, useTask, useThrelte } from '@threlte/core'

  type Side = 'left' | 'right'

  type Props = {
    side?: Side
    useEnvironment?: boolean
    isBackground?: boolean
  }

  let { side = 'left', isBackground = true, useEnvironment = true }: Props = $props()

  const scenes: Record<Side, Scene> = {
    left: new Scene(),
    right: new Scene()
  }
  scenes.left.background = new Color(0x00_ff_00)
  scenes.right.background = new Color(0xff_00_00)

  const scene = $derived(scenes[side])

  const { autoRender, renderer, size, renderStage } = useThrelte()

  // scene is split vertically so the aspect needs to be adjusted
  // we could use `useThrelte().camera` here but then we'd have to narrow its type to know if it's a PerspectiveCamera or OrthographicCamera
  const camera = new PerspectiveCamera()
  camera.position.setZ(5)

  // we don't need to run this in the task since we can observe the size store
  observe(
    () => [size],
    ([size]) => {
      camera.aspect = 0.5 * (size.width / size.height)
      camera.updateProjectionMatrix()
    }
  )

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
    { autoInvalidate: false, stage: renderStage }
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

<T.AmbientLight attach={scenes.right} />

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

{#if useEnvironment}
  <Env
    file="environment-maps/hdr/shanghai_riverside_1k.hdr"
    {scene}
    {isBackground}
  />
{/if}
