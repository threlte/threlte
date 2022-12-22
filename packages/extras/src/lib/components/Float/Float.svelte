<script lang="ts">
  import { Group, MathUtils } from 'three'
  import { useFrame, T } from '@threlte/core'
  import type { FloatProps } from './Float.svelte'

  type Props = Required<FloatProps>

  // // Group Properties
  export let position: Props['position'] = 0
  export let rotation: Props['rotation'] = 0

  // // Float Properties
  export let speed: Props['speed'] = 1
  export let rotationIntensity: Props['rotationIntensity'] = 1
  export let floatIntensity: Props['floatIntensity'] = 1
  export let floatingRange: Props['floatingRange'] = [-0.1, 0.1]

  // // THREE.Group binding
  // export let group: ThreeGroup | undefined = undefined

  let t = Math.random() * 10000

  let floatPosition: [x: number, y: number, z: number] = Array.isArray(position)
    ? position
    : [position, position, position]

  const map = MathUtils.mapLinear

  let floatRotation: [x: number, y: number, z: number, order?: string | undefined] = Array.isArray(
    rotation
  )
    ? rotation
    : [rotation, rotation, rotation]

  useFrame(
    (_, delta) => {
      t += delta

      floatPosition = Array.isArray(position) ? position : [position, position, position]
      floatPosition[1] =
        floatPosition[1] +
        map(Math.sin((t / 4) * speed) / 10, -0.1, 0.1, ...floatingRange) * floatIntensity
      floatPosition = floatPosition

      floatRotation = Array.isArray(rotation) ? rotation : [rotation, rotation, rotation]
      floatRotation[0] += (Math.cos((t / 4) * speed) / 8) * rotationIntensity
      floatRotation[1] += (Math.cos((t / 4) * speed) / 8) * rotationIntensity
      floatRotation[2] += (Math.cos((t / 4) * speed) / 20) * rotationIntensity
      floatRotation = floatRotation
    },
    {
      debugFrameloopMessage: 'Float: framehandler'
    }
  )
</script>

<T.Group
  position={floatPosition}
  rotation={floatRotation}
  {...$$restProps}
>
  <slot />
</T.Group>
