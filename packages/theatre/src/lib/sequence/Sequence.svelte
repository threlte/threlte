<script lang="ts">
  import type { IRafDriver, ISequence } from '@theatre/core'
  import { getContext, onDestroy, setContext } from 'svelte'
  import type { SheetContext } from '../sheet/types.js'
  import type {
    Autoreset,
    IterationCount,
    PlaybackDirection,
    PlaybackRange,
    SequenceAudioOptions,
    SequenceOptions
  } from './types.js'

  // Parent context
  const { sequences } = getContext<SheetContext>('theatre-sheet')

  // Props
  let key = 'default' // not exposed yet, will be a prop in the future

  // Theatre's native playback options
  export let rate: number = 1
  export let range: PlaybackRange = undefined
  export let iterationCount: IterationCount = undefined
  export let direction: PlaybackDirection = undefined
  export let rafDriver: IRafDriver | undefined = undefined
  export let audio: SequenceAudioOptions | undefined = undefined

  // Threlte's custom playback options
  export let autoplay: boolean = false
  export let autoreset: Autoreset = undefined
  export let autopause: boolean = false
  export let delay: number = 0

  // Get the Sequence instance
  export const sequence = sequences[key]

  // autoplay logic
  if (!autoplay && delay! > 0) {
    console.warn('Sequence: delay has no effect unless the option autoplay is enabled.', {
      sequence
    })
  }

  let delayTimer: ReturnType<typeof setTimeout>

  if (autoplay) {
    delayTimer = setTimeout(() => sequence.play(), delay)
  }

  onDestroy(() => {
    clearTimeout(delayTimer)
  })

  // autopause logic
  onDestroy(() => {
    if (autopause) {
      sequence.pause()
    }
  })

  // autoreset logic
  if (autoreset === 'onMount' || autoreset === 'always') {
    sequence.reset()
  }

  onDestroy(() => {
    if (autoreset === 'onDestroy' || autoreset === 'always') {
      sequence.reset()
    }
  })

  // config reactivity
  $: sequence.config({
    audio,
    rate,
    range,
    iterationCount,
    direction,
    rafDriver
  })

  // Bindings
  const { position: positionStore, playing: playingStore, length: lengthStore } = sequence

  export let position = $positionStore
  export let playing = $playingStore
  export const length = $lengthStore

  export const play: ISequence['play'] = (opts?: SequenceOptions) => sequence.play(opts)
  export const pause: ISequence['pause'] = () => sequence.pause()

  // position
  let positionChangedBy = 'user'
  positionStore.subscribe((value) => {
    positionChangedBy = 'code'
    position = value
  })
  $: position,
    positionChangedBy === 'user' && ($positionStore = position),
    (positionChangedBy = 'user')

  // playing
  let playingChangedBy = 'user'
  playingStore.subscribe((value) => {
    playingChangedBy = 'code'
    playing = value
  })
  $: playing, playingChangedBy === 'user' && ($playingStore = playing), (playingChangedBy = 'user')

  // pass sequence to children via context
  setContext('theatre-sequence', sequence)

  // pass to parent
  sequences[key] = sequence
</script>

<slot
  {sequence}
  {position}
  {playing}
  {play}
  {pause}
/>
