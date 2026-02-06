# Reinforcement Learning: A Visual Guide

A beginner-friendly explanation of all the key RL terms with an interactive diagram.

---

## Interactive Diagram

Hover over any box to see its definition and a concrete example.

<div id="rl-diagram-container">
  <div id="rl-description-box">
    <p id="rl-description-text">Hover over any box to see definition + example</p>
  </div>
  <svg id="rl-svg" viewBox="0 0 700 680">
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#475569" />
      </marker>
      <marker id="arrow-dashed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
      </marker>
    </defs>
    <!-- LAYER 1: Agent-Environment Loop -->
    <text x="350" y="25" text-anchor="middle" fill="#64748b" font-size="10" font-weight="600">THE LOOP</text>
    <g class="rl-node" data-id="agent"><rect x="170" y="44" width="100" height="32" rx="6" fill="#3b82f6"/><text x="220" y="64" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Agent</text></g>
    <g class="rl-node" data-id="environment"><rect x="420" y="44" width="120" height="32" rx="6" fill="#64748b"/><text x="480" y="64" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Environment</text></g>
    <path d="M 275 50 L 415 50" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow)" />
    <text x="345" y="44" text-anchor="middle" fill="#22c55e" font-size="9">action</text>
    <path d="M 415 70 L 275 70" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow)" />
    <text x="345" y="84" text-anchor="middle" fill="#f59e0b" font-size="9">state, reward</text>
    <!-- LAYER 2: Core concepts -->
    <text x="350" y="115" text-anchor="middle" fill="#64748b" font-size="10" font-weight="600">CORE CONCEPTS</text>
    <g class="rl-node" data-id="state"><rect x="55" y="134" width="90" height="32" rx="6" fill="#6366f1"/><text x="100" y="154" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">State (s)</text></g>
    <g class="rl-node" data-id="action"><rect x="175" y="134" width="90" height="32" rx="6" fill="#22c55e"/><text x="220" y="154" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Action (a)</text></g>
    <g class="rl-node" data-id="reward"><rect x="295" y="134" width="90" height="32" rx="6" fill="#f59e0b"/><text x="340" y="154" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Reward (r)</text></g>
    <g class="rl-node" data-id="policy"><rect x="415" y="134" width="90" height="32" rx="6" fill="#ec4899"/><text x="460" y="154" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Policy (π)</text></g>
    <g class="rl-node" data-id="gamma"><rect x="537" y="136" width="85" height="28" rx="6" fill="#94a3b8"/><text x="580" y="154" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Gamma (γ)</text></g>
    <!-- LAYER 3: Return -->
    <text x="350" y="205" text-anchor="middle" fill="#64748b" font-size="10" font-weight="600">RETURN</text>
    <line x1="340" y1="166" x2="350" y2="225" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />
    <line x1="580" y1="164" x2="400" y2="225" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />
    <g class="rl-node" data-id="return"><rect x="295" y="234" width="110" height="32" rx="6" fill="#a855f7"/><text x="350" y="254" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Return (G)</text></g>
    <text x="350" y="280" text-anchor="middle" fill="#64748b" font-size="9">G = r + γr + γ²r + ...</text>
    <!-- LAYER 4: Value Functions -->
    <text x="350" y="315" text-anchor="middle" fill="#64748b" font-size="10" font-weight="600">VALUE FUNCTIONS</text>
    <g class="rl-node" data-id="value"><rect x="47" y="341" width="65" height="28" rx="6" fill="#8b5cf6"/><text x="80" y="359" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">V(s)</text></g>
    <g class="rl-node" data-id="vpi"><rect x="127" y="341" width="65" height="28" rx="6" fill="#7c3aed"/><text x="160" y="359" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">V_π</text></g>
    <g class="rl-node" data-id="vstar"><rect x="207" y="341" width="65" height="28" rx="6" fill="#6d28d9"/><text x="240" y="359" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">V*</text></g>
    <g class="rl-node" data-id="qvalue"><rect x="427" y="341" width="65" height="28" rx="6" fill="#06b6d4"/><text x="460" y="359" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Q(s,a)</text></g>
    <g class="rl-node" data-id="qstar"><rect x="507" y="341" width="65" height="28" rx="6" fill="#0891b2"/><text x="540" y="359" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Q*</text></g>
    <text x="120" y="359" text-anchor="middle" fill="#475569" font-size="12">→</text>
    <text x="200" y="359" text-anchor="middle" fill="#475569" font-size="12">→</text>
    <text x="500" y="359" text-anchor="middle" fill="#475569" font-size="12">→</text>
    <text x="80" y="377" text-anchor="middle" fill="#64748b" font-size="8">general</text>
    <text x="160" y="377" text-anchor="middle" fill="#64748b" font-size="8">under π</text>
    <text x="240" y="377" text-anchor="middle" fill="#64748b" font-size="8">optimal</text>
    <text x="460" y="377" text-anchor="middle" fill="#64748b" font-size="8">general</text>
    <text x="540" y="377" text-anchor="middle" fill="#64748b" font-size="8">optimal</text>
    <g class="rl-node" data-id="vhat"><rect x="127" y="406" width="65" height="28" rx="6" fill="#4c1d95"/><text x="160" y="424" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">V̂_π</text></g>
    <g class="rl-node" data-id="qhat"><rect x="427" y="406" width="65" height="28" rx="6" fill="#065f6b"/><text x="460" y="424" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Q̂</text></g>
    <line x1="160" y1="369" x2="160" y2="400" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow-dashed)" />
    <line x1="460" y1="369" x2="460" y2="400" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arrow-dashed)" />
    <text x="160" y="447" text-anchor="middle" fill="#64748b" font-size="8">estimate</text>
    <text x="460" y="447" text-anchor="middle" fill="#64748b" font-size="8">estimate</text>
    <text x="350" y="355" text-anchor="middle" fill="#94a3b8" font-size="9">TRUE</text>
    <text x="350" y="420" text-anchor="middle" fill="#64748b" font-size="9">LEARNED</text>
    <line x1="300" y1="260" x2="160" y2="335" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />
    <line x1="400" y1="260" x2="500" y2="335" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />
    <text x="215" y="295" text-anchor="middle" fill="#64748b" font-size="8">expected</text>
    <text x="465" y="295" text-anchor="middle" fill="#64748b" font-size="8">expected</text>
    <!-- LAYER 5: Bellman -->
    <text x="350" y="480" text-anchor="middle" fill="#64748b" font-size="10" font-weight="600">BELLMAN EQUATIONS</text>
    <line x1="200" y1="370" x2="250" y2="505" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />
    <line x1="500" y1="370" x2="450" y2="505" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />
    <g class="rl-node" data-id="bellman"><rect x="195" y="514" width="110" height="32" rx="6" fill="#f59e0b"/><text x="250" y="534" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Bellman Eq</text></g>
    <g class="rl-node" data-id="bellmanopt"><rect x="395" y="514" width="110" height="32" rx="6" fill="#d97706"/><text x="450" y="534" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Bellman Opt</text></g>
    <text x="350" y="534" text-anchor="middle" fill="#475569" font-size="12">→</text>
    <text x="350" y="548" text-anchor="middle" fill="#64748b" font-size="8">take max</text>
    <!-- LAYER 6: Learning Methods -->
    <text x="350" y="585" text-anchor="middle" fill="#64748b" font-size="10" font-weight="600">LEARNING METHODS</text>
    <line x1="250" y1="546" x2="180" y2="605" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />
    <line x1="350" y1="555" x2="350" y2="605" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />
    <line x1="450" y1="546" x2="520" y2="605" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />
    <g class="rl-node" data-id="mc"><rect x="127" y="614" width="105" height="32" rx="6" fill="#0ea5e9"/><text x="180" y="634" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Monte Carlo</text></g>
    <g class="rl-node" data-id="td"><rect x="297" y="614" width="105" height="32" rx="6" fill="#0284c7"/><text x="350" y="634" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">TD Learning</text></g>
    <g class="rl-node" data-id="qlearn"><rect x="467" y="614" width="105" height="32" rx="6" fill="#0369a1"/><text x="520" y="634" text-anchor="middle" fill="#fff" font-size="12" font-weight="600">Q-Learning</text></g>
    <text x="180" y="655" text-anchor="middle" fill="#64748b" font-size="8">wait for episode</text>
    <text x="180" y="665" text-anchor="middle" fill="#64748b" font-size="8">use actual G</text>
    <text x="350" y="655" text-anchor="middle" fill="#64748b" font-size="8">update each step</text>
    <text x="350" y="665" text-anchor="middle" fill="#64748b" font-size="8">bootstrap V(s')</text>
    <text x="520" y="655" text-anchor="middle" fill="#64748b" font-size="8">learns Q*</text>
    <text x="520" y="665" text-anchor="middle" fill="#64748b" font-size="8">off-policy</text>
    <path d="M 180 610 Q 60 500 160 440" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3" fill="none" marker-end="url(#arrow-dashed)" />
    <path d="M 520 610 Q 640 500 460 440" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3" fill="none" marker-end="url(#arrow-dashed)" />
    <text x="70" y="520" text-anchor="middle" fill="#64748b" font-size="8">learns</text>
    <text x="630" y="520" text-anchor="middle" fill="#64748b" font-size="8">learns</text>
  </svg>
  <div id="rl-gamma-box">
    <p style="font-size: 13px; font-weight: 600; margin: 0 0 8px 0;">Why discount (γ)?</p>
    <p style="font-size: 12px; margin: 0; line-height: 1.6;">
      Without γ, agent could wander forever: -1 + -1 + -1 + ... = -∞ (math breaks!).<br/>
      With γ=0.9, future rewards shrink: 1 → 0.9 → 0.81 → 0.729...<br/>
      This makes sums finite AND motivates agent to reach goal faster (reward now > reward later).
    </p>
  </div>
</div>

<style>
#rl-diagram-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border-radius: 16px;
  font-family: system-ui, sans-serif;
  margin: 1.5rem 0;
}
body.dark-theme #rl-diagram-container {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
#rl-description-box {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 14px 20px;
  margin: 0 auto 24px auto;
  max-width: 700px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
body.dark-theme #rl-description-box {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
#rl-description-text {
  color: #475569;
  font-size: 13px;
  text-align: center;
  margin: 0;
  line-height: 1.5;
  transition: color 0.15s ease;
}
body.dark-theme #rl-description-text {
  color: #e2e8f0;
}
#rl-description-text.active {
  color: #1e293b;
}
body.dark-theme #rl-description-text.active {
  color: #fff;
}
#rl-svg {
  width: 100%;
  max-width: 700px;
  display: block;
  margin: 0 auto;
}
#rl-svg text {
  fill: #475569;
}
body.dark-theme #rl-svg text {
  fill: #e2e8f0;
}
#rl-svg .rl-node text {
  fill: #fff;
}
.rl-node {
  cursor: pointer;
}
.rl-node rect {
  opacity: 0.85;
  transition: all 0.15s ease;
}
.rl-node:hover rect {
  opacity: 1;
  filter: brightness(1.15);
}
#rl-gamma-box {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 16px 20px;
  margin: 24px auto 0 auto;
  max-width: 700px;
  border-left: 3px solid #f59e0b;
}
body.dark-theme #rl-gamma-box {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 3px solid #f59e0b;
}
#rl-gamma-box p:first-child {
  color: #d97706;
}
#rl-gamma-box p:last-child {
  color: #64748b;
}
body.dark-theme #rl-gamma-box p:last-child {
  color: #94a3b8;
}
</style>

