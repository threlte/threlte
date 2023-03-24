<script lang="ts">
  import { globalSheets } from '../consts'
  import type { IProject, ISequence } from '@theatre/core'
  import { getContext, onDestroy, setContext } from 'svelte'
  import { onChange, val } from '../theatre'

  export let name = 'default'
  export let instance: string | undefined = undefined
  /**
   * If a number is passed, it will be used as the delay to start autoplaying
   */
  export let autoPlay: boolean | (Parameters<ISequence['play']>[0] & { delay?: number }) = false
  /**
   * Resets the playhead to 0 when the sheet is unmounted or mounted or both
   */
  export let autoReset: boolean | 'onMount' | 'onDestroy' = false
  export let autoPause = false
  export let isPlaying = false

  const project = getContext(`theatre-project`) as IProject

  const projectName = project.address.projectId

  export const sheet =
    globalSheets.get(`${projectName}-${name}-${instance}`) ?? project.sheet(name, instance)
  globalSheets.set(`${projectName}-${name}-${instance}`, sheet)

  export const sequence = sheet.sequence

  setContext(`theatre-sheet`, sheet)

  export const play: typeof sheet['sequence']['play'] = (
    ...args: Parameters<typeof sheet['sequence']['play']>
  ) => {
    return sequence.play(...args)
  }

  export const pause: typeof sheet['sequence']['pause'] = (
    ...args: Parameters<typeof sheet['sequence']['pause']>
  ) => {
    return sequence.pause(...args)
  }

  const unsubscribe = onChange(sequence.pointer.playing, (playing: boolean) => {
    isPlaying = playing
  })
  onDestroy(unsubscribe)

  export let position: number | undefined = undefined
  $: if (position !== undefined) {
    sequence.position = position
  }

  let timeoutHandler: ReturnType<typeof setTimeout> | undefined = undefined
  if (autoPlay) {
    const options = typeof autoPlay === 'boolean' ? {} : autoPlay
    if (options.delay) {
      timeoutHandler = setTimeout(() => {
        sequence.play(options)
      }, options.delay)
    } else {
      sequence.play(options)
    }
  }
  if (autoReset && (typeof autoReset === 'boolean' || autoReset === 'onMount')) {
    sequence.position = 0
  }

  onDestroy(() => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler)
    }
    if (autoPause) {
      sequence.pause()
    }
    if (autoReset && (typeof autoReset === 'boolean' || autoReset === 'onDestroy')) {
      sequence.position = 0
    }
  })
</script>

<slot {sheet} {sequence} {isPlaying} {play} {pause} />
