<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { IProjectConfig } from '@theatre/core'
  import { Project, Sheet, Studio } from '../index.js'

  interface Props {
    studio?: {
      enabled?: boolean
      hide?: boolean
    }
    config?: IProjectConfig | undefined
    children?: Snippet
  }

  let { studio = {}, config = undefined, children }: Props = $props()
</script>

<Studio {...studio}>
  <Project {config}>
    <Sheet>
      {@render children?.()}
    </Sheet>
  </Project>
</Studio>
