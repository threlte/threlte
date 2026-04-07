<script lang="ts">
  import type { Group } from 'three'
  import { T } from '@threlte/core'

  interface Props {
    is: Group
    onRefCreate: (ref: Group | undefined) => void
  }

  let { is, onRefCreate }: Props = $props()

  let ref = $state.raw<Group>()

  $effect.pre(() => {
    onRefCreate(ref)
  })
</script>

<T
  {is}
  bind:ref
/>
