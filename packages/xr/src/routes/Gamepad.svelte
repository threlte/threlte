<script lang="ts">
  import { useGamepad } from '../../../extras/src/lib/index'

  const leftPad = useGamepad({ xr: true, hand: 'left' })
  const rightPad = useGamepad({ xr: true, hand: 'right' })

  leftPad.on('change', (event) => console.log('left', event))
  rightPad.on('change', (event) => console.log('right', event))
</script>
