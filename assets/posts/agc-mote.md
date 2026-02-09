In the world of autonomous systems, precise localization is the foundation of every mission. **AGC-MOTE** (**A**ir-**G**round-**C**ooperative **M**ulti-Robot Multi-**O**bject **T**rajectory **E**stimation) is a cooperative localization framework designed to solve one of the most persistent hurdles in heterogeneous robot teams: **Sensor Fusion and Drift Correction** across air and ground platforms.

This project transforms messy, drifting raw sensor data into rock-solid, accurate trajectories using an **Extended Kalman Filter (EKF)** and **Monte Carlo Localization (Particle Filter)**, enabling robust multi-robot coordination.

---

## Proven Performance

Final analysis of real-world ground-vehicle mission data showed an **84.9% reduction in angular drift**, bringing raw sensor error down from a mean of **23.9°** to a filtered estimate of **3.6°**.

### Longitudinal Drift Correction

| Metric | Raw Sensor (Red) | EKF estimate (Green) | Improvement |
| :--- | :--- | :--- | :--- |
| **Mean Error** | 23.951° | 3.618° | **84.9% Reduction** |
| **95% Confidence** | [0.49°, 120.8°] | [0.05°, 21.8°] | **82.0% Faster Convergence** |
| **Trimmed Mean (95%)** | 21.555° | 3.100° | **85.6% Accuracy Gain** |

<div style="text-align: center; margin: 2rem 0;">
  <img src="img/mote_plot.gif" alt="MOTE Convergence Plot" style="width: 100%; max-width: 800px; border-radius: 8px;">
  <br><em>Real-time convergence of the EKF state estimate vs Ground Truth.</em>
</div>

The system was validated through an extensive backtesting suite using real-world bag data. We employed robust statistical metrics, including **Trimmed Means** and **95th Percentile Confidence Intervals**, to ensure the localization accuracy was not skewed by GPS "jumps" or outliers.

### Independent Verification
To avoid mathematical "circularity," all error metrics were calculated against an independent ground truth derived from raw GPS course over ground and geometric course logic, ensuring the Green line's accuracy is a genuine reflection of reality, not just filter over-confidence.

---

## Technical Foundations

Our framework is built on three core principles to ensure mathematical accuracy and operational reliability across any autonomous platform.

### 1. Reference Frame Reconciliation

The system operates across two reference frames that must be continuously aligned:

<style>
  .truth-learner-container {
    display: flex;
    gap: 20px;
    margin: 2rem 0;
    flex-wrap: wrap;
  }
  .truth-learner-column {
    flex: 1 1 300px;
    text-align: center;
    min-width: 0;
  }
  .truth-learner-img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    object-position: center;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  }
  @media (max-width: 600px) {
    .truth-learner-img {
      height: 250px;
    }
  }
</style>

<div class="truth-learner-container">
  <div class="truth-learner-column">
    <strong style="display: block; margin-bottom: 10px; color: var(--title-color);">Sensor-Frame Odometry (Drift)</strong>
    <img src="img/red_crop_demo.gif" alt="Raw INS (Red Line)" class="truth-learner-img">
    <em style="display: block; margin-top: 10px; font-size: 0.9rem;">High-frequency IMU/Odometry estimates subject to cumulative drift (Visualized in Red).</em>
  </div>
  <div class="truth-learner-column">
    <strong style="display: block; margin-bottom: 10px; color: var(--title-color);">Fused State Estimate (Corrected)</strong>
    <img src="img/green_crop_demo.gif" alt="EKF Estimate (Green Line)" class="truth-learner-img">
    <em style="display: block; margin-top: 10px; font-size: 0.9rem;">The filtered estimate anchored to absolute position (Visualized in Green).</em>
  </div>
</div>

*   **Sensor-Frame Odometry**: High-frequency estimates from onboard IMU and encoders. Over time, these sensors drift, causing trajectory divergence.
*   **Global Position Reference**: Absolute measurements from GPS, providing drift-free position at lower update rates.
*   **Fused State Estimate**: The filter's output that leverages high-frequency dynamics while anchoring to absolute position, providing a stable state estimate.

### 2. Online Bias Estimation

Real-world sensors exhibit systematic biases, particularly **Yaw Rate Bias**. If your system perceives a slight rotation when moving in a straight line, navigation will fail within seconds. AGC-MOTE treats bias as a state variable in the EKF, estimating and subtracting this bias in real-time to calibrate sensors on the fly.

### 3. Multi-Phase Validation Pipeline

To ensure the mathematical foundation holds up, the system is validated across three distinct phases:
*   **Backtesting**: Replay raw flight or drive data through the filter to tune $Q/R$ gains.
*   **Deployment**: Deploy the validated localization stack to a live ROS-based robot or drone.
*   **Real-Time QA**: Monitor the Estimate vs Ground Truth live on a 3D RViZ dashboard.
---

## Architectural Decisions

### Why EKF and not UKF?

While the Unscented Kalman Filter (UKF) can provide better accuracy for highly non-linear systems by using sigma points, the EKF was chosen for its significantly lower computational overhead on the target embedded hardware. Given the relatively well-behaved motion model of the ground vehicle and the high frequency of measurement updates, the EKF provided a sufficient linearization approximation without the added complexity of sigma point propagation and weight tuning.

