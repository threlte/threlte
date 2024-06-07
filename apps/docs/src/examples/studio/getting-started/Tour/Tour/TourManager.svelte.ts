import { InstructionsManager } from './InstructionsManager.svelte'
import { MaskManager } from './masks/MaskManager.svelte'
import { EditorCameraTourStop } from './TourStop/stops/EditorCameraTourStop.svelte'
import { IntroTourStop } from './TourStop/stops/IntroTourStop.svelte'
import { SceneHierarchyTourStop } from './TourStop/stops/SceneHierarchyTourStop.svelte'
import { SelectTorusTourStop } from './TourStop/stops/SelectTorusTourStop.svelte'
import { SpaceTourStop } from './TourStop/stops/SpaceTourStop.svelte'
import { TourStop } from './TourStop/TourStop.svelte'

export class TourManager {
  public tourStopMaskManager = new MaskManager()
  public instructionsManager = new InstructionsManager()

  public currentTourStop = $state<TourStop | undefined>()

  public tourStops: TourStop[] = [
    new IntroTourStop(),
    new SelectTorusTourStop(),
    new EditorCameraTourStop(),
    new SceneHierarchyTourStop(),
    new SpaceTourStop()
  ]

  startTour() {
    this.loadTourStop(this.tourStops[0]!)
  }

  stopTour() {
    this.unloadCurrentTourStop()
  }

  loadTourStop(tourStop: TourStop) {
    this.currentTourStop = tourStop
    if (tourStop.mask) {
      this.tourStopMaskManager.setMask(tourStop.mask)
    } else {
      this.tourStopMaskManager.clearMask()
    }

    if (tourStop.instructions) {
      this.instructionsManager.setInstructions(tourStop.instructions)
    } else {
      this.instructionsManager.clearInstructions()
    }

    tourStop.isActive = true

    const cleanup = $effect.root(() => {
      $effect(() => {
        if (tourStop.isCompleted) {
          cleanup()
          this.nextStop()
        }
      })
    })
  }

  unloadCurrentTourStop() {
    if (this.currentTourStop) {
      this.currentTourStop.isActive = false
      this.tourStopMaskManager.clearMask()
      this.instructionsManager.clearInstructions()
      this.currentTourStop = undefined
    }
  }

  nextStop() {
    if (!this.currentTourStop) {
      console.error('Tour not started')
      return
    }

    const currentTourStopIndex = this.tourStops.indexOf(this.currentTourStop)
    if (currentTourStopIndex === this.tourStops.length - 1) {
      this.stopTour()
      return
    }

    this.loadTourStop(this.tourStops[currentTourStopIndex + 1]!)
  }

  previousStop() {
    if (!this.currentTourStop) {
      console.error('Tour not started')
      return
    }

    const currentTourStopIndex = this.tourStops.indexOf(this.currentTourStop)

    if (currentTourStopIndex === 0) {
      console.error('No previous stop')
      return
    }

    this.loadTourStop(this.tourStops[currentTourStopIndex - 1]!)
  }
}
