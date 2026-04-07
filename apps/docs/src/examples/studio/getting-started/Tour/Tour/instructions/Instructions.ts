import type { Placement } from '@floating-ui/dom'

export interface Instructions {
  content: {
    component: (...args: any[]) => any
    props?: Record<string, any>
  }

  style:
    | {
        type?: 'subtitle' | 'auto'
        subtitle?: {
          placement?: 'bottom' | 'center'
        }
        tooltip?: {
          placement?: Placement
        }
      }
    | undefined
}
