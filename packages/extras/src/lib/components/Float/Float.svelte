<script lang="ts">
  import { MathUtils, Group } from 'three'
  import type { Vector2Tuple } from 'three'
  import { useTask, T } from '@threlte/core'
  import type { FloatProps } from './types.js'

  let {
    speed = 1,
    floatIntensity = 1,
    floatingRange = [-0.1, 0.1],
    rotationSpeed = 0,
    rotationIntensity = 0,
    seed = 10_000 * Math.random(),
    ref = $bindable(),
    children,
    ...props
  }: FloatProps = $props()

  const outerGroup = new Group()
  const group = new Group()

  let t = seed

  const map = MathUtils.mapLinear

  let fSpeed = $derived(Array.isArray(speed) ? speed : [speed, speed, speed])
  let fIntensity = $derived(
    Array.isArray(floatIntensity)
      ? floatIntensity
      : [floatIntensity, floatIntensity, floatIntensity]
  )
  let fRange: [x: Vector2Tuple, y: Vector2Tuple, z: Vector2Tuple] = $derived(
    floatingRange.length === 3 ? floatingRange : [[0, 0], floatingRange, [0, 0]]
  )
  // Rotation
  let rSpeed = $derived(
    Array.isArray(rotationSpeed) ? rotationSpeed : [rotationSpeed, rotationSpeed, rotationSpeed]
  )
  let rIntensity = $derived(
    Array.isArray(rotationIntensity)
      ? rotationIntensity
      : [rotationIntensity, rotationIntensity, rotationIntensity]
  )

  useTask((delta) => {
    t += delta

    group.position.x =
      map(Math.sin((t / 4) * fSpeed[0]) / 10, -0.1, 0.1, ...fRange[0]) * fIntensity[0]
    group.position.y =
      map(Math.sin((t / 4) * fSpeed[1]) / 10, -0.1, 0.1, ...fRange[1]) * fIntensity[1]
    group.position.z =
      map(Math.sin((t / 4) * fSpeed[2]) / 10, -0.1, 0.1, ...fRange[2]) * fIntensity[2]

    group.rotation.x = (Math.cos((t / 4) * rSpeed[0]) / 8) * rIntensity[0]
    group.rotation.y = (Math.sin((t / 4) * rSpeed[1]) / 8) * rIntensity[1]
    group.rotation.z = (Math.sin((t / 4) * rSpeed[2]) / 20) * rIntensity[2]
    group.updateMatrix()
  })
</script>

<T
  is={outerGroup}
  bind:ref
  {...props}
>
  <T
    is={group}
    matrixAutoUpdate={false}
  >
    {@render children?.({ ref: group })}
  </T>
</T>
