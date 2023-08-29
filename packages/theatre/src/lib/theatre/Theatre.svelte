<script lang="ts">
  import type { IProjectConfig } from '@theatre/core'
  import { Project, Sheet, Studio } from '..'

  export let studio: {
    enabled?: boolean
    hide?: boolean
  } = {}

  export let config: IProjectConfig | undefined = undefined
</script>

<Studio {...studio}>
  <Project {config}>
    <Sheet>
      <slot />
    </Sheet>
  </Project>
</Studio>
