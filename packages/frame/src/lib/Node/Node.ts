/**
 * A Node is a stage in a graph. It can have handlers that are run when the
 * graph is run. The handlers of a stage are run in an arbitrary order.
 */
export class Node {
  private handlers: Set<(...args: any[]) => void> = new Set()

  public readonly before: Set<Node> = new Set()
  public readonly after: Set<Node> = new Set()

  constructor(options: { before?: Node; after?: Node }) {
    if (options?.before) {
      options.before.before.add(this)
      this.after.add(options.before)
    }
    if (options?.after) {
      options.after.after.add(this)
      this.before.add(options.after)
    }
  }

  public addHandler(handler: (...args: any[]) => void) {
    this.handlers.add(handler)
  }

  public removeHandler(handler: (...args: any[]) => void) {
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
export class Graph {
  runx: (delta: number, run: () => void) => void
  private _nodes: Set<Node> = new Set()
  private sorted: Node[] = []
  constructor(run: (delta: number, run: () => void) => void) {
    this.runx = run.bind(this)
  }

  public addDefaultNode(): Node {
    const node = new Node({})
    this._nodes.add(node)
    return node
  }

  public addNode(options: ConstructorParameters<typeof Node>[0]): Node
  public addNode(node: Node): Node
  public addNode(nodeOrOptions: Node | ConstructorParameters<typeof Node>[0]) {
    if (nodeOrOptions instanceof Node) {
      this._nodes.add(nodeOrOptions)
      this.sort()
      return nodeOrOptions
    } else {
      const node = new Node(nodeOrOptions)
      this._nodes.add(node)
      this.sort()
      return node
    }
  }

  public removeNode(node: Node) {
    this._nodes.delete(node)
    this.sort()
  }

  private sort() {
    this.sorted = Array.from(this._nodes).sort((a, b) => {
      if (a.before.has(b) || b.after.has(a)) return 1
      if (a.after.has(b) || b.before.has(a)) return -1
      return 0
    })
  }

  public run() {
    this.sorted.forEach((node) => node.run())
  }
}

/**
 * The runner is responsible for running the graphs. It runs the graphs in a
 * requestAnimationFrame loop.
 */
export class Runner {
  graphs: Set<Graph> = new Set()
  animationFrameHandle?: number
  lastTime = 0

  constructor() {}

  addGraph(graph: Graph) {
    this.graphs.add(graph)
  }

  removeGraph(graph: Graph) {
    this.graphs.delete(graph)
  }

  start() {
    this.animationFrameHandle = window.requestAnimationFrame(this.run.bind(this))
  }

  stop() {
    if (this.animationFrameHandle) window.cancelAnimationFrame(this.animationFrameHandle)
  }

  run(time: DOMHighResTimeStamp) {
    const delta = time - this.lastTime
    this.graphs.forEach((graph) => {
      graph.runx(delta, graph.run.bind(graph))
    })
    this.lastTime = time
    this.animationFrameHandle = window.requestAnimationFrame(this.run.bind(this))
  }
}

export const init = () => {
  const runner = new Runner()

  // the default frame loop always runs
  const graph = new Graph((delta, run) => {
    run()
  })

  const defaultNode = graph.addDefaultNode()

  const renderNode = graph.addNode({
    after: defaultNode
  })

  runner.addGraph(graph)

  defaultNode.addHandler(() => {
    // console.log('defaultNode')
  })

  renderNode.addHandler(() => {
    // console.log('renderNode')
  })

  let fixedStepTimeAccumulator = 0
  const fixedLoop = new Graph((delta, run) => {
    fixedStepTimeAccumulator += delta / 1000

    while (fixedStepTimeAccumulator >= 1 / 1) {
      fixedStepTimeAccumulator -= 1 / 1
      run()
    }
  })

  const physics = fixedLoop.addNode({})
  physics.addHandler(() => {
    console.log('physics')
  })

  const afterPhysics = fixedLoop.addNode({
    after: physics
  })
  afterPhysics.addHandler(() => {
    console.log('afterPhysics')
  })

  runner.addGraph(fixedLoop)

  runner.start()
}
