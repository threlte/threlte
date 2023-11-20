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

type GraphNode = { node: Node; previousNodes: Set<Node>; nextNodes: Set<Node> }

/**
 * A Graph is a collection of nodes. The nodes are run in a topological sort
 * order.
 */
export class Graph {
  runx: (delta: number, run: () => void) => void
  private _nodes: Array<GraphNode> = []
  private sorted: Node[] = []
  constructor(run: (delta: number, run: () => void) => void) {
    this.runx = run.bind(this)
  }

  public addNode(
    node: Node,
    options?: {
      before?: Node
      after?: Node
    }
  ) {
    const graphNode: GraphNode = {
      node,
      previousNodes: new Set(),
      nextNodes: new Set()
    }
    if (options?.before) {
      const nextNode = this._nodes.find(({ node }) => node === options.before)
      if (!nextNode) {
        throw new Error('next node not found')
      }
      nextNode.previousNodes.add(node)
      graphNode.nextNodes.add(nextNode.node)
    }
    if (options?.after) {
      const prevNode = this._nodes.find(({ node }) => node === options.after)
      if (!prevNode) {
        throw new Error('previous node not found')
      }
      prevNode.nextNodes.add(node)
      graphNode.previousNodes.add(prevNode.node)
    }
    this._nodes.push(graphNode)
    this.sort()
  }

  public removeNode(node: Node) {
    const index = this._nodes.findIndex(({ node: n }) => n === node)
    if (index === -1) return
    this._nodes.splice(index, 1)
    this.sort()
  }

  private sort() {
    this.sorted = this._nodes
      .sort((a, b) => {
        if (a.previousNodes.has(b.node) || b.nextNodes.has(a.node)) return 1
        if (a.nextNodes.has(b.node) || b.previousNodes.has(a.node)) return -1
        return 0
      })
      .map(({ node }) => node)
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

  const defaultNode = new Node()
  graph.addNode(defaultNode)

  const renderNode = new Node()

  graph.addNode(renderNode, {
    after: defaultNode
  })

  runner.addGraph(graph)

  defaultNode.addHandler(() => {
    console.log('defaultNode')
  })

  renderNode.addHandler(() => {
    console.log('renderNode')
  })

  const inBetweenNode = new Node()
  graph.addNode(inBetweenNode, {
    before: renderNode,
    after: defaultNode
  })

  inBetweenNode.addHandler(() => {
    console.log('inBetweenNode')
  })

  const beforeRenderNode = new Node()
  graph.addNode(beforeRenderNode, {
    before: renderNode
  })
  beforeRenderNode.addHandler(() => {
    console.log('beforeRenderNode')
  })

  const beforeDefaultNode = new Node()
  graph.addNode(beforeDefaultNode, {
    before: defaultNode
  })
  beforeDefaultNode.addHandler(() => {
    console.log('beforeDefaultNode')
  })

  // let fixedStepTimeAccumulator = 0
  // const fixedLoop = new Graph((delta, run) => {
  //   fixedStepTimeAccumulator += delta / 1000

  //   while (fixedStepTimeAccumulator >= 1 / 1) {
  //     fixedStepTimeAccumulator -= 1 / 1
  //     run()
  //   }
  // })

  // const physics = fixedLoop.addNode({})
  // physics.addHandler(() => {
  //   console.log('physics')
  // })

  // const afterPhysics = fixedLoop.addNode({
  //   after: physics
  // })
  // afterPhysics.addHandler(() => {
  //   console.log('afterPhysics')
  // })

  // runner.addGraph(fixedLoop)

  runner.start()
  setTimeout(() => {
    runner.stop()
  }, 100)
}
