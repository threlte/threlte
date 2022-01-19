<script lang="ts">
  import { onDestroy } from 'svelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { PassProperties } from '../types/components'

  export let pass: PassProperties['pass']

  const { addPass, removePass } = useThrelteRoot()

  addPass(pass)

  onDestroy(() => {
    removePass(pass)
  })
</script>
