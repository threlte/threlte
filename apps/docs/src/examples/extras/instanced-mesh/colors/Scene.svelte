<script lang="ts">
  import BallInstance from './BallInstance.svelte'
  import { Color } from 'three'
  import { DirectionalLight } from 'three'
  import { Instance, InstancedMesh, interactivity } from '@threlte/extras'
  import { T, useTask, useThrelte } from '@threlte/core'

  let { size }: { size: number } = $props()

  const gap = 2.5

  const limit = $derived(size * size)
  const offset = $derived((size * gap) / 2)

  const startColor = new Color('blue')
  const endColor = new Color('yellow')

  const instances = $derived.by(() => {
    const results: BallInstance[] = []

    for (let i = 0; i < limit; i += 1) {
      const x = (i % size) * gap - offset
      const z = Math.floor(i / size) * gap - offset
      results.push(new BallInstance(startColor, endColor, x, z))
    }

    return results
  })

  const { size: viewportSize } = useThrelte()
  const zoom = $derived($viewportSize.width / (1.5 * gap * size))

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
  useTask((delta) => {
    time += delta
    const x = lightRadius * Math.cos(time)
    const z = lightRadius * Math.sin(time)
    light.position.set(x, lightHeight, z)
    light.lookAt(0, 0, 0)
  })
</script>

<T.OrthographicCamera
  position={[size, size, size]}
  {zoom}
  makeDefault
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<InstancedMesh
  limit={50 * 50}
  range={limit}
>
  <T.SphereGeometry />
  <T.MeshToonMaterial />

  {#each instances as instance}
    <Instance
      rotation.x={0.5 * Math.PI}
      position.x={instance.x}
      position.y={instance.y.current}
      scale={instance.scale}
      position.z={instance.z}
      color={instance.color}
      onpointerenter={() => {
        instance.y.set(1)
      }}
      onpointerleave={() => {
        instance.y.set(0)
      }}
    />
  {/each}
</InstancedMesh>

<T is={light} />
