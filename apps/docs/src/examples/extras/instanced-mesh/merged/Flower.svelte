<script lang="ts">
  import type { Snippet } from 'svelte'
  import { T, type Props } from '@threlte/core'
  import { type Group, MathUtils } from 'three'
  interface GroupProps extends Props<Group> {
    children?: Snippet
  }

  let { children, ...rest }: GroupProps = $props()
</script>

<T.Group {...rest}>
  <!-- Correct rotation -->
  <T.Group rotation.x={MathUtils.DEG2RAD * 90}>
    {@render children?.()}
  </T.Group>
</T.Group>
