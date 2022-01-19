<script lang="ts">
  import { onDestroy } from 'svelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { PassProps } from '../types/components'

  export let pass: PassProps['pass']

  const { addPass, removePass } = useThrelteRoot()

  addPass(pass)

  onDestroy(() => {
    removePass(pass)
  })
</script>
