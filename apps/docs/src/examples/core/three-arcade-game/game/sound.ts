import { AudioLoader } from 'three'

const sounds = {
  bounce1: '/audio/ball_bounce_1.mp3',
  bounce2: '/audio/ball_bounce_2.mp3',
  bounce3: '/audio/ball_bounce_3.mp3',
  bounce4: '/audio/ball_bounce_4.mp3',
  bounce5: '/audio/ball_bounce_5.mp3',
  bounce6: '/audio/ball_bounce_6.mp3',
  bounce7: '/audio/ball_bounce_7.mp3',
  bounce8: '/audio/ball_bounce_8.mp3',
  bounce9: '/audio/ball_bounce_9.mp3',
  intro: '/audio/arcade_intro.mp3',
  intro2: '/audio/arcade_intro2.m4a',
  intro3: '/audio/arcade_intro3.m4a',
  levelSlow: '/audio/level_slow.m4a',
  levelComplete: '/audio/level_complete.m4a',
  gameOver: '/audio/game_over.m4a',
  gameOver2: '/audio/game_over2.m4a'
} as const
type Sounds = keyof typeof sounds

type Groups = 'bounce'

type PlayOptions = {
  when?: number
  loop?: boolean
  volume?: number
  playbackRate?: number
}

export type ArcadeAudio = {
  source: AudioBufferSourceNode
  gain: GainNode
  fade: (
    volume: number,
    duration: number,
    options?: { type?: 'linear' | 'exponential' }
  ) => Promise<void> | undefined
  setVolume: (volume: number) => void
  onEnded: () => Promise<void>
}

export class Sound {
  context: AudioContext | undefined = undefined
  globalGainNode: GainNode | undefined = undefined
  groups: Record<Groups, Sounds[]> = {
    bounce: [
      'bounce1',
      'bounce2',
      'bounce3',
      'bounce4',
      'bounce5',
      'bounce6',
      'bounce7',
      'bounce8',
      'bounce9'
    ]
  }
  audioBuffers: Record<Sounds, AudioBuffer> = {} as Record<Sounds, AudioBuffer>
  buffersLoaded = false
  debounceInMs = 150
  randomLimits: [min: number, max: number] = [-20, 150]

  audioLoader = new AudioLoader()
  lastPlayed: Record<Groups, number> = Object.keys(this.groups).reduce(
    (acc, key) => {
      acc[key as Groups] = 0
      return acc
    },
    {} as Record<Groups, number>
  )
  constructor() {
    this.context = new AudioContext()
    this.globalGainNode = this.context.createGain()
    this.globalGainNode.connect(this.context.destination)
    this.initAudio()
    if (typeof window === 'undefined') return
    window.addEventListener('click', () => {
      if (this.context) this.context.resume()
    })
    window.addEventListener('keydown', () => {
      if (this.context) this.context.resume()
    })
  }
  async initAudio() {
    const promises = Object.entries(sounds).map(async ([sound, url]) => {
      if (!this.context) return
      const audioBuffer = await this.loadAudioBuffer(url)
      this.audioBuffers[sound as Sounds] = audioBuffer
    })
    await Promise.all(promises)
    this.buffersLoaded = true
  }
  resume() {
    if (this.context) this.context.resume()
  }
  loadAudioBuffer(url: string): Promise<AudioBuffer> {
    return new Promise((resolve) => {
      this.audioLoader.load(url, (buffer) => {
        resolve(buffer)
      })
    })
  }
  play(sound: Sounds, options?: PlayOptions): ArcadeAudio | undefined {
    if (!this.context || !this.globalGainNode) return
    const now = Date.now()
    const groupsOfSound = Object.entries(this.groups).filter(([, sounds]) => sounds.includes(sound))

    const randomDebounce =
      this.debounceInMs +
      (Math.random() * (this.randomLimits[1] - this.randomLimits[0]) + this.randomLimits[0])
    const shouldBeSkipped = groupsOfSound.reduce((shouldBeSkipped, [group]) => {
      const lastPlayedTime = this.lastPlayed[group as Groups]
      if (now - lastPlayedTime < randomDebounce) return true
      return shouldBeSkipped
    }, false)
    if (shouldBeSkipped) return

    const buffer = this.audioBuffers[sound]
    if (!buffer) return
    if (this.context.state === 'suspended' || this.context.state === 'closed') this.context.resume()
    const source = this.context.createBufferSource()
    source.buffer = buffer
    const gainNode = this.context.createGain()
    source.connect(gainNode)
    gainNode.connect(this.globalGainNode)
    let volume = options?.volume ?? 1
    volume = volume === 0 ? 0.000000001 : volume
    gainNode.gain.value = volume
    source.loop = options?.loop ?? false
    source.playbackRate.value = options?.playbackRate ?? 1
    source.start(options?.when)

    groupsOfSound.forEach(([group]) => {
      this.lastPlayed[group as Groups] = now
    })

    const setVolume = (volume: number) => {
      if (!this.context) return
      gainNode.gain.cancelScheduledValues(this.context.currentTime)
      gainNode.gain.value = volume
    }

    const fade = (
      volume: number,
      duration: number,
      options?: {
        type?: 'linear' | 'exponential'
      }
    ) => {
      if (!this.context) return
      if (volume === 0) {
        volume = 0.000000001
      }
      gainNode.gain.setValueAtTime(gainNode.gain.value, this.context.currentTime)
      if (options?.type === 'exponential') {
        gainNode.gain.exponentialRampToValueAtTime(
          volume,
          this.context.currentTime + duration / 1000
        )
      } else {
        gainNode.gain.exponentialRampToValueAtTime(
          volume,
          this.context.currentTime + duration / 1000
        )
      }
      return new Promise<void>((resolve) => setTimeout(resolve, duration))
    }

    return {
      source,
      gain: gainNode,
      fade,
      setVolume,
      onEnded: () => {
        return new Promise((resolve) => {
          const onEnded = () => {
            source.removeEventListener('ended', onEnded)
            resolve()
          }
          source.addEventListener('ended', onEnded)
        })
      }
    }
  }
  playFromGroup(group: Groups, options?: PlayOptions) {
    const sound = this.groups[group][Math.floor(Math.random() * this.groups[group].length)]
    const source = this.play(sound!, options)
    return source
  }
  handleMuted(muted: boolean) {
    if (!this.globalGainNode) return
    if (muted) {
      this.globalGainNode.gain.value = 0
    } else {
      this.resume()
      this.globalGainNode.gain.value = 1
    }
  }
}
