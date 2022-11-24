<script lang="ts">
  import studio from '@theatre/studio'
  import { globalStudio } from '../consts'

  studio.initialize()
  globalStudio.set(studio)
</script>
