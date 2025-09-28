import { SvelteMap } from 'svelte/reactivity'
import type { ThrelteEvents } from '../../../interactivity/types'

type InteractivityCallback<T extends keyof ThrelteEvents = keyof ThrelteEvents> = (
  event: ThrelteEvents[T]
) => void

export class InstancedMesh2Interactivity {
  onclick = $state(new SvelteMap<number, InteractivityCallback<'onclick'>>())
  oncontextmenu = $state(new SvelteMap<number, InteractivityCallback<'oncontextmenu'>>())
  ondblclick = $state(new SvelteMap<number, InteractivityCallback<'ondblclick'>>())
  onwheel = $state(new SvelteMap<number, InteractivityCallback<'onwheel'>>())
  onpointerup = $state(new SvelteMap<number, InteractivityCallback<'onpointerup'>>())
  onpointerdown = $state(new SvelteMap<number, InteractivityCallback<'onpointerdown'>>())
  onpointerover = $state(new SvelteMap<number, InteractivityCallback<'onpointerover'>>())
  onpointerout = $state(new SvelteMap<number, InteractivityCallback<'onpointerout'>>())
  onpointerenter = $state(new SvelteMap<number, InteractivityCallback<'onpointerenter'>>())
  onpointerleave = $state(new SvelteMap<number, InteractivityCallback<'onpointerleave'>>())
  onpointermove = $state(new SvelteMap<number, InteractivityCallback<'onpointermove'>>())
  // todo come back to this, mouse event special?
  onpointermissed = $state(new SvelteMap<number, InteractivityCallback<'onpointermissed'>>())

  constructor() {}

  get eventCount() {
    return (
      this.onclick.size +
      this.oncontextmenu.size +
      this.ondblclick.size +
      this.onwheel.size +
      this.onpointerup.size +
      this.onpointerdown.size +
      this.onpointerover.size +
      this.onpointerout.size +
      this.onpointerenter.size +
      this.onpointerleave.size +
      this.onpointermove.size +
      this.onpointermissed.size
    )
  }
}
