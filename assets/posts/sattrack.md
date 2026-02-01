I wanted to learn more about Kalman filters and orbital mechanics, so I built a satellite tracker. It seemed like a good way to get hands-on with state estimation, coordinate transformations, and real-time data—concepts I'd been reading about but hadn't applied to a real system.

![SatTrack App Screenshot](img/sattrack.png)

## A Quick Primer on Satellites

Before getting into the technical details, here's a quick reference for the different types of satellites you'll encounter:

| Type | Altitude | Purpose | Examples |
| :--- | :---: | :--- | :--- |
| **GPS/Navigation** | ~20,200 km | Position, timing, navigation | GPS, GLONASS, Galileo |
| **Communications** | ~35,786 km | Internet, TV, phone | Starlink, SES, Intelsat |
| **Weather** | ~800 km | Forecasting, storm tracking | NOAA, GOES |
| **Reconnaissance** | ~200-1000 km | Earth imaging | Classified |
| **Space Stations** | ~400 km | Human spaceflight, research | ISS, Tiangong |

## Working with TLE Data

Satellites publish their orbital parameters in a format called Two-Line Elements (TLE). It's a compact representation of an orbit at a specific moment in time. To find where a satellite is *now*, you need to propagate these elements forward using the SGP4 model.

The output is in an inertial reference frame (TEME), which is fixed relative to the stars. But we want coordinates on a map, so the next step is converting to latitude and longitude—accounting for the fact that the Earth has rotated since the epoch.

## State Estimation with Kalman Filtering

TLE data is updated periodically, but between updates we can predict position and correct for drift when new data arrives. This is the same principle used in GPS receivers—combine a physics model with noisy measurements to get a better estimate than either alone.

## Current Status

The app runs as a Progressive Web App with smooth 60fps updates. I also integrated health data from the USCG Navigation Center to show which satellites are operational vs. under maintenance.

*This project is still in progress.*

## What's Next

- 3D visualization with a Three.js globe
- Pass predictions for specific observer locations
- Conjunction analysis to monitor potential collisions

