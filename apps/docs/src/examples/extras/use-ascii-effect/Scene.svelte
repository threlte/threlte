<script lang="ts">
  import type { AsciiEffectOptions } from 'three/examples/jsm/effects/AsciiEffect.js'
  import { Mesh } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'
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

  const asciiEffect = useAsciiEffect({
    charSet: () => charSet,
    options: () => options
  })

  const style = $derived(asciiEffect.current.domElement.style)

  $effect(() => {
    style.color = foregroundColor
  })

  $effect(() => {
    style.backgroundColor = backgroundColor
  })

  const mesh = new Mesh()

  const { scene, camera } = useThrelte()

  useTask((dt) => {
    mesh.rotateY(dt)
    asciiEffect.current.render(scene, camera.current)
  })
</script>

<T.DirectionalLight position={5} />

<T is={mesh}>
  <T.MeshStandardMaterial color={foregroundColor} />
  <T.TorusKnotGeometry />
</T>
