import { expect, test } from 'vitest'
import { Scheduler } from './Scheduler.js'

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

test('can use symbols as stage key', () => {
  const scheduler = new Scheduler()
  const symbol = Symbol('stage')
  const stage = scheduler.createStage(symbol)
  let i = 0
  stage.createTask('task a', () => {
    i++
  })
  stage.createTask('task b', () => {
    i++
  })
  scheduler.run(0)
  expect(i).toBe(2)

  const plan = scheduler.getSchedule()
  const stages = plan.stages.map((stage) => stage.key)
  expect(stages).toEqual([symbol.toString()])
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

test('can add and remove stages', () => {
  enum Stages {
    stageA = 'stage a',
    stageB = 'stage b',
    stageC = 'stage c'
  }
  const scheduler = new Scheduler()
  scheduler.createStage(Stages.stageA)
  scheduler.createStage(Stages.stageB, {
    after: Stages.stageA
  })
  scheduler.createStage(Stages.stageC, {
    after: [Stages.stageA, Stages.stageB]
  })
  const expectedStagesOrder = [Stages.stageA, Stages.stageB, Stages.stageC]
  const plan = scheduler.getSchedule()
  const actualStagesOrder = plan.stages.map((stage) => stage.key)
  expect(actualStagesOrder).toEqual(expectedStagesOrder)
  scheduler.removeStage(Stages.stageB)

  const newPlan = scheduler.getSchedule()
  const newActualStagesOrder = newPlan.stages.map((stage) => stage.key)
  const newExpectedStagesOrder = [Stages.stageA, Stages.stageC]
  expect(newActualStagesOrder).toEqual(newExpectedStagesOrder)
})

test('can add and remove tasks', () => {
  enum Tasks {
    taskA = 'task a',
    taskB = 'task b',
    taskC = 'task c'
  }
  const scheduler = new Scheduler()
  const stage = scheduler.createStage('stage')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stage.createTask(Tasks.taskA, () => {})
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stage.createTask(Tasks.taskB, () => {}, {
    after: Tasks.taskA
  })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stage.createTask(Tasks.taskC, () => {}, {
    after: [Tasks.taskA, Tasks.taskB]
  })

  const expectedTasksOrder = [Tasks.taskA, Tasks.taskB, Tasks.taskC]
  const plan = scheduler.getSchedule()
  const actualTasksOrder = plan.stages
    .find((stage) => stage.key === 'stage')
    ?.tasks?.map((task) => task)
  expect(actualTasksOrder).toEqual(expectedTasksOrder)
  stage.removeTask(Tasks.taskB)

  const newPlan = scheduler.getSchedule()
  const newActualTasksOrder = newPlan.stages
    .find((stage) => stage.key === 'stage')
    ?.tasks?.map((task) => task)
  const newExpectedStagesOrder = [Tasks.taskA, Tasks.taskC]
  expect(newActualTasksOrder).toEqual(newExpectedStagesOrder)
})

test('stress test', () => {
  let i = 0

  const scheduler = new Scheduler()

  const defaultStage = scheduler.createStage('default stage')

  defaultStage.createTask('move object', () => {
    expect(i).toBe(2)
    i++
  })

  defaultStage.createTask(
    'move camera',
    () => {
      expect(i).toBe(3)
      i++
    },
    {
      after: 'move object'
    }
  )

  defaultStage.createTask(
    'trigger sounds',
    () => {
      expect(i).toBe(4)
      i++
    },
    {
      after: 'move camera'
    }
  )

  const renderStage = scheduler.createStage('render stage', {
    after: 'default stage'
  })

  renderStage.createTask('render', () => {
    expect(i).toBe(6)
    i++
  })

  defaultStage.createTask(
    'after other tasks',
    () => {
      expect(i).toBe(5)
      i++
    },
    {
      after: ['move camera', 'trigger sounds']
    }
  )

  const simulationStage = scheduler.createStage('physics stage', {
    before: 'default stage'
  })

  simulationStage.createTask('physics', () => {
    expect(i).toBe(1)
    i++
  })

  const frameAnalyticsStartStage = scheduler.createStage('frame analytics start', {
    before: 'physics stage'
  })
  const frameAnalyticsEndStage = scheduler.createStage('frame analytics end', {
    after: 'render stage'
  })
  frameAnalyticsStartStage.createTask('frame-analytics-start', () => {
    expect(i).toBe(0)
    i++
  })
  frameAnalyticsEndStage.createTask('frame-analytics-end', () => {
    expect(i).toBe(7)
    i++
  })

  scheduler.run(0)
})

test('stress test II', () => {
  const scheduler = new Scheduler()

  enum Stages {
    default = 'default stage',
    render = 'render stage',
    physics = 'physics stage',
    frameStart = 'frame analytics start',
    frameEnd = 'frame analytics end',
    someOther = 'some other stage',
    afterSomeOther = 'after some other stage'
  }

  scheduler.createStage(Stages.default)
  scheduler.createStage(Stages.render, {
    after: Stages.default
  })
  scheduler.createStage(Stages.physics, {
    before: Stages.default
  })
  scheduler.createStage(Stages.frameStart, {
    before: Stages.physics
  })
  scheduler.createStage(Stages.frameEnd, {
    after: Stages.render
  })
  scheduler.createStage(Stages.afterSomeOther, {
    after: Stages.someOther
  })
  scheduler.createStage(Stages.someOther, {
    after: Stages.default,
    before: Stages.render
  })

  const schedule = scheduler.getSchedule()

  const stages = schedule.stages.map((stage) => stage.key)

  const expectedStages = [
    Stages.frameStart,
    Stages.physics,
    Stages.default,
    Stages.someOther,
    Stages.afterSomeOther,
    Stages.render,
    Stages.frameEnd
  ]

  expect(stages).toEqual(expectedStages)

  scheduler.run(0)
})

test('receives event notitifactions on stages and tasks', () => {
  const scheduler = new Scheduler()

  let receivedStageAdded = false
  let receivedStageRemoved = false
  scheduler.on('node:added', () => {
    receivedStageAdded = true
  })
  scheduler.on('node:removed', () => {
    receivedStageRemoved = true
  })
  const stage = scheduler.createStage('stage')
  let receivedTaskAdded = false
  let receivedTaskRemoved = false
  stage.on('node:added', () => {
    receivedTaskAdded = true
  })
  stage.on('node:removed', () => {
    receivedTaskRemoved = true
  })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stage.createTask('task', () => {})
  stage.removeTask('task')
  scheduler.removeStage('stage')
  expect(receivedStageAdded).toBe(true)
  expect(receivedStageRemoved).toBe(true)
  expect(receivedTaskAdded).toBe(true)
  expect(receivedTaskRemoved).toBe(true)
})
