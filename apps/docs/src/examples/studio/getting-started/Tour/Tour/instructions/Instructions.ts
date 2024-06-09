import { type Placement } from '@floating-ui/dom'

export interface Instructions {
  message: string

  style:
    | {
        type?: 'subtitle' | 'auto'
        tooltip?: {
          placement?: Placement
        }
      }
    | undefined
}
