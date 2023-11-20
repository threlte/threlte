<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import { init } from '../lib/Node/Node'

  if (browser) {
    init()
  }
</script>
