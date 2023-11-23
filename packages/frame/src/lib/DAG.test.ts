import { expect, test } from 'bun:test'
import { Scheduler } from './Scheduler'
import { Task } from './Task'

test('can run a task', () => {
  const scheduler = new Scheduler()
  const stage = scheduler.createStage('stage')
  stage.createTask('task', () => {
    expect(true).toBe(true)
  })
  scheduler.run(performance.now())
})

test('can run a task with a delta', () => {
  const scheduler = new Scheduler()
  const stage = scheduler.createStage('stage')
  let i = 0
  stage.createTask('task', (delta) => {
    if (i === 1) {
      expect(delta).toBeGreaterThan(0)
    }
    i++
  })
  scheduler.run(0)
  scheduler.run(16) // milliseconds
})

test('can run a task with a delta that is clamped', () => {
  const scheduler = new Scheduler({
    clampDeltaTo: 0.1
  })
  const stage = scheduler.createStage('stage')
  let i = 0
  stage.createTask('task', (delta) => {
    if (i === 1) {
      expect(delta).toBeLessThanOrEqual(0.1)
    }
    i++
  })
  scheduler.run(0)
  scheduler.run(1000) // 1 second
})

test('can run multiple tasks', () => {
  const scheduler = new Scheduler()
  const stage = scheduler.createStage('stage')
  let i = 0
  stage.createTask('task a', () => {
    i++
  })
  stage.createTask('task b', () => {
    i++
  })
  scheduler.run(0)
  expect(i).toBe(2)
})

test('can run multiple tasks in order', () => {
  const scheduler = new Scheduler()
  const stage = scheduler.createStage('stage')
  let i = 0
  stage.createTask('task a', () => {
    expect(i).toBe(0)
    i++
  })
  stage.createTask(
    'task b',
    () => {
      expect(i).toBe(1)
      i++
    },
    {
      after: 'task a'
    }
  )
  scheduler.run(0)
})

test('can run multiple stages', () => {
  const scheduler = new Scheduler()
  const stageA = scheduler.createStage('stage a')
  const stageB = scheduler.createStage('stage b')
  let i = 0
  stageA.createTask('task a', () => {
    i++
  })
  stageB.createTask('task b', () => {
    i++
  })
  scheduler.run(0)
  expect(i).toBe(2)
})

test('can run multiple stages in order', () => {
  const scheduler = new Scheduler()
  const stageA = scheduler.createStage('stage a')
  const stageB = scheduler.createStage('stage b', {
    after: 'stage a'
  })
  let i = 0
  stageA.createTask('task a', () => {
    expect(i).toBe(0)
    i++
  })
  stageB.createTask('task b', () => {
    expect(i).toBe(1)
    i++
  })
  scheduler.run(0)
})

test('can run multiple stages in order with multiple tasks', () => {
  const scheduler = new Scheduler()
  const stageA = scheduler.createStage('stage a')
  const stageB = scheduler.createStage('stage b', {
    after: 'stage a'
  })
  let i = 0
  stageA.createTask('task a', () => {
    expect(i).toBe(0)
    i++
  })
  stageA.createTask('task b', () => {
    expect(i).toBe(1)
    i++
  })
  stageB.createTask('task c', () => {
    expect(i).toBe(2)
    i++
  })
  stageB.createTask('task d', () => {
    expect(i).toBe(3)
    i++
  })
  scheduler.run(0)
})

test('can run stages in order that have dependencies on other stages that are not yet created', () => {
  const scheduler = new Scheduler()
  // first create stage B, then stage A, then stage C
  const stageB = scheduler.createStage('stage b')
  const stageA = scheduler.createStage('stage a', {
    before: 'stage b'
  })
  const stageC = scheduler.createStage('stage c', {
    after: 'stage b'
  })
  let i = 0
  stageA.createTask('task a', () => {
    expect(i).toBe(0)
    i++
  })
  stageB.createTask('task b', () => {
    expect(i).toBe(1)
    i++
  })
  stageC.createTask('task c', () => {
    expect(i).toBe(2)
    i++
  })
  scheduler.run(0)
})

test('stress test', () => {
  let i = 0

  const scheduler = new Scheduler()

  const defaultStage = scheduler.createStage('default stage')

  defaultStage.createTask('move object', (delta) => {
    expect(i).toBe(2)
    i++
  })

  defaultStage.createTask(
    'move camera',
    (delta) => {
      expect(i).toBe(3)
      i++
    },
    {
      after: 'move object'
    }
  )

  const triggerSounds = new Task(() => {
    expect(i).toBe(4)
    i++
  })
  defaultStage.addTask('trigger sounds', triggerSounds, {
    after: 'move camera'
  })

  const renderStage = scheduler.createStage('render stage', {
    after: 'default stage'
  })

  renderStage.createTask('render', (delta) => {
    expect(i).toBe(6)
    i++
  })

  const afterDefaultAndOtherStep = defaultStage.createTask(
    'after other tasks',
    () => {
      expect(i).toBe(5)
      i++
    },
    {
      after: ['move camera', 'trigger sounds']
    }
  )

  const physicsStage = scheduler.createStage('physics stage', {
    before: 'default stage'
  })

  physicsStage.createTask('physics', (delta) => {
    expect(i).toBe(1)
    i++
  })

  const frameAnalyticsStartStage = scheduler.createStage('frame analytics start', {
    before: 'physics stage'
  })
  const frameAnalyticsEndStage = scheduler.createStage('frame analytics end', {
    after: 'render stage'
  })
  frameAnalyticsStartStage.createTask('frame-analytics-start', (delta) => {
    expect(i).toBe(0)
    i++
  })
  frameAnalyticsEndStage.createTask('frame-analytics-end', (delta) => {
    expect(i).toBe(7)
    i++
  })

  const someStage = scheduler.createStage('some stage', {
    after: 'some other stage'
  })
  const someOtherStage = scheduler.createStage('some other stage', {
    after: 'default stage',
    before: 'render stage'
  })

  console.log(scheduler.getSchedule())
  scheduler.run(0)
})
