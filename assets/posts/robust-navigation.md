![Clearpath Jackal UGV](img/JackalUGV4-1920x1013.jpg)

The **Clearpath Jackal** is a compact, rugged UGV designed for outdoor research. Its differential drive system makes it an ideal testbed for reinforcement learning—but policies trained in simulation often fail on real hardware due to unmodeled dynamics like tire slip and motor lag.

I wanted to see if **domain randomization** could help. By training with randomized physics parameters, could a policy learn to generalize across different terrain conditions?

![Jackal Robot Demo](img/jackal_demo.gif)

## The Kinematics & Dynamics

The Jackal is a differential drive robot. The kinematics are straightforward:

$$
\dot{x} = r \frac{(\omega_L + \omega_R)}{2} \cos(\theta)
$$

$$
\dot{y} = r \frac{(\omega_L + \omega_R)}{2} \sin(\theta)
$$

$$
\dot{\theta} = r \frac{(\omega_R - \omega_L)}{w}
$$

However, the **dynamics** are more complex. We must account for wheel inertia $I_w$, motor torque $\tau$, and friction $f_{\text{traction}}$:

$$
I_w \dot{\omega} = \tau - f_{\text{traction}} \cdot r
$$

$$
m \ddot{x}_{\text{longitudinal}} = f_{\text{traction}} - f_{\text{drag}} - f_{\text{rolling}}
$$

The critical insight: **if the simulation models friction incorrectly, the learned policy will fail in the real world.**

## The Experiment: Narrow vs. Broad Distribution

I trained two policies using Proximal Policy Optimization (PPO) for 10 million steps:

1.  **Narrow Distribution (Specialist):** Trained on a fixed, high-friction surface ($\mu=1.0$).
2.  **Broad Distribution (Generalist):** Friction was randomly sampled $\in [0.1, 1.0]$ at the start of every episode.

## Results

The table below shows the **Average Cross-Track Error (CTE)** in meters for both training approaches, tested on 25m paths in Gazebo.

| Friction ($\mu$) | ND-Trained (Nominal) | BD-Trained (Robust) | Improvement |
| :---: | :---: | :---: | :---: |
| 0.10 (Ice) | 0.057 m | **0.048 m** | 16% ↑ |
| 0.25 | 0.058 m | **0.049 m** | 16% ↑ |
| 0.50 | 0.054 m | **0.048 m** | 11% ↑ |
| 0.75 | 0.061 m | **0.048 m** | 21% ↑ |
| 1.00 (Tarmac) | 0.066 m | **0.052 m** | 21% ↑ |

**Key Takeaway:** The domain-randomized policy achieved 11-21% lower tracking error across *all* friction levels by learning a conservative, robust control strategy.

## Roadmap

*   **Real-World Deployment:** Porting the ONNX model to the physical Jackal.
*   **Vision Integration:** Fusing LiDAR/Camera data for obstacle avoidance.
*   **Meta-Learning:** Algorithms that adapt to new terrain in real-time.
