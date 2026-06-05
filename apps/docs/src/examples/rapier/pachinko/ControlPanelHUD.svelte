<script lang="ts">
  import { T } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import {
    CABINET_WIDTH,
    CONTROL_PANEL_HEIGHT,
    CONTROL_PANEL_TILT,
    CONTROL_PANEL_Y,
    gameState
  } from './gameState.svelte'

  const pocketLabel: Record<typeof gameState.lastPocketHit, string> = {
    '': '',
    low: '+10',
    mid: '+25',
    high: '+50',
    jackpot: 'JACKPOT +250'
  }

  const panelHalfW = CABINET_WIDTH / 2
  const panelCenterY = -CONTROL_PANEL_HEIGHT / 2

  const cardScale = 0.6
  const cardZ = 0.26
</script>

<T.Group
  position={[0, CONTROL_PANEL_Y, 0]}
  rotation={[CONTROL_PANEL_TILT, 0, 0]}
>
  <!-- Score card -->
  <HTML
    transform
    position={[-panelHalfW + 1.7, panelCenterY, cardZ]}
    scale={cardScale}
  >
    <div class="score-card">
      <div class="score-label">Score</div>
      <div class="score-value">{gameState.score.toLocaleString()}</div>
      {#if gameState.lastPocketHit}
        <div
          class="last-hit"
          class:jackpot={gameState.lastPocketHit === 'jackpot'}
          data-hit={gameState.lastPocketHit + gameState.score}
        >
          {pocketLabel[gameState.lastPocketHit]}
        </div>
      {/if}
    </div>
  </HTML>

  <!-- Power meter -->
  <HTML
    transform
    position={[panelHalfW - 1.9, panelCenterY, cardZ]}
    scale={cardScale}
  >
    <div class="power">
      <div class="power-label">
        {#if gameState.autoFiring}
          <span class="autofire">AUTO-FIRE</span>
        {:else if gameState.holding}
          Charging…
        {:else}
          Hold <kbd>Space</kbd>
        {/if}
      </div>
      <div class="power-bar">
        <div
          class="power-fill"
          class:max={gameState.charge >= 1}
          style:width={`${gameState.charge * 100}%`}
        ></div>
      </div>
    </div>
  </HTML>
</T.Group>

<style>
  .score-card {
    background: rgba(20, 12, 40, 0.85);
    border: 1px solid rgba(255, 200, 80, 0.35);
    border-radius: 6px;
    padding: 0.6rem 1rem;
    color: #f0e8ff;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    box-shadow: 0 0 24px rgba(255, 100, 200, 0.18);
    width: 180px;
  }

  .score-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #ffb074;
  }

  .score-value {
    font-size: 2rem;
    font-weight: 700;
    color: #ffdd80;
    text-shadow: 0 0 12px rgba(255, 200, 80, 0.6);
    line-height: 1.1;
  }

  .last-hit {
    margin-top: 0.25rem;
    font-size: 0.85rem;
    color: #88ffcc;
    animation: pop 0.6s ease-out;
  }

  .last-hit.jackpot {
    color: #ff66cc;
    font-weight: 700;
    text-shadow: 0 0 8px rgba(255, 100, 200, 0.8);
  }

  .power {
    width: 220px;
    background: rgba(20, 12, 40, 0.85);
    border: 1px solid rgba(120, 100, 180, 0.4);
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    color: #f0e8ff;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }

  .power-label {
    font-size: 0.75rem;
    margin-bottom: 0.35rem;
  }

  .autofire {
    color: #ff3d8a;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-shadow: 0 0 8px rgba(255, 60, 140, 0.9);
    animation: blink 0.35s steps(2, end) infinite;
  }

  .power-bar {
    height: 10px;
    background: rgba(60, 40, 100, 0.6);
    border-radius: 999px;
    overflow: hidden;
  }

  .power-fill {
    height: 100%;
    background: linear-gradient(90deg, #88ffcc, #ffdd80, #ff66cc);
    transition: width 60ms linear;
  }

  .power-fill.max {
    background: linear-gradient(90deg, #ff66cc, #ff3d8a);
    box-shadow: 0 0 12px rgba(255, 60, 140, 0.8);
  }

  kbd {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 3px;
    padding: 0 4px;
    font-family: inherit;
    font-size: 0.7rem;
  }

  @keyframes pop {
    0% {
      transform: translateY(4px);
      opacity: 0;
    }
    20% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes blink {
    50% {
      opacity: 0.55;
    }
  }
</style>
