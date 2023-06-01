<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, Text, interactivity } from '@threlte/extras'
  import { useSequence } from '@threlte/theatre'

  import Feather from './Feather.svelte'

  interactivity()

  const { position, config } = useSequence()

  // adjust playback settings
  config({ iterationCount: Infinity, rate: 0.5 })

  const format = (num: number) =>
    num.toLocaleString('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    })

  $: time = format($position)
</script>

<Feather />

<Text
  position.x={1}
  text={time}
/>

<T.PerspectiveCamera
  position.z={2}
  makeDefault
/>

<T.AmbientLight intensity={0.2} />

<Environment
  path="/hdr/"
  files="industrial_sunset_puresky_1k.hdr"
  isBackground={true}
  format="hdr"
  groundProjection={{ radius: 200, height: 5, scale: 100 }}
/>
