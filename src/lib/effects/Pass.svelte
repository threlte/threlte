<script lang="ts">
  import { useFrame } from '../hooks/useFrame'

  import { onDestroy } from 'svelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import type { PassProperties } from '../types/components'

  export let pass: PassProperties['pass']

  const { addPass, removePass } = useThrelteRoot()

  addPass(pass)

  useFrame(() => {}, {
    debugFrameloopMessage: 'Pass component'
  })

  onDestroy(() => {
    removePass(pass)
  })
</script>
