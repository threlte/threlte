<script lang="ts">
  import type { Snippet } from 'svelte'
  import { T, type Props } from '@threlte/core'
  import { type Group } from 'three'

  interface GroupProps extends Props<Group> {
    children?: Snippet
  }

  let { children, ...rest }: GroupProps = $props()
</script>

<T.Group {...rest}>
  {@render children?.()}
</T.Group>
