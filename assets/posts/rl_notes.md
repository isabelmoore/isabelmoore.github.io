# Foundations of Reinforcement Learning: A Visual Guide

Reinforcement Learning (RL) is the science of decision-making. At its heart, it is about an **Agent** (the learner) interacting with an **Environment** (the world) to achieve a goal. This guide breaks down the essential foundations of RL, from the basic MDP framework to the challenges of scaling up for real-world robotics.

Click on any box in the diagrams below to see a detailed explanation and example!

<div class="rl-diagram-container">

<div class="rl-section">
<h3 class="rl-section-title">1. The MDP Framework</h3>
<div class="rl-grid">
<div class="rl-node" data-id="state">
<i class="uil uil-location-point rl-node-icon"></i>
<div class="rl-node-title">States (s)</div>
<div class="rl-node-subtitle">"Where am I?"</div>
</div>
<div class="rl-node" data-id="action">
<i class="uil uil-bolt rl-node-icon"></i>
<div class="rl-node-title">Actions (a)</div>
<div class="rl-node-subtitle">"What can I do?"</div>
</div>
<div class="rl-node" data-id="transitions">
<i class="uil uil-arrow-random rl-node-icon"></i>
<div class="rl-node-title">Transitions</div>
<div class="rl-node-subtitle">"What happens next?"</div>
</div>
<div class="rl-node" data-id="reward">
<i class="uil uil-star rl-node-icon"></i>
<div class="rl-node-title">Rewards (r)</div>
<div class="rl-node-subtitle">"Was that good?"</div>
</div>
</div>
</div>

<div class="rl-arrow-container">
<i class="uil uil-arrow-down rl-arrow"></i>
</div>

<div class="rl-section">
<h3 class="rl-section-title">2. The Agent-Environment Loop</h3>
<div class="rl-loop">
<div class="rl-node" data-id="agent">
<i class="uil uil-robot rl-node-icon"></i>
<div class="rl-node-title">AGENT</div>
<div class="rl-node-subtitle">(The Learner)</div>
</div>
<i class="uil uil-exchange-alt rl-arrow" style="font-size: 1.5rem; animation: none;"></i>
<div class="rl-node" data-id="environment">
<i class="uil uil-layer-group rl-node-icon"></i>
<div class="rl-node-title">ENVIRONMENT</div>
<div class="rl-node-subtitle">(The World)</div>
</div>
</div>
</div>

</div>

<br>

## 1. The MDP Framework
The **Markov Decision Process (MDP)** is the mathematical backbone of RL. It defines the "rules of the game" using four critical components:

*   **States (s):** A complete description of the current situation (e.g., a robot's x,y coordinates).
*   **Actions (a):** All choices available to the agent (e.g., move left, move right).
*   **Transitions P(s'|s,a):** The "physics" of the world — how likely is it that taking action $a$ in state $s$ leads to state $s'$?
*   **Rewards R(s,a):** Immediate feedback from the environment (e.g., $+10$ for reaching a goal, $-1$ for hitting a wall).

<br>

## 2. Value Functions: The Scoreboard
How do we know if a state is "good"? We use **Value Functions** to estimate the total future reward we expect to receive if we start in a certain state and follow a specific strategy, or **Policy ($\pi$)**.

<div class="rl-diagram-container">

<div class="rl-section">
<h3 class="rl-section-title">Core Building Blocks</h3>
<div class="rl-grid">
<div class="rl-node" data-id="policy">
<i class="uil uil-map-marker rl-node-icon"></i>
<div class="rl-node-title">Policy (π)</div>
<div class="rl-node-subtitle">Your Strategy</div>
</div>
<div class="rl-node" data-id="gamma">
<i class="uil uil-clock rl-node-icon"></i>
<div class="rl-node-title">Discount (γ)</div>
<div class="rl-node-subtitle">Future Valuation</div>
</div>
<div class="rl-node" data-id="return">
<i class="uil uil-money-bill rl-node-icon"></i>
<div class="rl-node-title">Return (G)</div>
<div class="rl-node-subtitle">Total Reward</div>
</div>
<div class="rl-node" data-id="value">
<i class="uil uil-chart-bar rl-node-icon"></i>
<div class="rl-node-title">Value V(s)</div>
<div class="rl-node-subtitle">"Scoreboard"</div>
</div>
</div>
</div>

</div>

*   **Return (G):** The total discounted reward: $G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots$
*   **Discount Factor ($\gamma$):** A value between 0 and 1 that determines how much we value future rewards versus immediate ones.
*   **State-Value V(s):** "How good is it to be in this state?"
*   **Action-Value Q(s,a):** "How good is it to take this specific action in this state?"

<br>

## 3. The Bellman Equation: The Secret Sauce
The core insight of RL is that the value of your current state depends on the value of the *next* state. This recursive relationship is captured by the **Bellman Equation**:

$$V(s) = \max_a [ R(s,a) + \gamma \sum_{s'} P(s'|s,a)V(s') ]$$

Instead of summing infinite future rewards, we only need to look one step ahead!

<div class="rl-node" data-id="bellman" style="max-width: 600px; margin: 1.5rem auto;">
<i class="uil uil-brackets-curly rl-node-icon"></i>
<div class="rl-node-title">The Bellman Equation</div>
<div class="rl-node-subtitle">V(s) = R + γV(s')</div>
</div>

<br>

## 4. Two Paradigms: Planning vs. Learning
Depending on whether we know the "rules" of the world, we approach the problem differently:

<div class="rl-grid" style="margin: 1.5rem 0;">
<div class="rl-node" data-id="planning">
<i class="uil uil-brain rl-node-icon"></i>
<div class="rl-node-title">Planning</div>
<div class="rl-node-subtitle">Model-Based (Rules Known)</div>
</div>
<div class="rl-node" data-id="learning">
<i class="uil uil-search rl-node-icon"></i>
<div class="rl-node-title">Learning</div>
<div class="rl-node-subtitle">Model-Free (Trial & Error)</div>
</div>
</div>

| Paradigm | Knowledge | Example Method |
| :--- | :--- | :--- |
| **Model-Based (Planning)** | You know the transition rules (P and R). | Dynamic Programming |
| **Model-Free (Learning)** | You don't know the rules; you learn by doing. | Q-Learning, SARSA |

<br>

## 5. Scaling Up: The Deadly Triad
In simple problems (like a $4 \times 4$ grid), we can store the value of every state in a table. But for a robot or a game like Go, the number of states is astronomical. We use **Function Approximation** (like Neural Networks) to estimate these values.

However, when we combine three specific ingredients, RL can become unstable or even "break" (diverge). This is known as the **Deadly Triad**:

1.  **Function Approximation:** Using a model instead of a table.
2.  **Bootstrapping:** Updating estimates based on other estimates (Bellman updates).
3.  **Off-Policy Learning:** Learning from experience that wasn't generated by the current policy.

<div class="rl-node" data-id="deadly-triad" style="max-width: 600px; margin: 1.5rem auto; border-color: #f43f5e;">
<i class="uil uil-exclamation-triangle rl-node-icon" style="color: #f43f5e;"></i>
<div class="rl-node-title" style="color: #f43f5e;">The Deadly Triad</div>
<div class="rl-node-subtitle">Approximation + Bootstrapping + Off-Policy</div>
</div>

Understanding these foundations is the first step toward building autonomous systems that can learn, adapt, and navigate the real world.
