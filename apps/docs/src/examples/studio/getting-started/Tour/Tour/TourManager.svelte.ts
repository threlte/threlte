import { tick } from 'svelte'
import { InstructionsManager } from './instructions/InstructionsManager.svelte'
import { MaskManager } from './masks/MaskManager.svelte'
import { CameraPositionTourStop } from './TourStop/stops/CameraPositionTourStop/CameraPositionTourStop.svelte'
import { EditorCameraTourStop } from './TourStop/stops/EditorCameraTourStop/EditorCameraTourStop.svelte'
import { InspectorTourStop } from './TourStop/stops/InspectorTourStop/InspectorTourStop.svelte'
import { IntroTourStop } from './TourStop/stops/IntroTourStop/IntroTourStop.svelte'
import { JumpToCodeTourStop } from './TourStop/stops/JumpToCodeTourStop/JumpToCodeTourStop.svelte'
import { OutroTourStop } from './TourStop/stops/OutroTourStop/OutroTourStop.svelte'
import { RotateTorusTourStop } from './TourStop/stops/RotateTorusTourStop/RotateTorusTourStop.svelte'
import { SceneHierarchyTourStop } from './TourStop/stops/SceneHierarchyTourStop/SceneHierarchyTourStop.svelte'
import { SelectTorusTourStop } from './TourStop/stops/SelectTorusTourStop/SelectTorusTourStop.svelte'
import { SyncTourStop } from './TourStop/stops/SyncTourStop/SyncTourStop.svelte'
import { ToolbarTourStop } from './TourStop/stops/ToolbarTourStop/ToolbarTourStop.svelte'
import { TransformControlsTourStop } from './TourStop/stops/TransformControlsTourStop/TransformControlsTourStop.svelte'
import { TourStop } from './TourStop/TourStop.svelte'

export class TourManager {
  public tourStopMaskManager = new MaskManager()
  public instructionsManager = new InstructionsManager()

  public currentTourStop = $state<TourStop | undefined>()

  public tourStops: TourStop[] = [
    new IntroTourStop(),
    new ToolbarTourStop(),
    new EditorCameraTourStop(),
    new SceneHierarchyTourStop(),
    new InspectorTourStop(),
    new JumpToCodeTourStop(),
    new CameraPositionTourStop(),
    new SelectTorusTourStop(),
    new TransformControlsTourStop(),
    new RotateTorusTourStop(),
    new SyncTourStop(),
    new OutroTourStop()
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

    tourStop.activate()

    tick().then(() => {
      const cleanup = $effect.root(() => {
        $effect(() => {
          if (tourStop.isCompleted) {
            this.nextStop()
          }
          if (!tourStop.isActive) {
            cleanup()
          }
        })
      })
    })
  }

  unloadCurrentTourStop() {
    if (this.currentTourStop) {
      this.currentTourStop.deactivate()
      this.tourStopMaskManager.clearMask()
      this.instructionsManager.clearInstructions()
      this.currentTourStop = undefined
    }
  }

  get tourStarted() {
    return this.currentTourStop !== undefined
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

    this.unloadCurrentTourStop()
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

    this.unloadCurrentTourStop()
    this.loadTourStop(this.tourStops[currentTourStopIndex - 1]!)
  }
}
