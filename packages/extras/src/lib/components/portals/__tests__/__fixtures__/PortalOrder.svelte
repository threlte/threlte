<script lang="ts">
  import { T } from '@threlte/core'
  import Portal from '../../Portal.svelte'
  import PortalTarget from '../../PortalTarget.svelte'
</script>

<PortalTarget />

<Portal>
  <T.Group name="first" />
</Portal>

<Portal>
  <T.Group name="second" />
</Portal>
