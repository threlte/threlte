<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Instance2, InstancedMesh2, interactivity } from '@threlte/extras'
  import { Color, DirectionalLight } from 'three'
  import BallInstance from './BallInstance.svelte'

  let { paused = false }: { paused?: boolean } = $props()

  const width = 150
  const limit = width * width
  const gap = 2.5
  const offset = (width * gap) / 2

  const startColor = new Color('blue')
  const endColor = new Color('yellow')

  const instances: BallInstance[] = []
  for (let i = 0; i < limit; i += 1) {
    const x = (i % width) * gap - offset
    const z = Math.floor(i / width) * gap - offset
    instances.push(new BallInstance(startColor, endColor, x, z))
  }

  const { size } = useThrelte()
  const zoom = $derived($size.width / (1.5 * gap * width))

  interactivity({
    filter(items) {
      // only report the first intersection
      return items.slice(0, 1)
    }
  })

  const light = new DirectionalLight()
  const lightRadius = 10
  const lightHeight = 5

  let time = 0
  const { start, stop } = useTask(
    (delta) => {
      time += delta
      const x = lightRadius * Math.cos(time)
      const z = lightRadius * Math.sin(time)
      light.position.set(x, lightHeight, z)
      light.lookAt(0, 0, 0)
    },
    { autoStart: false }
  )

  $effect(() => {
    if (!paused) {
      start()
    }
    return () => {
      stop()
    }
  })
</script>

<T.OrthographicCamera
  position={[width, width, width]}
  {zoom}
  makeDefault
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<InstancedMesh2>
  <T.SphereGeometry />
  <T.MeshToonMaterial />

  {#each instances as instance}
    <Instance2
      rotation.x={0.5 * Math.PI}
      position={[instance.x, instance.y.current, instance.z]}
      scale={instance.scale}
      color={instance.color}
      onpointerenter={() => {
        instance.y.set(1)
      }}
      onpointerleave={() => {
        instance.y.set(0)
      }}
    />
  {/each}
</InstancedMesh2>

<T is={light} />