### Why not simple Dead Reckoning?

Dead reckoning relies solely on internal motion sensors (IMU and wheel encoders), which causes "open-loop" integration errors to accumulate over time. Even high-grade sensors suffer from deterministic and stochastic noise that leads to exponential trajectory divergence. The EKF provides a "closed-loop" solution by fusing dead reckoning with absolute global position (GPS), preventing long-term divergence while smoothing out the inherent noise and jitter found in raw GPS signals.

---

## Localization & Drift Correction

This project implements two advanced sensor fusion approaches to estimate and cancel yaw drift in real-time.

### 1. Extended Kalman Filter (EKF)

The EKF treats the system as a 7-state estimation problem where bias and acceleration are hidden variables.

- **State Vector**: `[x, y, v, theta, yaw_rate_bias, heading_bias, acceleration]`
- **Prediction**: Constant Acceleration Model with moderate damping. It predicts angular change using `(omega_measured - yaw_rate_bias)`.
- **Update**: Corrects the state based on GPS (position), IMU (yaw/heading), and linear velocity measurements.
- **Clock Synchronization**: The filter is unified across all event types. Prediction occurs at every INS (IMU) and TWIST (Odometry) event, ensuring the state remains current even when sensor frequencies vary.

#### Mathematical Formulation (EKF)

**State Prediction Model:**
$$
\begin{align*}
d &= v_k \Delta t + \frac{1}{2} a_k \Delta t^2 \\
x_{k+1} &= x_k + d \cos(\theta_k) \\
y_{k+1} &= y_k + d \sin(\theta_k) \\
v_{k+1} &= v_k + a_k \Delta t \\
\theta_{k+1} &= \theta_k + (\omega_{meas} - \dot{\psi}_{bias}) \Delta t \\
a_{k+1} &= a_k (1 - \lambda_{damping})
\end{align*}
$$

**Bias Correction:**
The filter estimates the sensor bias $\dot{\psi}_{bias}$ as a random walk process. This estimated bias is subtracted from the raw IMU reading $\omega_{meas}$ at every step, effectively calibrating the sensor in real-time.

### 2. Particle Filter (Monte Carlo Localization)

For complex, non-linear scenarios, the Particle Filter maintains a set of 500+ "hypotheses" (particles).

- **Process**: Each particle represents a potential state `[x, y, theta, bias]`. 
- **Resampling**: Particles that better explain the observed GPS/Yaw measurements are "survived," while others are discarded, naturally converging on the most likely trajectory.

#### Probability Update

**Weight Calculation:**
For each particle $i$, the weight $w^{(i)}$ is updated based on the Gaussian likelihood of the measurement $z$:
$$
w^{(i)} \propto \exp\left( -\frac{||pos^{(i)} - z_{gps}||^2}{2\sigma_{pos}^2} \right)
$$
This rewards particles that are spatially close to the GPS signal while penalizing outliers.


---

## Scaling to Aerial Platforms

While the validation case presented here is a 2D ground vehicle, the core framework is directly applicable to aerial platforms where yaw drift critically impacts mission safety and mapping quality.

### 3D State Extension

Drones operate in a 6-DOF environment. The AGC-MOTE framework is architected for expansion:

- **Yaw Stabilization**: The current logic for estimating $\dot{\psi}_{bias}$ (Yaw Rate Bias) scales directly to UAV flight controllers.
- **Full 6-DOF Odometry**: The state vector `[x, y, v, theta, ...]` can be mathematically extended to include $[z, \phi, \rho]$ (Altitude, Roll, Pitch) for complete 3D odometry fusion.

### Kinematic Foundations

By utilizing a constant-acceleration model in the EKF prediction step, the system provides a robust kinematic foundation that respects the inertia of both UGVs and UAVs, making it more resilient than simple dead-reckoning approaches.

---

## Lessons Learned

### Bias is the Primary Enemy

The most significant finding during this project was that constant yaw rate bias is the primary driver of dead reckoning drift. Simply integrating raw IMU data will fail within seconds. Explicitly estimating this bias as a state variable in the filter is not optional—it is the core requirement for stable navigation.

### The Importance of Sensor Frequency

High-frequency IMU data (100Hz+) is essential for accurate state prediction between lower-frequency GPS updates (often 5-10Hz). Without sufficient temporal resolution, the discrete-time approximations used in the EKF prediction step introduce significant linearization errors during sharp maneuvers.

### Robust Metrics are Mandatory

Standard means and standard deviations are insufficient when dealing with GPS noise. Using **95th Percentile Confidence Intervals** allowed us to see exactly where the filter was struggling—typically during slow, high-curvature turns where GPS heading becomes unreliable.

### Replay Data is Essential

The "sim-to-real" gap exists even in purely mathematical filters. Being able to record raw bag files and replay them through different filter tuning parameters (process noise $Q$ and measurement noise $R$) was the only way to achieve sub-meter accuracy. You cannot tune a filter effectively in real-time while the robot is moving.