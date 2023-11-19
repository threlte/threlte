import { SvelteComponent } from 'svelte'
import type { ComponentEvents, ComponentProps } from 'svelte'
import type InnerFlex from './InnerFlex.svelte'

type FlexProps = Omit<ComponentProps<InnerFlex>, 'yoga'>

type FlexEvents = ComponentEvents<InnerFlex>

// Currently, there's no svelte helper to get the slots of a component.
type FlexSlots = {
  default: {
    reflow: () => void
    width: number
    height: number
  }
}

export default class Flex extends SvelteComponent<FlexProps, FlexEvents, FlexSlots> {}
