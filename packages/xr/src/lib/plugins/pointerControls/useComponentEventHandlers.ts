import { onMount } from 'svelte'
import { get_current_component } from 'svelte/internal'
import { writable } from 'svelte/store'
import type { ThrelteXREvents } from './types'

export const eventNames: (keyof ThrelteXREvents)[] = [
  'click',
  'contextmenu',
  'pointerup',
  'pointerdown',
  'pointerover',
  'pointerout',
  'pointerenter',
  'pointerleave',
  'pointermove'
]

export const useComponentHasEventHandlers = () => {
  const component = get_current_component()
  const hasEventHandlers = writable(false)

  onMount(() => {
    const match = Object.keys(component.$$.callbacks).some((value) =>
      eventNames.includes(value)
    )
    hasEventHandlers.set(match)
  })

  return {
    hasEventHandlers
  }
}
