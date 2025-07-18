<script lang="ts">
  import { T } from '@threlte/core'
  import AttachChild from './AttachChild.svelte'
  import { Mesh } from 'three'

  interface Props {
    attach: boolean
  }

  let { attach }: Props = $props()

  let object3d = $derived(attach ? new Mesh() : undefined)
</script>

<T.Group name="parent">
  {#if object3d}
    <AttachChild {object3d} />
  {:else}
    <T.Group name="child2" />
  {/if}
</T.Group>