---

## How the Diagram is Organized

The diagram flows top to bottom:

1. **THE LOOP** - Agent and Environment exchange actions, states, rewards
2. **CORE CONCEPTS** - State, Action, Reward, Policy, Gamma
3. **RETURN** - G is the discounted sum of rewards
4. **VALUE FUNCTIONS** - V and Q (both true and estimated versions)
5. **BELLMAN EQUATIONS** - The recursive relationships
6. **LEARNING METHODS** - Monte Carlo, TD, Q-Learning

---

## Quick Reference

| Term | Meaning | Example |
|------|---------|---------|
| s | state | position in maze |
| a | action | move right |
| r | reward | -1 per step, +10 at goal |
| π | policy | "go right then down" |
| γ | discount | 0.9 |
| G | return | 4.58 for path A→B→C→D |
| V(s) | value of state | V(A) = 4.58 |
| V_π | value under policy | depends on how good π is |
| V* | optimal value | best possible |
| V̂ | estimated value | learned from samples |
| Q(s,a) | value of action | Q(C,down) = 8 |
| Q* | optimal Q | best possible |
| Q̂ | estimated Q | learned from samples |

---

## Key Takeaways

**Why gamma?** Makes math work and motivates fast goal-reaching.

**V vs Q?** V tells you how good a state is. Q tells you how good an action is. Q is more useful for picking actions.

**True vs Estimated (hat)?** We never know the true values. We learn estimates from experience.

**MC vs TD?** MC waits for episode end and uses real G. TD updates every step using estimates (bootstrapping).

**Q-Learning?** TD for Q functions. Learns optimal Q* directly, even while exploring.