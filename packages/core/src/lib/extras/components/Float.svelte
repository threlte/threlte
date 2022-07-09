<script lang="ts">
  import { Group as ThreeGroup, MathUtils } from 'three'
  import { useFrame } from '../../hooks/useFrame'
  import Group from '../../objects/Group.svelte'
  import type { FloatProperties } from '../types/components'

  // Group Properties
  export let position: FloatProperties['position'] = undefined
  export let scale: FloatProperties['scale'] = undefined
  export let rotation: FloatProperties['rotation'] = undefined
  export let lookAt: FloatProperties['lookAt'] = undefined
  export let viewportAware: FloatProperties['viewportAware'] = false
  export let inViewport: FloatProperties['inViewport'] = false
  export let castShadow: FloatProperties['castShadow'] = undefined
  export let receiveShadow: FloatProperties['receiveShadow'] = undefined
  export let frustumCulled: FloatProperties['frustumCulled'] = undefined
  export let renderOrder: FloatProperties['renderOrder'] = undefined
  export let visible: FloatProperties['visible'] = undefined

  // Float Properties
  export let speed: FloatProperties['speed'] = 1
  export let rotationIntensity: FloatProperties['rotationIntensity'] = 1
  export let floatIntensity: FloatProperties['floatIntensity'] = 1
  export let floatingRange: FloatProperties['floatingRange'] = [-0.1, 0.1]

  // THREE.Group binding
  export let group: ThreeGroup | undefined = undefined

  let t = Math.random() * 10000

  const map = MathUtils.mapLinear

  let combinedRotation = {
    x: rotation?.x ?? 0 + (Math.cos((t / 4) * speed) / 8) * rotationIntensity,
    y: rotation?.y ?? 0 + (Math.sin((t / 4) * speed) / 8) * rotationIntensity,
    z: rotation?.z ?? 0 + (Math.sin((t / 4) * speed) / 20) * rotationIntensity
  }

  let combinedPosition = {
    ...position,
    y:
      position?.y ??
      0 + map(Math.sin((t / 4) * speed) / 10, -0.1, 0.1, ...floatingRange) * floatIntensity
  }

  useFrame(
    (_, delta) => {
      t += delta

      combinedRotation = {
        x: rotation?.x ?? 0 + (Math.cos((t / 4) * speed) / 8) * rotationIntensity,
        y: rotation?.y ?? 0 + (Math.sin((t / 4) * speed) / 8) * rotationIntensity,
        z: rotation?.z ?? 0 + (Math.sin((t / 4) * speed) / 20) * rotationIntensity
      }

      combinedPosition = {
        ...position,
        y:
          position?.y ??
          0 + map(Math.sin((t / 4) * speed) / 10, -0.1, 0.1, ...floatingRange) * floatIntensity
      }
    },
    {
      debugFrameloopMessage: 'Float: framehandler'
    }
  )
</script>

<Group
  bind:group
  position={combinedPosition}
  {scale}
  rotation={combinedRotation}
  {lookAt}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {visible}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</Group>
