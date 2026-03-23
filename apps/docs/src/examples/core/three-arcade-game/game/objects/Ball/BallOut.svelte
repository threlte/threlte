<script>
  import { T } from '@threlte/core'
  import { MeshBasicMaterial } from 'three'
  import { BoxGeometry } from 'three'
  import { Mesh } from 'three'
  import { Group } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { useTimeout } from '../../hooks/useTimeout'
  import { game } from '../../Game.svelte'

  const geometry = new BoxGeometry(1, 0.01, 0.1)
  const material = new MeshBasicMaterial({
    color: 'red'
  })

  const { timeout } = useTimeout()

  let noBlink = false
  timeout(() => {
    noBlink = true
  }, 1e3)
</script>

<T.Group
  visible={!game.blinkClock || noBlink}
  position.z={game.ballPosition.z}
  position.x={game.ballPosition.x}
  rotation.y={DEG2RAD * 45}
>
  <T.Mesh>
    <T is={geometry} />
    <T is={material} />
  </T.Mesh>

  <T.Mesh rotation.y={DEG2RAD * 90}>
    <T is={geometry} />
    <T is={material} />
  </T.Mesh>
</T.Group>
