# Threlte Frame Scheduler

The Threlte Frame Scheduler is an easy to use but powerful scheduler that
can be used to schedule tasks (functions) to run before or after other
tasks in a stage. Stages can be scheduled to run before or after other
stages. The scheduler is designed to be used for scheduling rendering,
physics, analytics and other tasks in a game or app. It has been designed
to be framework-agnostic, so a framework-specific API can sit on top of it.
A major design feature is the ability to schedule tasks before or after
other tasks that are not yet created. This makes it possible to create
stages and tasks in any order at any time.

## Usage

### Initialize the scheduler

First, create a new scheduler. Every Threlte app usually only has a single
scheduler. The scheduler is the "bucket" that holds all the stages. You
may pass an options object to the scheduler. The only option available
right now is `clampDeltaTo` which is used to clamp the delta time since
the last frame to a maximum value.

```ts
const scheduler = new Scheduler({
  clampDeltaTo: 0.1 // in seconds
})
```

### Create a stage

Stages can be scheduled to run before or after
other stages and are the "buckets" to put tasks in. In this example, the
first stage is not scheduled before or after any other stage, so it will
"just run". You must provide a key for the stage. This is useful for
debugging and understanding the execution order.

```ts
const defaultStage = scheduler.createStage('default stage')
```

### Create a task

A task is the unit that actually runs code and can be scheduled to run before or
after other tasks. The first task – just like the first stage – is not scheduled
before or after any other task. You must provide a key for the task. A task will
always receive the delta time since the last frame in seconds as the first
argument.

```ts
defaultStage.createTask('move object', (delta) => {
	// console.log(delta)
	// -> 0.16
})
```

Tasks may be scheduled to run before or after other tasks.

```ts
defaultStage.createTask(
  'move camera',
  (delta) => {
    // do something
  },
  {
    after: 'move object'
  }
)
```

### Orchestrating the execution order

We create a stage that will be used to render the frame to the screen. This
stage should run after the default stage, so we pass its key as the `after`
option. This option also accepts an array of strings or stage objects to
schedule the stage after and/or before multiple other stages.

```ts
const renderStage = scheduler.createStage('render stage', {
	after: 'default stage'
})
```

Now we can add a task that will render the frame.

```ts
renderStage.createTask('render', (delta) => {
	// do some rendering
})
```

### Stage callbacks

Now, a fixed physics stage. The stage is *invoked* by the scheduler on every
requestAnimationFrame, but the stage ultimately decides when and how many
times to run the nodes.

Because a fixed framestage may be running multiple times per frame (rate <
framerate) or just once every few frames (rate > framerate), the stage
context may provide a coefficient that can be used to interpolate values
that are view dependent, such as a mesh that is being displaced by a
physics operation.

```ts
const physicsContext = {
  world: {
    gravity: 9.81
  }
}

let rate = 1 / 2
let fixedStepTimeAccumulator = 0

const physicsStage = scheduler.createStage('physics stage', {
  before: 'default stage',
  // The callback is invoked by the scheduler on every requestAnimationFrame
  // and receives the delta time since the last frame in milliseconds as
  // well as the function `run` which is used to run the steps of the stage.
  // The callback is responsible for deciding when and how many times to run
  // the steps. If it's omitted, the stage will run once per frame (as shown
  // in the default framestage).
  callback: (delta, runTasks) => {
    fixedStepTimeAccumulator += delta / 1000
    while (fixedStepTimeAccumulator >= rate) {
      fixedStepTimeAccumulator -= rate

      // See how we pass the rate to the run function. This is the fixed
      // step rate that the stage is running at. The tasks will receive
      // this rate as the delta argument if it's passed to the run
      // function, otherwise they will receive the delta time since
      // the last frame.
      runTasks(rate)
    }
  }
})
```

Because the physics stage's callback is invoking `run(rate)`, the tasks
receive the fixed delta passed to the function `run`. This is especially
useful for fixed step stages. Also, the coefficient is available in the
context for easy interpolation. We can now add a task that will run when
the step is invoked by the physics stage.

```ts
physicsStage.createTask('physics', (delta) => {
	// physics world update
})
```

### Dependencies and execution order

Using strings as the `before` and `after` options is making it possible to
reference stages as dependencies that are not yet created and generally
makes it easier to create stages and tasks in any order. Example: Create a
stage that runs after another stage that is not yet created.

```ts
scheduler.createStage('some stage', {
  after: 'some other stage',
  before: 'render stage'
})
```

See that we can also reference an actual stage object as the `before` or
`after` option instead of a string denoting its key.

```ts
scheduler.createStage('some other stage', {
  after: defaultStage,
  before: renderStage
})
```

### Execution plan

The scheduler provides an execution plan that can be used to visualize the
execution order of the stages, steps and tasks. This is useful for debugging and
understanding the execution order.

```ts
schedule = scheduler.getSchedule({
  tasks: true
})

// Result:
// {
// 	"stages": [
// 		{
// 			"key": "physics stage",
// 			"tasks": [
// 				"physics"
// 			]
// 		},
// 		{
// 			"key": "default stage",
// 			"tasks": [
// 				"move object",
// 				"move camera"
// 			]
// 		},
// 		{
// 			"key": "render stage",
// 			"tasks": [
// 				"render"
// 			]
// 		}
// 	]
// }
```

### Run the scheduler

All that's left to do is to invoke the scheduler on every `requestAnimationFrame`:

```ts
const animate = (time: number) => {
  scheduler.run(time)
  // request the next frame
  requestAnimationFrame(animate)
}

// start the animation loop
requestAnimationFrame(animate)
```
