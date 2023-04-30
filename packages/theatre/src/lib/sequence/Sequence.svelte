<script lang="ts">
  import type { ISequence, IRafDriver } from '@theatre/core'

  import { getContext, onMount, onDestroy, setContext } from 'svelte'

  import type { SheetContext } from '../sheet/types'

  import type {
    Autoreset,
    PlaybackRange,
    IterationCount,
    PlaybackDirection,
    SequenceAudioOptions,
    SequenceOptions
  } from './types'
  import { Sequence } from './sequence'

  // PARENT CONTEXT

  export const { sheet, sequences }: SheetContext = getContext('theatre-sheet')

  // PROPS

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

  // INIT

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

  // BINDINGS

  const { position: positionStore, playing: playingStore, length: lengthStore } = sequence

  export let position = $positionStore
  export let playing = $playingStore
  export const length = $lengthStore

  export const play: ISequence['play'] = (opts?: SequenceOptions) => sequence.play(opts)
  export const pause: ISequence['pause'] = () => sequence.pause()

  // REACTIVITY

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

  // CONTEXTS

  // pass to children
  setContext(`theatre-sequence-[${key}]`, sequence)

  // pass to parent
  sequences[key] = sequence

  // CLEANUP

  onDestroy(() => {
    delete sequences[key]
    sequence.destroy()
  })
</script>

<slot {sequence} {position} {playing} {play} {pause} />
