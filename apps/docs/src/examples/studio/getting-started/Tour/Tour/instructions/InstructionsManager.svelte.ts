import type { Instructions } from './Instructions'
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom'
import { useStage, useTask } from '@threlte/core'
import { tick } from 'svelte'

export class InstructionsManager {
  public wrapper = $state<HTMLElement>()

  public currentInstructions = $state<Instructions | undefined>()

  public referenceElement = $state<SVGRectElement>()
  public tooltipElement = $state<HTMLElement>()
  public tooltipArrowElement = $state<HTMLElement>()

  public isToolTip = $state<boolean>(false)

  constructor() {
    const tourStage = useStage('tour')

    let running = $state(false)

    useTask(
      () => {
        if (!this.referenceElement || !this.currentInstructions) return
        const hasMask = this.referenceElement.style.display !== 'none'
        const isAutoToolTip =
          !this.currentInstructions?.style?.type || this.currentInstructions.style.type === 'auto'
        this.isToolTip = hasMask && isAutoToolTip
        if (this.isToolTip) {
          tick().then(() => {
            const placement = this.currentInstructions?.style?.tooltip?.placement || 'bottom'
            computePosition(this.referenceElement!, this.tooltipElement!, {
              placement: placement,
              middleware: [
                flip(),
                shift({
                  padding: 12
                }),
                offset(12),
                arrow({
                  element: this.tooltipArrowElement!
                })
              ]
            }).then(({ x, y, middlewareData, placement }) => {
              this.tooltipElement!.style.transform = `translate(${x}px, ${y}px)`

              if (!middlewareData.arrow) return
              const { x: arrowX, y: arrowY } = middlewareData.arrow

              const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right'
              }[placement.split('-')[0]!]

              Object.assign(this.tooltipArrowElement!.style, {
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                right: '',
                bottom: '',
                [staticSide!]: '-4px'
              })
            })
          })
        }
        running = false
      },
      {
        stage: tourStage,
        after: 'mask',
        running: () => running
      }
    )

    $effect.pre(() => {
      this.referenceElement, this.tooltipElement, this.wrapper, this.currentInstructions
      running = true
    })
  }

  setInstructions(instructions: Instructions) {
    this.currentInstructions = instructions
  }

  clearInstructions() {
    this.currentInstructions = undefined
  }
}
