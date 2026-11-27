import { beforeEach } from 'vitest'

import { act, cleanup } from './index.js'

const afterEach = async () => {
  await act()
  cleanup()
}

beforeEach(() => {
  return afterEach
})
