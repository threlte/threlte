<script lang="ts" context="module">
  export type MeshInstanceProps = {
    mesh: Mesh
    position: Object3DInstanceProps['position']
    scale: Object3DInstanceProps['scale']
    rotation: Object3DInstanceProps['rotation']
    viewportAware: Object3DInstanceProps['viewportAware']
    inViewport: Object3DInstanceProps['inViewport']
    castShadow: Object3DInstanceProps['castShadow']
    receiveShadow: Object3DInstanceProps['receiveShadow']
    frustumCulled: Object3DInstanceProps['frustumCulled']
    renderOrder: Object3DInstanceProps['renderOrder']
    lookAt: Object3DInstanceProps['lookAt']
    interactive: InteractiveObjectProps['interactive']
    ignorePointer: InteractiveObjectProps['ignorePointer']
  }
</script>

<script lang="ts">
  import type { Mesh } from 'three'
  import InteractiveObject from '../internal/InteractiveObject.svelte'
  import type { InteractiveObjectProps } from '../internal/InteractiveObject.svelte'
  import type { Object3DInstanceProps } from './Object3DInstance.svelte'
  import Object3DInstance from './Object3DInstance.svelte'

  export let mesh: MeshInstanceProps['mesh']
  export let position: MeshInstanceProps['position']
  export let scale: MeshInstanceProps['scale']
  export let rotation: MeshInstanceProps['rotation']
  export let viewportAware: MeshInstanceProps['viewportAware']
  export let inViewport: MeshInstanceProps['inViewport']
  export let castShadow: MeshInstanceProps['castShadow']
  export let receiveShadow: MeshInstanceProps['receiveShadow']
  export let frustumCulled: MeshInstanceProps['frustumCulled']
  export let renderOrder: MeshInstanceProps['renderOrder']
  export let lookAt: MeshInstanceProps['lookAt']
  export let interactive: MeshInstanceProps['interactive']
  export let ignorePointer: MeshInstanceProps['ignorePointer']
</script>

<Object3DInstance
  object={mesh}
  {lookAt}
  {position}
  {scale}
  {rotation}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {viewportAware}
  on:viewportenter
  on:viewportleave
  bind:inViewport
>
  <slot />
</Object3DInstance>

<InteractiveObject
  object={mesh}
  {interactive}
  {ignorePointer}
  on:click
  on:contextmenu
  on:pointerup
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointermove
/>
