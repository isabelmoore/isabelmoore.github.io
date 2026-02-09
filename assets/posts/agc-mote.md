
## Background: Air-Ground Teamed Autonomy at BCDC

While working at the **George H.W. Bush Combat Development Complex (BCDC)** in coordination with the U.S. Army, I contributed to the **AGC-MOTE** (**A**ir-**G**round-**C**ooperative **M**ulti-Robot Multi-**O**bject **T**rajectory **E**stimation) project, a broader U.S. Army initiative focused on enabling air and ground robots to operate cooperatively in complex environments alongside humans.

My role centered on improving localization for ground vehicles, specifically addressing sensor drift, a common issue that causes autonomous systems to gradually lose track of their true position over time.


<div style="text-align: center; margin: 2rem 0;">
  <img src="img/jeep_wrld_state.png" alt="Multi-Robot Tracking System" style="width: 100%; max-width: 900px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
  <br><em>Dynamic multi-object tracking: Ground vehicle (Jeep) maintaining real-time trajectory estimates of aerial (Drone) and ground (Wolf) targets through coordinated sensor fusion.</em>
</div>

To evaluate performance, I replayed recorded vehicle missions in a controlled environment using ROS, allowing systematic testing and refinement of the localization algorithms before deployment on live systems.


## The Problem: Sensor Drift in Autonomous Navigation

Autonomous vehicles rely on onboard sensors such as IMUs and wheel encoders to estimate motion. Over time, small measurement errors accumulate, causing the vehicle’s estimated position to diverge from reality, known as **sensor drift**. If left uncorrected, this drift can destabilize navigation within seconds.

To address this, a **sensor fusion framework** was developed that combines relative motion estimates with absolute GPS measurements. This closed-loop approach prevents long-term divergence while reducing noise and improving overall state stability.


## Technical Approach: Real-Time Sensor Fusion

The system uses an **Extended Kalman Filter (EKF)** to fuse IMU, wheel encoder, and GPS measurements, continuously correcting the vehicle’s estimated state. The filter tracks position, velocity, and heading while simultaneously estimating sensor bias in real time.

The vehicle motion model used within the filter is shown below:

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
The filter predicts vehicle motion using IMU and wheel encoder data while explicitly estimating and compensating for sensor bias. GPS updates are then used to correct the predicted state, preventing long-term drift and stabilizing the trajectory.

Within the broader framework, three heading signals are monitored to evaluate system behavior and guide filter design:

| Signal                      | Expected Behavior                                              |
| :-------------------------: | :------------------------------------------------------------: |
| **Raw IMU (Red)**           | Expected to drift over time due to accumulated bias            |
| **Course-from-Path (Blue)** | Drift-free but noisy due to short-window trajectory estimation |
| **EKF Estimate (Green)**    | Smooth, stable, and drift-resistant through sensor fusion      |

The raw IMU provides strong short-term responsiveness but accumulates error over time. The course-from-path estimate, computed from a recent trajectory window, avoids long-term drift but introduces significant noise. The EKF combines the strengths of both, producing a smooth and stable estimate resistant to both drift and noise.

For validation, the system was tested using replayed mission data and live vehicle testing to ensure observed behavior matched design expectations.

## Results

The EKF-based localization stack demonstrated an **84.9% reduction in angular drift** compared to raw sensor data, reducing mean heading error from **23.9°** to **3.6°**.

### Visual Evidence: Raw IMU vs Course Estimate vs EKF
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

  table {
    margin: 1.5rem auto;
  }
  table th, table td {
    text-align: center !important;
    padding: 0.75rem 1rem;
  }

</style>
The comparison below shows three localization signals:
| Arrow Color | Description |
| :---------: | :---------: |
| Red | Raw IMU Odometry |
| Blue | Course-from-Path |
| Green | EKF Estimate |



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
| :---: | :---: | :---: | :---: |
| **Mean Error** | 23.95° | 3.618° | **84.9% Reduction** |
| **Trimmed Mean (95%)** | 21.555° | 3.100° | **85.6% Accuracy Gain** |


The real-time diagnostics below show heading error over mission time. Raw IMU integration diverges rapidly, while the EKF estimate remains stable and convergent.

<div style="text-align: center; margin: 2rem 0;">
  <img src="img/mote_plot.gif" alt="MOTE Convergence Plot" style="width: 100%; max-width: 800px; border-radius: 8px;">
  <br><em>Real-time convergence of the EKF state estimate vs Ground Truth.</em>
</div>

## Takeaways & Future Directions

Overall, what began as drifting, unreliable sensor data was transformed through continuous bias estimation into a stable and trustworthy state estimate. With drift corrected in real time, the system maintained consistent localization, enabling dependable autonomous navigation and coordinated multi-robot operation.

This project is far from over. The framework can be extended to UAVs where yaw drift is just as critical. The yaw bias estimation logic scales directly to flight controllers, and the state vector expands easily to 6-DOF `[x, y, z, v, theta, phi, rho]` for full 3D odometry.

**Next Steps:**
- Multi-vehicle cooperative localization with relative position measurements
- Visual landmark fusion to reduce GPS dependency in denied environments
- Adaptive noise tuning to automatically handle degraded GPS conditions

