<script lang="ts">
  import { Splat, SplatLoader } from '@pmndrs/vanilla'
  import { T, useLoader, useTask, useThrelte } from '@threlte/core'
  import type { SplatProps } from './types'

  let {
    src,
    alphaHash = false,
    alphaTest = undefined,
    toneMapped = undefined,
    children,
    ...rest
  }: SplatProps = $props()

  const { renderer, camera } = useThrelte()

  const loader = useLoader(SplatLoader, {
    args: [renderer]
  })

  let framesRendered = 0
  let running = $state(false)

  useTask(
    () => {
      framesRendered++
      // render for 10 frames
      if (framesRendered >= 10) {
        running = false
      }
    },
    { running: () => running }
  )
</script>

{#await loader.load(src) then splat}
  <T
    {...rest}
    dispose={false}
    is={Splat}
    args={[
      splat,
      $camera,
      {
        alphaHash,
        alphaTest,
        toneMapped
      }
    ]}
    oncreate={() => {
      running = true
    }}
  >
    {@render children?.({ ref: Splat })}
  </T>
{/await}
