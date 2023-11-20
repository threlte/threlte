type VertexWithEdges<T> = { value: T; previous: Set<T>; next: Set<T> }

class DAG<T> {
  private vertices: Array<VertexWithEdges<T>> = []
  protected sorted: T[] = []
  constructor() {}

  protected add(
    value: T,
    options?: {
      before?: T
      after?: T
    }
  ) {
    const vertex: VertexWithEdges<T> = {
      value,
      previous: new Set(),
      next: new Set()
    }
    if (options?.before) {
      const nextVertex = this.vertices.find(({ value }) => value === options.before)
      if (!nextVertex) {
        throw new Error('next vertex not found')
      }
      nextVertex.previous.add(value)
      vertex.next.add(nextVertex.value)
    }
    if (options?.after) {
      const previousVertex = this.vertices.find(({ value }) => value === options.after)
      if (!previousVertex) {
        throw new Error('previous vertex not found')
      }
      previousVertex.next.add(value)
      vertex.previous.add(previousVertex.value)
    }
    this.vertices.push(vertex)
    this.sort()
  }

  protected remove(value: T) {
    const index = this.vertices.findIndex(({ value: v }) => v === value)
    if (index === -1) return
    const vertex = this.vertices[index]
    vertex.previous.forEach((prev) => {
      this.vertices.find(({ value }) => value === prev)?.next.delete(value)
    })
    vertex.next.forEach((next) => {
      this.vertices.find(({ value }) => value === next)?.previous.delete(value)
    })
    this.vertices.splice(index, 1)
    this.sort()
  }

  private sort() {
    const inDegree: Map<T, number> = new Map()
    const zeroInDegreeQueue: T[] = []
    const result: T[] = []

    // Initialize inDegree (count of incoming edges) for each vertex
    this.vertices.forEach((vertex) => {
      inDegree.set(vertex.value, 0)
    })

    // Calculate inDegree for each vertex
    this.vertices.forEach((vertex) => {
      vertex.next.forEach((next) => {
        inDegree.set(next, (inDegree.get(next) || 0) + 1)
      })
    })

    // Enqueue vertices with inDegree 0
    inDegree.forEach((degree, value) => {
      if (degree === 0) {
        zeroInDegreeQueue.push(value)
      }
    })

    // Process vertices with inDegree 0 and decrease inDegree of adjacent vertices
    while (zeroInDegreeQueue.length) {
      const vertex = zeroInDegreeQueue.shift()!
      result.push(vertex)

      this.vertices
        .find(({ value: v }) => v === vertex)
        ?.next.forEach((adjVertex) => {
          const adjVertexInDegree = (inDegree.get(adjVertex) || 0) - 1
          inDegree.set(adjVertex, adjVertexInDegree)
          if (adjVertexInDegree === 0) {
            zeroInDegreeQueue.push(adjVertex)
          }
        })
    }

    // Check for cycles in the graph
    if (result.length !== this.vertices.length) {
      throw new Error('The graph contains a cycle, and thus can not be sorted topologically.')
    }

    this.sorted = result
  }
}

type Handler = (...args: any[]) => void

/**
 * A Node is a stage in a graph. It can have handlers that are run when the
 * graph is run. The handlers of a stage are run in an arbitrary order.
 */
export class Node {
  private handlers: Set<Handler> = new Set()

  constructor(handlers?: Handler[]) {
    if (handlers) {
      handlers.forEach((handler) => this.addHandler(handler))
    }
  }

  public addHandler(handler: Handler) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: Handler) {
    this.handlers.delete(handler)
  }

  run(...args: any[]) {
    this.handlers.forEach((handler) => handler(...args))
  }
}

/**
 * A Graph is a collection of nodes. The nodes are run in a topological sort
 * order.
 */
export class Graph extends DAG<Node> {
  private callback: (delta: number, run: () => void) => void

  constructor(callback: (delta: number, run: () => void) => void) {
    super()
    this.callback = callback.bind(this)
  }

  public addNode = this.add.bind(this)
  public removeNode = this.remove.bind(this)

  public runNodes(delta: number) {
    this.callback(delta, () => this.sorted.forEach((node) => node.run()))
  }
}

/**
 * The runner is responsible for running the graphs. It runs the graphs in a
 * requestAnimationFrame loop.
 */
export class Runner extends DAG<Graph> {
  animationFrameHandle?: number
  lastTime = 0

  constructor() {
    super()
  }

  public addGraph = this.add.bind(this)
  public removeGraph = this.remove.bind(this)

  start() {
    this.animationFrameHandle = window.requestAnimationFrame(this.runGraphs.bind(this))
  }

  stop() {
    if (this.animationFrameHandle) window.cancelAnimationFrame(this.animationFrameHandle)
  }

  runGraphs(time: DOMHighResTimeStamp) {
    const delta = time - this.lastTime
    this.sorted.forEach((graph) => {
      graph.runNodes(delta)
    })
    this.lastTime = time
    this.animationFrameHandle = window.requestAnimationFrame(this.runGraphs.bind(this))
  }
}

export const init = () => {
  // Create a new runner
  const runner = new Runner()

  // Create the default frame loop. It "just runs".
  const frameloop = new Graph((delta, run) => {
    run()
  })

  const defaultNode = new Node()
  const renderNode = new Node()
  const afterRender = new Node()

  frameloop.addNode(defaultNode)
  frameloop.addNode(renderNode, {
    after: defaultNode
  })
  frameloop.addNode(afterRender, {
    after: renderNode
  })

  defaultNode.addHandler(() => {
    // do stuff here
  })
  renderNode.addHandler(() => {
    // render here
  })
  afterRender.addHandler(() => {
    // do stuff here
  })

  // A fixed loop. The loop is updated by the runner, but the loop ultimately
  // decides when and how many times to run the nodes.
  let rate = 1 / 2
  let fixedStepTimeAccumulator = 0
  const physicsLoop = new Graph((delta, run) => {
    fixedStepTimeAccumulator += delta / 1000

    while (fixedStepTimeAccumulator >= rate) {
      fixedStepTimeAccumulator -= rate
      run()
    }
  })

  const physicsNode = new Node()
  physicsLoop.addNode(physicsNode)
  physicsNode.addHandler(() => {
    console.log('physics')
  })

  const afterPhysicsNode = new Node()
  physicsLoop.addNode(afterPhysicsNode, {
    after: physicsNode
  })
  afterPhysicsNode.addHandler(() => {
    console.log('afterPhysics')
  })

  runner.addGraph(frameloop)
  runner.addGraph(physicsLoop, {
    before: frameloop
  })

  runner.start()
}
