<script lang='ts'>
  import { T, useThrelte } from '@threlte/core'
  import { XR, Hand, Controller } from '@threlte/xr'
  import { Text } from '@threlte/extras'

  const { renderer } = useThrelte()

  renderer.setClearColor('#000')

  const hands = ['left', 'right'] as const
  let colors = { left: 'white', right: 'white' }

  const setState = (hand: 'left' | 'right', state: string) => {
    colors[hand] = {
      connected: 'green',
      disconnected: 'crimson',
      selectstart: 'darkorchid',
      selectend: 'darkmagenta',
      squeezestart: 'lightcoral',
      squeezeend: 'indianred',
      pinchstart: 'lightcyan',
      pinchend: 'lightblue',
    }[state]!
  }
</script>

<XR>
  {#each hands as hand (hand)}
    <Controller
      left={hand === 'left'}
      right={hand === 'right'}
      on:connected={() => setState(hand, 'connected')}
      on:disconnected={() => setState(hand, 'disconnected')}
      on:selectstart={() => setState(hand, 'selectstart')}
      on:selectend={() => setState(hand, 'selectend')}
      on:squeezestart={() => setState(hand, 'squeezestart')}
      on:squeezeend={() => setState(hand, 'squeezeend')}
    />

    <Hand 
      left={hand === 'left'}
      right={hand === 'right'}
      on:connected={() => setState(hand, 'connected')}
      on:disconnected={() => setState(hand, 'disconnected')}
      on:pinchstart={() => setState(hand, 'pinchstart')}
      on:pinchend={() => setState(hand, 'pinchend')}
    />
  {/each}
</XR>

<T.Mesh position.y={1.5} position.x={-0.5}>
  <T.IcosahedronGeometry args={[0.3]} />
  <T.MeshStandardMaterial color={colors.left} />
</T.Mesh>

<T.Mesh position.y={1.5} position.x={0.5}>
  <T.IcosahedronGeometry args={[0.3]} />
  <T.MeshStandardMaterial color={colors.right} />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight />
