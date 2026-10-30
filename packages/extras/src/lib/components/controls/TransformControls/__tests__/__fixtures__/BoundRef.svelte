<script lang="ts">
  import type { Group } from 'three'
  import TransformControls from '../../TransformControls.svelte'

  let { onbind }: { onbind: (ref: Group | undefined, group: Group | undefined) => void } = $props()

  let ref = $state<Group>()
  let group = $state<Group>()

  $effect(() => onbind(ref, group))
</script>

<TransformControls
  bind:ref
  bind:group
/>
