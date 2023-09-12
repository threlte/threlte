<script lang="ts">
  import { logTable } from '../lib/lib/logTable'

  $: logTable($$restProps)
</script>
