<script lang="ts">
  import type { IProjectConfig } from '@theatre/core'

  import { Project, Sheet, Studio } from '..'

  export let studio: {
    enabled?: boolean
    hide?: boolean
  } = {}

  export let config: IProjectConfig | undefined = undefined
</script>

<Studio
  enabled={studio.enabled}
  hide={studio.hide}
>
  <Project {config}>
    <Sheet>
      <slot />
    </Sheet>
  </Project>
</Studio>
