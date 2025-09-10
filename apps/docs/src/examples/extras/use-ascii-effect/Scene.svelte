<script lang="ts">
  import type { AsciiEffectOptions } from 'three/examples/jsm/effects/AsciiEffect.js'
  import { Mesh } from 'three'
  import { T, useTask } from '@threlte/core'
  import { useAsciiEffect } from '@threlte/extras'

  type Props = {
    backgroundColor: string
    charSet: string
    foregroundColor: string
    options: AsciiEffectOptions
  }

  let {
    options = {},
    charSet = ' .:-+*=%@#',
    foregroundColor = 'white',
    backgroundColor = 'black'
  }: Partial<Props> = $props()

  const { render } = useAsciiEffect({
    getCharSet: () => charSet,
    getForegroundColor: () => foregroundColor,
    getBackgroundColor: () => backgroundColor,
    getOptions: () => options
  })

  const mesh = new Mesh()

  useTask((dt) => {
    mesh.rotateY(dt)
    render()
  })
</script>

<T.DirectionalLight position={5} />

<T is={mesh}>
  <T.MeshStandardMaterial color={foregroundColor} />
  <T.TorusKnotGeometry />
</T>
