<script lang="ts">
  import type { Vector3Tuple } from 'three'
  import { Color } from 'three'
  import { Instance, InstancedMesh, interactivity } from '@threlte/extras'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { Tween } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { DirectionalLight } from 'three'

  let { paused = false }: { paused?: boolean } = $props()

  const width = 10
  const limit = width * width
  const gap = 1.3
  const offset = (width * gap) / 2

  const yellow = new Color('yellow')
  const blue = new Color('blue')

  class SphereInstance {
    color = new Tween(blue, {
      easing: cubicOut,
      duration: 250,
      interpolate(a, b) {
        return (t) => a.clone().lerpHSL(b, t)
      }
    })
    constructor(public position: Vector3Tuple) {}
  }

  const instances: SphereInstance[] = []
  for (let i = 0; i < limit; i += 1) {
    instances.push(
      new SphereInstance([(i % width) * gap - offset, 0, Math.floor(i / width) * gap - offset])
    )
  }

  const { size } = useThrelte()
  const zoom = $derived($size.width / (2 * (1 + width)))

  interactivity()

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
      position={instance.position}
      color={instance.color.current}
      onpointerenter={() => {
        instance.color.set(yellow)
      }}
      onpointerleave={() => {
        instance.color.set(blue)
      }}
    />
  {/each}
</InstancedMesh>

<T is={light} />
