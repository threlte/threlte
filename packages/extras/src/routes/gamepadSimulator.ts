export const gamepadSimulator = {
  getGamepads: null,
  fakeController: {
    axes: [0, 0, 0, 0],
    buttons: [
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      },
      {
        pressed: false,
        touched: false,
        value: 0
      }
    ],
    connected: false,
    id: 'Standard gamepad by Alvaro Montoro',
    index: 0,
    mapping: 'standard',
    timestamp: Math.floor(Date.now() / 1000)
  },
  create: function () {
    document.querySelector('body')?.insertAdjacentHTML(
      'beforeend',
      `<svg viewBox="0 0 600 300" id="amdfc-controller" width="350px" style="position: absolute; z-index: 999999; top: 0; left: 0">
<style>
.amdfc-int:hover {
fill: #bbb;
}
.amdfc-int.amdfc-active {
fill: fuchsia;
}
</style>
<g fill="#ddd" stroke="#222" stroke-width="3">
<rect x="150" y="10" width="100" height="100" rx="5" ry="5" class="amdfc-int" id="amdfc-button-6"></rect>
<rect x="350" y="10" width="100" height="100" rx="5" ry="5" class="amdfc-int" id="amdfc-button-7"></rect>
<rect x="100" y="25" width="100" height="40" rx="5" ry="5" class="amdfc-int" id="amdfc-button-4"></rect>
<rect x="400" y="25" width="100" height="40" rx="5" ry="5" class="amdfc-int" id="amdfc-button-5"></rect>
<path d="M135,50 C 45,50 20,180 20,240 20,300 80,330 175,220 175,220
425,220 425,220 520,330 580,300 580,240 580,180 555,50 465,50 Z"></path>
<circle cx="200" cy="200" r="35"></circle>
<circle cx="400" cy="200" r="35"></circle>
<circle cx="200" cy="200" r="15" class="amdfc-int" id="amdfc-button-10"></circle>
<circle cx="400" cy="200" r="15" class="amdfc-int" id="amdfc-button-11"></circle>
<path d="M190,182 210,182 200,168 Z" stroke-width="0" class="amdfc-int" id="amdfc-axe-0-up"></path>
<path d="M190,218 210,218 200,232 Z" stroke-width="0" class="amdfc-int" id="amdfc-axe-0-down"></path>
<path d="M218,190 218,210 232,200 Z" stroke-width="0" class="amdfc-int" id="amdfc-axe-0-right"></path>
<path d="M182,190 182,210 168,200 Z" stroke-width="0" class="amdfc-int" id="amdfc-axe-0-left"></path>
<path d="M390,182 410,182 400,168 Z" stroke-width="0" class="amdfc-int" id="amdfc-axe-1-up"></path>
<path d="M390,218 410,218 400,232 Z" stroke-width="0" class="amdfc-int" id="amdfc-axe-1-down"></path>
<path d="M418,190 418,210 432,200 Z" stroke-width="0" class="amdfc-int" id="amdfc-axe-1-right"></path>
<path d="M382,190 382,210 368,200 Z" stroke-width="0" class="amdfc-int" id="amdfc-axe-1-left"></path>

<circle cx="480" cy="160" r="15" class="amdfc-int" id="amdfc-button-0"></circle>
<circle cx="510" cy="130" r="15" class="amdfc-int" id="amdfc-button-1"></circle>
<circle cx="450" cy="130" r="15" class="amdfc-int" id="amdfc-button-2"></circle>
<circle cx="480" cy="100" r="15" class="amdfc-int" id="amdfc-button-3"></circle>

<rect x="105" y="85" width="30" height="90" fill="#aaa" stroke="#aaa"></rect>
<rect x="75" y="115" width="90" height="30" fill="#aaa" stroke="#aaa"></rect>

<rect x="245" y="145" width="50" height="18" rx="9" ry="9" class="amdfc-int" id="amdfc-button-8"></rect>
<rect x="305" y="145" width="50" height="18" rx="9" ry="9" class="amdfc-int" id="amdfc-button-9"></rect>

<circle cx="120" cy="160" r="15" class="amdfc-int" id="amdfc-button-13"></circle>
<circle cx="90" cy="130" r="15" class="amdfc-int" id="amdfc-button-14"></circle>
<circle cx="150" cy="130" r="15" class="amdfc-int" id="amdfc-button-15"></circle>
<circle cx="120" cy="100" r="15" class="amdfc-int" id="amdfc-button-12"></circle>

<circle cx="300" cy="90" r="20" class="amdfc-int" id="amdfc-button-16"></circle>
</g>
<g dominant-baseline="middle" text-anchor="middle" fill="#222" font-size="16" font-family="Arial,sans-serif" style="user-select: none; pointer-events: none;">
<text x="480" y="160">0</text>
<text x="510" y="130">1</text>
<text x="450" y="130">2</text>
<text x="480" y="100">3</text>
<text x="150" y="40">4</text>
<text x="450" y="40">5</text>
<text x="225" y="30">6</text>
<text x="375" y="30">7</text>
<text x="270" y="156">8</text>
<text x="330" y="156">9</text>
<text x="200" y="200">10</text>
<text x="400" y="200">11</text>
<text x="120" y="100">12</text>
<text x="120" y="160">13</text>
<text x="90" y="130">14</text>
<text x="150" y="130">15</text>
<text x="300" y="90">16</text>
<text x="270" y="175" font-size="10">SELECT</text>
<text x="330" y="175" font-size="10">START</text>
</g>
</svg>`
    )

    Array.from(document.querySelectorAll('.amdfc-int')).forEach(function (element) {
      element.addEventListener('mouseenter', function () {
        if (element.id.indexOf('amdfc-button') === 0) {
          const index = parseInt(element.id.replace('amdfc-button-', ''))
          gamepadSimulator.fakeController.buttons[index].touched = true
          gamepadSimulator.fakeController.timestamp = Math.floor(Date.now() / 1000)
        }
      })

      element.addEventListener('mouseleave', function () {
        element.setAttribute('class', 'amdfc-int')
        if (element.id.indexOf('amdfc-button') === 0) {
          const index = parseInt(element.id.replace('amdfc-button-', ''))
          gamepadSimulator.fakeController.buttons[index].touched = false
          gamepadSimulator.fakeController.buttons[index].pressed = false
          gamepadSimulator.fakeController.timestamp = Math.floor(Date.now() / 1000)
        } else if (element.id.indexOf('amdfc-axe-') === 0) {
          const axe = parseInt(element.id[10])
          const dir = element.id[12]
          const pos = ['u', 'd'].indexOf(dir) > -1 ? 1 : 0
          gamepadSimulator.fakeController.axes[axe * 2 + pos] = 0
          gamepadSimulator.fakeController.timestamp = Math.floor(Date.now() / 1000)
        }
      })

      element.addEventListener('mousedown', function () {
        element.setAttribute('class', 'amdfc-int amdfc-active')
        if (element.id.indexOf('amdfc-button') === 0) {
          const index = parseInt(element.id.replace('amdfc-button-', ''))
          gamepadSimulator.fakeController.buttons[index].pressed = true
          gamepadSimulator.fakeController.timestamp = Math.floor(Date.now() / 1000)
        } else if (element.id.indexOf('amdfc-axe-') === 0) {
          const axe = parseInt(element.id[10])
          const dir = element.id[12]
          const value = ['u', 'l'].indexOf(dir) > -1 ? -1 : 1
          const pos = ['u', 'd'].indexOf(dir) > -1 ? 1 : 0
          gamepadSimulator.fakeController.axes[axe * 2 + pos] = value
          gamepadSimulator.fakeController.timestamp = Math.floor(Date.now() / 1000)
        }
      })

      element.addEventListener('mouseup', function () {
        element.setAttribute('class', 'amdfc-int')
        if (element.id.indexOf('amdfc-button') === 0) {
          const index = parseInt(element.id.replace('amdfc-button-', ''))
          gamepadSimulator.fakeController.buttons[index].pressed = false
          gamepadSimulator.fakeController.timestamp = Math.floor(Date.now() / 1000)
        } else if (element.id.indexOf('amdfc-axe-') === 0) {
          const axe = parseInt(element.id[10])
          const dir = element.id[12]
          const pos = ['u', 'd'].indexOf(dir) > -1 ? 1 : 0
          gamepadSimulator.fakeController.axes[axe * 2 + pos] = 0
          gamepadSimulator.fakeController.timestamp = Math.floor(Date.now() / 1000)
        }
      })
    })

    // @ts-expect-error
    gamepadSimulator.getGamepads = navigator.getGamepads

    // @ts-expect-error
    navigator.getGamepads = function () {
      return {
        0: gamepadSimulator.fakeController
      }
    }
  },
  destroy: function () {
    if (gamepadSimulator.fakeController.connected) {
      gamepadSimulator.disconnect()
    }
    // @ts-expect-error
    navigator.getGamepads = gamepadSimulator.getGamepads
    document.querySelector('#amdfc-controller')?.remove()
  },
  connect: function () {
    const event = new Event('gamepadconnected')
    gamepadSimulator.fakeController.connected = true
    gamepadSimulator.fakeController.timestamp = Math.floor(Date.now() / 1000)
    // @ts-expect-error
    event.gamepad = gamepadSimulator.fakeController
    window.dispatchEvent(event)
    document.querySelector('#amdfc-controller')?.classList.add('connected')
  },
  disconnect: function () {
    const event = new Event('gamepaddisconnected')
    gamepadSimulator.fakeController.connected = false
    gamepadSimulator.fakeController.timestamp = Math.floor(Date.now() / 1000)
    // @ts-expect-error
    event.gamepad = gamepadSimulator.fakeController
    window.dispatchEvent(event)
    document.querySelector('#amdfc-controller')?.classList.remove('connected')
  }
}

// @ts-expect-error
globalThis.gamepadSimulator = gamepadSimulator

export default gamepadSimulator
