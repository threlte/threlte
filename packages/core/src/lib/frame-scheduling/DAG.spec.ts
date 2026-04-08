import { describe, it, expect, test } from 'vitest'
import { Scheduler } from './Scheduler.js'

describe('DAG', () => {
  it('can run a task', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    stage.createTask('task', () => {
      expect(true).toBe(true)
    })
    scheduler.run(performance.now())
  })

  it('can run a task with a delta', () => {
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

  it('can run a task with a delta that is clamped', () => {
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

  it('can run multiple tasks', () => {
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

  it('can use symbols as stage key', () => {
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

  it('can run multiple tasks in order', () => {
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

  it('can run multiple stages', () => {
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

  it('can run multiple stages in order', () => {
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

  it('can run multiple stages in order with multiple tasks', () => {
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

  it('can run stages in order that have dependencies on other stages that are not yet created', () => {
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

  it('can add and remove stages', () => {
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

  it('can add and remove tasks', () => {
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

  it('receives event notitifactions on stages and tasks', () => {
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

  it('throws when adding a duplicate task key', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    stage.createTask('task a', () => {})
    expect(() => stage.createTask('task a', () => {})).toThrow('already exists')
  })

  it('throws when adding a duplicate stage key', () => {
    const scheduler = new Scheduler()
    scheduler.createStage('stage a')
    expect(() => scheduler.createStage('stage a')).toThrow('already exists')
  })

  it('does not throw when removing a non-existent task', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    expect(() => stage.removeTask('nonexistent')).not.toThrow()
  })

  it('does not throw when removing a non-existent stage', () => {
    const scheduler = new Scheduler()
    expect(() => scheduler.removeStage('nonexistent')).not.toThrow()
  })

  it('can order tasks using before', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    let i = 0
    stage.createTask('task b', () => {
      expect(i).toBe(1)
      i++
    })
    stage.createTask(
      'task a',
      () => {
        expect(i).toBe(0)
        i++
      },
      { before: 'task b' }
    )
    scheduler.run(0)
    expect(i).toBe(2)
  })

  it('can use both before and after on the same task', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    let i = 0
    stage.createTask('task a', () => {
      expect(i).toBe(0)
      i++
    })
    stage.createTask('task c', () => {
      expect(i).toBe(2)
      i++
    })
    stage.createTask(
      'task b',
      () => {
        expect(i).toBe(1)
        i++
      },
      { after: 'task a', before: 'task c' }
    )
    scheduler.run(0)
    expect(i).toBe(3)
  })

  it('can reference tasks that are not yet created', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    let i = 0
    // task a references task b via "before", but task b doesn't exist yet
    stage.createTask(
      'task a',
      () => {
        expect(i).toBe(0)
        i++
      },
      { before: 'task b' }
    )
    stage.createTask('task b', () => {
      expect(i).toBe(1)
      i++
    })
    scheduler.run(0)
    expect(i).toBe(2)
  })

  it('does not run stopped tasks', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    let count = 0
    const task = stage.createTask('task', () => {
      count++
    })
    scheduler.run(0)
    expect(count).toBe(1)

    task.stop()
    scheduler.run(16)
    expect(count).toBe(1)

    task.start()
    scheduler.run(32)
    expect(count).toBe(2)
  })

  it('stage callback can conditionally skip tasks', () => {
    const scheduler = new Scheduler()
    let shouldRun = false
    const stage = scheduler.createStage('stage', {
      callback(_, runTasks) {
        if (shouldRun) runTasks()
      }
    })
    let count = 0
    stage.createTask('task', () => {
      count++
    })

    scheduler.run(0)
    expect(count).toBe(0)

    shouldRun = true
    scheduler.run(16)
    expect(count).toBe(1)
  })

  it('getStage returns undefined for non-existent key', () => {
    const scheduler = new Scheduler()
    expect(scheduler.getStage('nonexistent')).toBeUndefined()
  })

  it('getTask returns undefined for non-existent key', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    expect(stage.getTask('nonexistent')).toBeUndefined()
  })

  it('promotes an isolated task to connected when a later task references it', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    let i = 0
    // task a is added with no dependencies — starts as isolated
    stage.createTask('task a', () => {
      expect(i).toBe(0)
      i++
    })
    // task b depends on task a — task a should be promoted to connected
    stage.createTask(
      'task b',
      () => {
        expect(i).toBe(1)
        i++
      },
      { after: 'task a' }
    )
    scheduler.run(0)
    expect(i).toBe(2)
  })

  it('stage callback receives delta and runTasks can override it', () => {
    const scheduler = new Scheduler()
    let receivedDelta = -1
    let taskDelta = -1
    const stage = scheduler.createStage('stage', {
      callback(delta, runTasks) {
        receivedDelta = delta
        // Override the delta passed to tasks
        runTasks(0.5)
      }
    })
    stage.createTask('task', (delta) => {
      taskDelta = delta
    })
    scheduler.run(0)
    scheduler.run(16) // 16ms = 0.016s delta
    expect(receivedDelta).toBeGreaterThan(0)
    expect(taskDelta).toBe(0.5)
  })

  it('removing a stage stops its tasks from running', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    let count = 0
    stage.createTask('task', () => {
      count++
    })
    scheduler.run(0)
    expect(count).toBe(1)

    scheduler.removeStage('stage')
    scheduler.run(16)
    expect(count).toBe(1)
  })

  it('can use symbols as task keys', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    const taskA = Symbol('task a')
    const taskB = Symbol('task b')
    let i = 0
    stage.createTask(taskA, () => {
      expect(i).toBe(0)
      i++
    })
    stage.createTask(
      taskB,
      () => {
        expect(i).toBe(1)
        i++
      },
      { after: taskA }
    )
    scheduler.run(0)
    expect(i).toBe(2)
  })

  it('throws on circular dependencies', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    stage.createTask('task a', () => {}, { before: 'task b' })
    stage.createTask('task b', () => {}, { before: 'task a' })
    expect(() => scheduler.run(0)).toThrow('cycle')
  })

  it('runWithTiming updates lastTime so subsequent calls get correct deltas', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    const deltas: number[] = []
    stage.createTask('task', (delta) => {
      deltas.push(delta)
    })

    scheduler.runWithTiming(0) // reset lastTime
    scheduler.runWithTiming(16)
    scheduler.runWithTiming(32)

    // deltas[0] is unreliable (Bug 24: lastTime initialized to performance.now())
    expect(deltas[1]).toBeCloseTo(0.016, 5)
    expect(deltas[2]).toBeCloseTo(0.016, 5) // would be 0.032 without the fix
  })

  it('runWithTiming and run share lastTime correctly', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    const deltas: number[] = []
    stage.createTask('task', (delta) => {
      deltas.push(delta)
    })

    scheduler.run(0)
    scheduler.runWithTiming(16)
    scheduler.run(32)

    expect(deltas[1]).toBeCloseTo(0.016, 5)
    expect(deltas[2]).toBeCloseTo(0.016, 5)
  })

  it('removing a phantom node does not corrupt ordering constraints', () => {
    const scheduler = new Scheduler()
    const stage = scheduler.createStage('stage')
    let i = 0

    // task a creates a phantom for task b via "before"
    stage.createTask(
      'task a',
      () => {
        expect(i).toBe(0)
        i++
      },
      { before: 'task b' }
    )

    // remove task b before it's actually added — should not destroy the constraint
    stage.removeTask('task b')

    // now add task b for real — it should still run after task a
    stage.createTask('task b', () => {
      expect(i).toBe(1)
      i++
    })

    scheduler.run(0)
    expect(i).toBe(2)
  })
})
