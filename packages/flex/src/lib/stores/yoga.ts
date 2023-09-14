import { currentWritable } from '@threlte/core'
import { loadYoga } from 'yoga-layout'

let loading = false
let loaded = false

export const yoga = currentWritable<Awaited<ReturnType<typeof loadYoga>> | undefined>(undefined)

const load = async () => {
  if (loading || loaded) return
  const yogaInstance = await loadYoga()
  yoga.set(yogaInstance)
}

load()
