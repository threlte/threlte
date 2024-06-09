import { type Placement } from '@floating-ui/dom'
import type { Component, ComponentProps } from 'svelte'

export interface Instructions<T extends Component<any> = Component<any>> {
  content: {
    component: T
    props: ComponentProps<T>
  }

  style:
    | {
        type?: 'subtitle' | 'auto'
        tooltip?: {
          placement?: Placement
        }
      }
    | undefined
}
