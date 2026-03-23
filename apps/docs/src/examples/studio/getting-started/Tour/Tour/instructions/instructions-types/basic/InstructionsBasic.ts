import type { Instructions } from '../../Instructions'
import InstructionsBasicComponent from './InstructionsBasic.svelte'

export class InstructionsBasic implements Instructions {
  constructor(
    private readonly options: {
      message?: string
      headline?: string
      style?: Instructions['style']
      clickAnywhere?: boolean
      centerText?: boolean
      cta?: string
      tip?: string
    }
  ) {}

  get style() {
    return this.options.style
  }

  get content() {
    return {
      component: InstructionsBasicComponent,
      props: {
        message: this.options.message,
        headline: this.options.headline,
        clickAnywhere: this.options.clickAnywhere,
        centerText: this.options.centerText,
        cta: this.options.cta,
        tip: this.options.tip
      }
    }
  }
}
