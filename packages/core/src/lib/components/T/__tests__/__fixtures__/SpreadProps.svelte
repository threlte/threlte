<script lang="ts">
  import { T } from '@threlte/core'

  interface Props {
    is: object
    extra: Record<string, unknown>
  }

  let { is, extra }: Props = $props()
</script>

<T
  {is}
  {...extra}
/>
