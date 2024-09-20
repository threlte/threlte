<script lang="ts">
  import { Splat, SplatLoader } from '@pmndrs/vanilla'
  import { T, useLoader, useTask, useThrelte } from '@threlte/core'
  export let src: string
  export let alphaHash = false
  export let alphaTest: number | undefined = undefined
  export let toneMapped: boolean | undefined = undefined

  const { renderer, camera } = useThrelte()

  const loader = useLoader(SplatLoader, {
    args: [renderer]
  })

  let framesRendered = 0
  const { start, stop } = useTask(
    () => {
      framesRendered++
      // render for 10 frames
      if (framesRendered >= 10) {
        stop()
        framesRendered = 0
      }
    },
    { autoStart: false }
  )
</script>

{#await loader.load(src) then splat}
  <T
    {...$$restProps}
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
    oncreate={start}
  >
    <slot ref={Splat} />
  </T>
{/await}
