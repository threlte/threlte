<script lang="ts">
  import Object3DInstance from '../instances/Object3DInstance.svelte'
  import { Object3D } from 'three'
  import { defaults } from '../lib/defaults'
  import type { LookAt, Position, Rotation, Scale } from '../types/types'

  // Object3DInstance
  export let position: Position | undefined = undefined
  export let scale: Scale | undefined = undefined
  export let rotation: Rotation | undefined = undefined
  export let viewportAware: boolean = false
  export let inViewport = defaults.object3d.inViewport
  export let frustumCulled = defaults.mesh.frustumCulled
  export let renderOrder = defaults.mesh.renderOrder
  export let lookAt: LookAt | undefined = undefined

  export const object = new Object3D()
</script>

<Object3DInstance
  {lookAt}
  {object}
  {position}
  {scale}
  {rotation}
  {frustumCulled}
  {renderOrder}
  castShadow={false}
  receiveShadow={false}
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</Object3DInstance>
