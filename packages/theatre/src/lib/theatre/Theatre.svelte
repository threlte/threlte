<script lang="ts">
  import type { IProjectConfig } from '@theatre/core'

  import { Project, Sheet, Studio } from '..'

  export let studio = true
  export let config: IProjectConfig | undefined = undefined
</script>

{#if studio}
  <Studio>
    <Project {config}>
      <Sheet>
        <slot />
      </Sheet>
    </Project>
  </Studio>
{:else}
  <Project {config}>
    <Sheet>
      <slot />
    </Sheet>
  </Project>
{/if}
