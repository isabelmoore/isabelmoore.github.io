## Background: Air-Ground Teamed Autonomy at BCDC

While working at the **George H.W. Bush Combat Development Complex (BCDC)** in coordination with the U.S. Army, I contributed to the **AGC-MOTE** (**A**ir-**G**round-**C**ooperative **M**ulti-Robot Multi-**O**bject **T**rajectory **E**stimation) project, a broader U.S. Army initiative for heterogeneous multi-robot systems that enable air and ground vehicles to operate collaboratively alongside humans in complex mission environments.

Within this larger effort, I was specifically tasked with developing a drift correction and localization system for ground vehicles that could operate in conjunction with air and ground platforms, addressing the persistent challenge of sensor drift in autonomous systems.


<div style="text-align: center; margin: 2rem 0;">
  <img src="img/jeep_wrld_state.png" alt="Multi-Robot Tracking System" style="width: 100%; max-width: 900px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
  <br><em>Dynamic multi-object tracking: Ground vehicle (Jeep) maintaining real-time trajectory estimates of aerial (Drone) and ground (Wolf) targets through coordinated sensor fusion.</em>
</div>

By collecting ROS bag data from test vehicles, I replayed missions in a controlled environment to systematically test and tune the algorithms. This was essential for achieving high accuracy.


## The Problem: Sensor Drift in Autonomous Navigation

A major issue in autonomous systems is sensor drift, where the vehicle's estimated position and orientation diverge from its true state over time due to accumulated errors from IMUs and wheel encoders. This was a common issue at BCDC across both air and ground platforms, particularly when sensors weren't calibrated correctly or when vehicles began moving.

Simple approaches like dead reckoning (using only IMU and wheel encoders) create "open-loop" integration errors that accumulate exponentially, causing a vehicle perceiving even a slight rotation while moving straight to be completely lost within seconds. My approach fuses dead reckoning with absolute GPS position, creating a "closed-loop" solution that prevents long-term divergence while smoothing out sensor noise. The Extended Kalman Filter provides an optimal balance by efficiently handling the motion model while explicitly estimating and correcting sensor bias in real-time.


## Technical Approach: Sensor Fusion and Bias Estimation

### Extended Kalman Filter (EKF)

The EKF treats localization as a 7-state estimation problem: `[x, y, v, theta, yaw_rate_bias, heading_bias, acceleration]`, where bias and acceleration are hidden variables estimated alongside position and orientation.

**Prediction Model** (constant acceleration with damping):

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

**The Key: Real-Time Bias Correction**

The filter estimates sensor bias $\dot{\psi}_{bias}$ as a random walk process and subtracts it from the raw IMU reading at every step. The prediction step occurs at every IMU and odometry event, while the update step corrects based on GPS, IMU, and velocity measurements.

**Design Choice:** I chose EKF over UKF for lower computational overhead on embedded hardware. Given the well-behaved motion model and high measurement frequency, EKF linearization was sufficient.

### Particle Filter (Monte Carlo Localization)

For highly non-linear scenarios, the Particle Filter maintains 500+ hypotheses representing potential states. Particles are weighted by their likelihood of explaining measurements, with resampling to converge on the most likely trajectory.

### Validation Pipeline

Three-phase validation: (1) **Backtesting** to tune gains on replay data, (2) **Deployment** to live ROS platforms, (3) **Real-Time QA** monitoring on RViz dashboards. Offline replay with systematic parameter sweeps is essential for high accuracy. For ground truth, I calculated error metrics against an independent reference derived from raw GPS course data and geometric logic to avoid circular validation where the filter would grade its own work.


## Results: Proven Performance

The EKF-based localization stack demonstrated an **84.9% reduction in angular drift** compared to raw sensor data, reducing mean heading error from **23.9°** to **3.6°**.

### Visual Comparison: Drift Correction in Action

The visualizations below demonstrate the EKF's effectiveness at correcting yaw drift. The red path shows raw IMU integration with uncorrected yaw bias, which drifts significantly from the true path. The green path shows the corrected EKF estimate, which remains accurate through continuous bias estimation.

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
    <strong style="display: block; margin-bottom: 10px; color: var(--title-color);">Raw Sensor Odometry (Drift)</strong>
    <img src="img/red_crop_demo.gif" alt="Raw INS (Red Line)" class="truth-learner-img">
    <em style="display: block; margin-top: 10px; font-size: 0.9rem;">Raw IMU integration with uncorrected yaw bias (red) diverges from the true trajectory.</em>
  </div>
  <div class="truth-learner-column">
    <strong style="display: block; margin-bottom: 10px; color: var(--title-color);">EKF-Corrected Estimate</strong>
    <img src="img/green_crop_demo.gif" alt="EKF Estimate (Green Line)" class="truth-learner-img">
    <em style="display: block; margin-top: 10px; font-size: 0.9rem;">EKF-corrected estimate (green) maintains accuracy through real-time bias compensation.</em>
  </div>
</div>

### Quantitative Metrics

| Metric | Raw Sensor | EKF Estimate | Improvement |
| :--- | :--- | :--- | :--- |
| **Mean Error** | 23.95° | 3.618° | **84.9% Reduction** |
| **95% Confidence** | [0.49°, 120.8°] | [0.05°, 21.8°] | **82.0% Faster Convergence** |
| **Trimmed Mean (95%)** | 21.555° | 3.100° | **85.6% Accuracy Gain** |

<div style="text-align: center; margin: 2rem 0;">
  <img src="img/performance_metrics.png" alt="AGC-MOTE Performance Analysis" style="width: 100%; max-width: 900px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
  <br><em>Comprehensive performance analysis showing drift correction metrics, visual comparison of sensor-frame vs fused estimates, and live heading diagnostics over mission time.</em>
</div>

The live sensor fusion diagnostics (bottom panel) show heading error over mission time. The raw IMU (red) exhibits severe drift, the GPS-derived course (blue) is extremely noisy, while the EKF estimate (green) remains stable and accurate.

<div style="text-align: center; margin: 2rem 0;">
  <img src="img/mote_plot.gif" alt="MOTE Convergence Plot" style="width: 100%; max-width: 800px; border-radius: 8px;">
  <br><em>Real-time convergence of the EKF state estimate vs Ground Truth.</em>
</div>


## Discussion

This work achieved 84.9% drift reduction, demonstrating that accurate localization is achievable through real-time bias estimation and sensor fusion. The key insight: **continuous bias estimation is non-negotiable** for turning drifting sensor data into reliable trajectories, enabling effective multi-robot coordination in air-ground teams.

### Extensions and Future Work

This project is far from over. The framework can be extended to UAVs where yaw drift is just as critical. The yaw bias estimation logic scales directly to flight controllers, and the state vector expands easily to 6-DOF `[x, y, z, v, theta, phi, rho]` for full 3D odometry.

**Next Steps:**
- Multi-vehicle cooperative localization with relative position measurements
- Visual landmark fusion to reduce GPS dependency in denied environments
- Adaptive noise tuning to automatically handle degraded GPS conditions

