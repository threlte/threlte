<script lang="ts">
  import { useStudio } from '../../internal/extensions.js'
  import { transactionsScope, type TransactionsActions, type TransactionsState } from './types.js'

  const { useExtension } = useStudio()
  const extension = useExtension<TransactionsState, TransactionsActions>(transactionsScope)

  const fileNames = $derived.by(() => {
    if (!extension.state.queue) return []
    return [
      ...new Set(extension.state.queue.syncQueue.map((t) => t.moduleId.replace(/^.*[\\/]/, '')))
    ]
  })
</script>

<div>
  {#if fileNames.length}
    Unsaved changes in:<br />
    <ul>
      {#each fileNames as fileName (fileName)}
        <li>
          {fileName}
        </li>
      {/each}
    </ul>
  {:else}
    Up-to-date
  {/if}
</div>

<style>
  div {
    padding: 0.25rem 4px;
    font-family: monospace;
    font-size: 11px;
    color: var(--lbl-fg);
  }

  ul {
    padding: 0 1rem;
    margin: 0.25rem 0;
  }
</style>
