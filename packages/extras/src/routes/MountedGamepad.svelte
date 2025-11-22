<script lang="ts">
  import { useGamepad } from '../lib/index.js'

  const gamepad = useGamepad()
  const { connected } = gamepad

  $: console.log('$connected: ', $connected)

  const onPress = () => {
    console.log('pressed')
  }

  gamepad.on('press', onPress)

  console.log('mounted!')
</script>
