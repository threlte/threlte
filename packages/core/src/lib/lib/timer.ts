/**
 * Guided by https://github.com/mrdoob/three.js/pull/17912
 */
const start = performance.now()

let then = 0
let now = 0
let delta = 0
let elapsed = 0

const reset = () => {
  now = performance.now() - start
}

const update = () => {
  then = now
  now = performance.now() - start
  delta = now - then
  elapsed += delta
}

export const timer = {
  update,
  reset,
  get now() { return now },
  get delta() { return delta / 1000 },
  get elapsed() { return elapsed / 1000 },
}
