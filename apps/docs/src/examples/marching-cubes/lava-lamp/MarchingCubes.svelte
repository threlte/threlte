<script
  lang="ts"
  module
>
  import type { AddAxisMap } from './types'
  import { Vector3 } from 'three'

  const map: AddAxisMap = {
    x: 'addPlaneX',
    y: 'addPlaneY',
    z: 'addPlaneZ'
  } as const

  // reusable for calculating world position of `MarchingCube`s
  const position = new Vector3()

  const defaultResolution = 50
</script>

<script lang="ts">
  import type { Props } from '@threlte/core'
  import { MarchingCube } from './MarchingCube'
  import { MarchingCubes } from 'three/examples/jsm/Addons.js'
  import { MarchingPlane } from './MarchingPlane'
  import { MeshBasicMaterial } from 'three'
  import { T, useTask } from '@threlte/core'

  type MarchingCubesProps = {
    resolution?: number
    enableUvs?: boolean
    enableColors?: boolean
    isolation?: number
  } & Props<MarchingCubes>

  let {
    resolution = defaultResolution,
    children,
    ref = $bindable(),
    ...props
  }: MarchingCubesProps = $props()

  const material = new MeshBasicMaterial()
  const marchingCubes = new MarchingCubes(defaultResolution, material, true, true, 20_000)

  $effect(() => {
    if (resolution !== marchingCubes.resolution) {
      marchingCubes.init(resolution)
    }
  })

  useTask(() => {
    marchingCubes.reset()
    for (const child of marchingCubes.children) {
      switch (true) {
        case child instanceof MarchingCube:
          child.getWorldPosition(position)
          position.addScalar(1).multiplyScalar(0.5) // center it
          marchingCubes.addBall(
            position.x,
            position.y,
            position.z,
            child.strength,
            child.subtract,
            child.color
          )
          break
        case child instanceof MarchingPlane:
          marchingCubes[map[child.axis]](child.strength, child.subtract)
          break
      }
    }
    marchingCubes.update()
  })

  // cleanup default material if marchingCubes.material has been set to something else
  $effect(() => {
    return () => {
      if (marchingCubes.material !== material) {
        material.dispose()
      }
    }
  })
</script>

<T
  is={marchingCubes}
  bind:ref
  {...props}
>
  {@render children?.({ ref: marchingCubes })}
</T>
