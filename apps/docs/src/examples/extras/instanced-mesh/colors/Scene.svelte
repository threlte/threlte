<script lang="ts">
  import BallInstance from './BallInstance.svelte'
  import { Color } from 'three'
  import { DirectionalLight } from 'three'
  import { Instance, InstancedMesh, interactivity } from '@threlte/extras'
  import { T, useTask, useThrelte } from '@threlte/core'

  let { paused = false }: { paused?: boolean } = $props()

  const width = 10
  const limit = width * width
  const gap = 1.3
  const offset = (width * gap) / 2

  const fromColor = new Color('yellow')
  const toColor = new Color('blue')
  const instances: BallInstance[] = []
  for (let i = 0; i < limit; i += 1) {
    instances.push(
      new BallInstance(
        toColor,
        fromColor,
        (i % width) * gap - offset,
        Math.floor(i / width) * gap - offset
      )
    )
  }

  const { size } = useThrelte()
  const zoom = $derived($size.width / (2 * (1 + width)))

  interactivity({
    filter(items) {
      // don't hit balls behind the scaled ball
      return items.slice(0, 1)
    }
  })

  const light = new DirectionalLight()
  let time = 0
  const d = 10
  const height = 5
  const { start, stop } = useTask(
    (delta) => {
      time += delta
      light.position.set(d * Math.cos(time), height, d * Math.sin(time))
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

<InstancedMesh {limit}>
  <T.SphereGeometry args={[0.5]} />
  <T.MeshToonMaterial />

  {#each instances as instance}
    <Instance
      position.x={instance.x}
      position.y={instance.y}
      scale={instance.scale}
      position.z={instance.z}
      color={instance.color}
      onpointerenter={() => {
        instance.up()
      }}
      onpointerleave={() => {
        instance.down()
      }}
    />
  {/each}
</InstancedMesh>

<T is={light} />
