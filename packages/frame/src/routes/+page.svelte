<script lang="ts">
  import { browser } from '$app/environment'
  import { init } from '../lib/Node/Node'

  if (browser) {
    init()
  }
</script>
