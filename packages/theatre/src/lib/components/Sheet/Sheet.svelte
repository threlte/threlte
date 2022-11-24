<script lang="ts">
  import { globalSheets } from '../consts'
  import type { IProject, ISequence } from '@theatre/core'
  import { getContext, onDestroy, setContext } from 'svelte'
  import { onChange, val } from '../theatre'

  export let projectName = 'default'
  export let sheetName = 'default'
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

  const project = getContext(`theatre-project-${projectName}`) as IProject

  export const sheet = globalSheets.get(`${projectName}-${sheetName}`) ?? project.sheet(sheetName)
  globalSheets.set(`${projectName}-${sheetName}`, sheet)

  setContext(`theatre-project-${projectName}-sheet-${sheetName}`, sheet)

  export const play: typeof sheet['sequence']['play'] = (
    ...args: Parameters<typeof sheet['sequence']['play']>
  ) => {
    isPlaying = true
    return sheet.sequence.play(...args)
  }

  export const pause: typeof sheet['sequence']['pause'] = (
    ...args: Parameters<typeof sheet['sequence']['pause']>
  ) => {
    isPlaying = false
    return sheet.sequence.pause(...args)
  }

  const unsubscribe = onChange(sheet.sequence.pointer.playing, (playing: boolean) => {
    isPlaying = playing
  })
  onDestroy(unsubscribe)

  export let position: number | undefined = undefined
  $: if (position !== undefined) {
    sheet.sequence.position = position
  }

  let timeoutHandler: ReturnType<typeof setTimeout> | undefined = undefined
  if (autoPlay) {
    const options = typeof autoPlay === 'boolean' ? {} : autoPlay
    if (options.delay) {
      timeoutHandler = setTimeout(() => {
        sheet.sequence.play(options)
        isPlaying = true
      }, options.delay)
    } else {
      sheet.sequence.play(options)
      isPlaying = true
    }
  }
  if (autoReset && (typeof autoReset === 'boolean' || autoReset === 'onMount')) {
    sheet.sequence.position = 0
  }

  onDestroy(() => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler)
    }
    if (autoPause) {
      sheet.sequence.pause()
      isPlaying = false
    }
    if (autoReset && (typeof autoReset === 'boolean' || autoReset === 'onDestroy')) {
      sheet.sequence.position = 0
    }
  })
</script>

<slot
  {sheet}
  sequence={sheet.sequence}
  {isPlaying}
  {play}
  {pause}
/>
