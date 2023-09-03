<script lang='ts'>
  import { T, useThrelte } from '@threlte/core'
  import { XR, Hand, Controller } from '@threlte/xr'
  import { Text } from '@threlte/extras'

  const { renderer } = useThrelte()

  renderer.setClearColor('#000')
  let logs = 'Events:'

  const addEvent = (hand: string, text: string) => {
    logs = `${logs}\n${hand}: ${text}`
  }
</script>

<XR>
  {#each ['left', 'right'] as hand (hand)}
    <Controller
      left={hand === 'left'}
      right={hand === 'right'}
      on:connected={() => addEvent(hand, 'controller connected')}
      on:disconnected={() => addEvent(hand, 'controller disconnected')}
      on:select={() => addEvent(hand, 'select')}
      on:selectstart={() => addEvent(hand, 'select start')}
      on:selectend={() => addEvent(hand, 'select end')}
      on:squeeze={() => addEvent(hand, 'squeeze')}
      on:squeezestart={() => addEvent(hand, 'squeeze start')}
      on:squeezeend={() => addEvent(hand, 'squeeze end')}
    />

    <Hand 
      left={hand === 'left'}
      right={hand === 'right'}
      on:connected={() => addEvent(hand, 'hand connected')}
      on:disconnected={() => addEvent(hand, 'hand disconnected')}
      on:pinchstart={() => addEvent(hand, 'pinch start')}
      on:pinchend={() => addEvent(hand, 'pinch end')}
    />
  {/each}
</XR>

<T.Group
  position.y={1.8}
  position.z={-1}
>
  <Text text={logs} />
</T.Group>

<T.AmbientLight />
<T.DirectionalLight />
