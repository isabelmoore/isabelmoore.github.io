I started watching quant dev content because the discussion around it was everywhere on my feed. The more I watched, the more I realized the tech stack was almost identical to what we use in autonomous systems. Then I noticed something else: most teams in systems engineering and mechanical engineering are not familiar with the potential benefits of operating as a production software infrastructure team. And in my opinion, that gap is holding the early developers in the industry back.

I want to be upfront. This is something I have found through research, not something I have fully implemented and tested yet. I am a little busy with school right now, but once I wrap up my courses and thesis, I plan to build this pipeline out and open source the work.

## What the AV Workflow Actually Looks Like

Here is how most AV and robotics teams actually operate. You run a simulation in CARLA or Gazebo, or you collect real sensor data and record it into rosbags. If you are doing RL, those rosbags feed into a PyTorch or TensorFlow training loop. Once the model is trained, or if you are working on something like an EKF corrector, you spin up a tmux session with multiple panes running simultaneously: one pane plays the simulation or rosbag data, another runs the node (your model, your EKF, whatever the algorithm is), and a third pane runs RViz so you can watch the output in 3D. Your metrics are cross track error, yaw drift, mission completion rate. Your monitoring is the terminal. Your storage is CSV files and Jupyter notebooks.

![AV Pipeline](/assets/img/av-pipeline.svg)

It works for research. But look at how the other side does it.

## What the Quant Workflow Looks Like

A quant system ingests market data at thousands of messages per second through FIX protocol. That data flows through gRPC and Kafka into a strategy engine and risk engine written in C++. Processed data is stored in KDB+/Q for time series, PostgreSQL for structured records, and Cassandra for high volume raw data. Everything is monitored in real time through Grafana dashboards, Prometheus metrics, and the ELK stack for centralized log search. The entire system runs in Docker containers orchestrated by Kubernetes. If something fails silently, it costs real money.

![Quant Pipeline](/assets/img/quant-pipeline.svg)

## One Layer Down, Same Foundation

The jobs are completely different. But look at what both pipelines actually need underneath the domain specific work:

**A fast language for the critical path.** Quant uses C++ because microseconds matter in trading. AV needs the same thing because a 10Hz Python control loop does not cut it on real hardware at 100Hz. Most AV teams have not made this transition yet. Quant teams never had the luxury of slow, so C++ was always the default. AV is starting to learn the same lesson.

**Tools:**
- [Conan](https://conan.io/): like pip but for C++
- [GoogleTest](https://github.com/google/googletest): catches bugs before production

**A communication layer between distributed services.** In AV, perception, planning, and control are separate processes that need to talk to each other. In quant, market data feeds, strategy engines, and execution gateways are separate processes that need to talk to each other. Different services, same problem. gRPC and Protobuf handle the synchronous calls. Kafka handles the asynchronous streaming and replay. ROS 2's DDS and Bloomberg's BlazingMQ are different tools solving the exact same architectural problem one layer down.

**Tools:**
- [gRPC](https://grpc.io/): remote procedure calls, like a phone call between services
- [Protobuf](https://protobuf.dev/): shared language so services understand each other
- [Kafka](https://kafka.apache.org/): message conveyor belt with full replay
- [ROS 2](https://docs.ros.org/en/rolling/): pub/sub radio channel for real time sensor data

**A structured storage layer.** Both need time series databases for high frequency data, relational databases for metadata, and NoSQL for raw dumps. The schemas are completely different. The architectural decisions are the same. Most AV teams are still on CSV files and Jupyter notebooks. No pipeline, no replay, no queryable storage.

**Tools:**
- [InfluxDB](https://www.influxdata.com/): time series database, built for timestamped data
- [KDB+/Q](https://kx.com/): the quant gold standard, extremely fast time series
- [PostgreSQL](https://www.postgresql.org/): relational database, the spreadsheet that scales
- [Cassandra](https://cassandra.apache.org/): NoSQL, massive write throughput across many machines

**Real monitoring.** Not someone watching a terminal. Grafana dashboards. Prometheus metrics. ELK for log aggregation and search. An AV engineer monitors path error and sensor health. A quant monitors P&L drift and execution latency. Completely different metrics. Same tools, same alerting patterns, same incident response workflows. Quant teams have been doing this for years because silent failures cost money. AV is reaching that same inflection point.

**Tools:**
- [Grafana](https://grafana.com/): dashboard builder, the screen on the wall showing system health
- [Prometheus](https://prometheus.io/): metrics collector, constantly asking your services how they are doing
- [Elasticsearch](https://www.elastic.co/elasticsearch): Google for your log files
- [Logstash](https://www.elastic.co/logstash): funnels logs from everywhere into one place
- [Kibana](https://www.elastic.co/kibana): dashboards for your logs

**Containerization.** Both domains run many interdependent services that need to be versioned, deployed, and monitored as a unit. The docker compose files look remarkably similar even though the services inside them have nothing in common.

**Tools:**
- [Docker](https://www.docker.com/): packages your app into a portable box
- [Kubernetes](https://kubernetes.io/): manages hundreds of those boxes at scale
- [Git](https://git-scm.com/): version control, the undo button for your entire project

## Where They Actually Diverge

The surface layer is where the differences live. Quant cares about kernel bypass, FPGA acceleration, nanosecond latency, KDB+/Q, and FIX protocol. AV cares about sensor fusion, SLAM, computer vision, ROS 2, and control theory. The math is entirely different: stochastic calculus versus Kalman filters. These are real, deep specializations that take years to develop. Nobody is saying the jobs are the same.

But the infrastructure underneath those specializations is the same. And that is the part most people miss.

## Why This Matters

If you are on an AV or systems engineering team, look one layer down at how quant teams build their infrastructure. The tools exist. The patterns are proven. Your team does not need to reinvent them.

If you are an engineer in either field curious about the other, the transition is more accessible than it looks from the outside. The domain expertise is the hard, specialized part. The infrastructure skills transfer directly because they were never domain specific to begin with.

In the future, I plan to build and open source a full telemetry platform that implements this shared stack. Once school wraps up, that work will be public. In the meantime, if you see the same overlap I do, start exploring. The tools do not care whether the data is LIDAR point clouds or options prices. Good infrastructure is good infrastructure.