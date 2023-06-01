<script lang="ts">
  import type { IRafDriver, ISequence } from '@theatre/core'
  import { getContext, onDestroy, onMount, setContext } from 'svelte'
  import type { SheetContext } from '../sheet/types'
  import type {
    Autoreset,
    IterationCount,
    PlaybackDirection,
    PlaybackRange,
    SequenceAudioOptions,
    SequenceOptions
  } from './types'

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

  let mounted = false
  onMount(() => (mounted = true))

  // config reactivity
  $: mounted,
    sequence.config({
      audio,
      autoplay,
      autoreset,
      autopause,
      delay
    })
  // some options require replaying
  // we seperate these for performance
  $: mounted,
    sequence.config({
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

  // Cleanup
  onDestroy(() => {
    delete sequences[key]
    sequence.destroy()
  })
</script>

<slot {sequence} {position} {playing} {play} {pause} />
