<script lang="ts">
  import { OrbitControls, Resize, useGltf } from '@threlte/extras'
  import { PerspectiveCamera, Vector3 } from 'three'
  import { T, useTask } from '@threlte/core'

  type SceneProps = {
    resize?: boolean
  }

  let { resize = true }: SceneProps = $props()

  const promises = Promise.all(
    ['Duck', 'Flower', 'Fox'].map((name) => useGltf(`/models/${name}.glb`))
  )

  const camera = new PerspectiveCamera()
  camera.position.setScalar(5)

  let controls: OrbitControls | undefined = $state()

  let t = 0
  const speed = 1
  const v = new Vector3()

  const { start, stop, started } = useTask(
    (delta) => {
      t += speed * delta
      if (t <= 1) {
        camera.position.lerp(v, t)
        controls?.update()
      } else {
        stop()
        t = 0
      }
    },
    { autoStart: false }
  )

  $effect(() => {
    if (resize) {
      if ($started) {
        stop()
        t = 0
      }
    } else {
      v.copy(camera.position).normalize().multiplyScalar(100)
      start()
    }
  })
</script>

<T
  is={camera}
  makeDefault
>
  <OrbitControls
    enabled={!$started}
    bind:ref={controls}
  />
</T>

<T.AmbientLight intensity={0.2} />
<T.DirectionalLight position={[1, 5, 3]} />

{#await promises then objects}
  {@const m = (2 * Math.PI) / objects.length}
  {#each objects as { scene }, i}
    {@const f = m * i}
    <T.Group
      position.x={Math.cos(f)}
      position.z={Math.sin(f)}
    >
      {#if resize}
        <Resize>
          <T is={scene} />
        </Resize>
      {:else}
        <T is={scene} />
      {/if}
    </T.Group>
  {/each}
{/await}
