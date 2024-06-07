import type { Instructions } from './instructions/Instructions'

export class InstructionsManager {
  public wrapper = $state<HTMLElement>()

  private currentInstructions = $state<Instructions | undefined>()

  private currentMessageIndex = $state<number>(0)

  public currentMessage = $derived(this.currentInstructions?.messages[this.currentMessageIndex])

  public hasMultipleMessages = $derived(
    this.currentInstructions && this.currentInstructions.messages.length > 1
  )

  constructor() {}

  setInstructions(instructions: Instructions) {
    this.currentMessageIndex = 0
    this.currentInstructions = instructions
  }

  clearInstructions() {
    this.currentMessageIndex = 0
    this.currentInstructions = undefined
  }

  nextMessage() {
    if (
      this.currentInstructions &&
      this.currentMessageIndex < this.currentInstructions.messages.length - 1
    ) {
      this.currentMessageIndex++
    }
  }

  previousMessage() {
    if (this.currentInstructions && this.currentMessageIndex > 0) {
      this.currentMessageIndex--
    }
  }
}
