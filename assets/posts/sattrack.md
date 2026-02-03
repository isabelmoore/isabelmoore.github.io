I wanted to learn more about orbital mechanics and coordinate transformations, so I built a satellite tracker. It was a good way to get hands-on with orbital mechanics, refresh myself on reference frame conversions, and Frontend development concepts. I had been hearing and reading about but had not applied to a live system.

Additionally, I was dissatisfied with existing satellite tracking websites. Most of them feel like they were built in the early 2000s: you search for a satellite, view it, but then have to go back and search again to look at another one. There is no sidebar to browse or filter, no smooth navigation. I wanted something modern: a single map view where you can toggle constellations, click on any satellite, and explore without constant page reloads.

![SatTrack App](../img/sattrack_demo.gif)

While the GIF doesn't do it justice, the app is fully functional and can be found [here](https://sattracklive.vercel.app/).

## Understanding GNSS Satellites

**GNSS** stands for **Global Navigation Satellite System**—the umbrella term for all satellite navigation systems. GPS is the American one, but GNSS includes all four major constellations:

| Constellation | Country | # of Satellites | Altitude |
| :--- | :---: | :---: | :---: |
| **GPS** | USA | ~31 | ~20,200 km |
| **GLONASS** | Russia | ~24 | ~19,100 km |
| **Galileo** | EU | ~30 | ~23,222 km |
| **BeiDou** | China | ~35 | ~21,528 km |

In the field of satellite navigation, the term "constellations" refers to the group of satellites that make up a particular navigation system. All of these orbit in Medium Earth Orbit (MEO) and are used for positioning, navigation, and timing services, used in devices like smartphones and smartwatches.

## Working with TLE Data

Satellites publish their orbital parameters in a format called **Two-Line Elements (TLE)**, which is a compact representation of a satellite's orbit at a specific moment in time (the "epoch"). To find where a satellite is *now*, I propagate these elements forward using the **SGP4 algorithm**, which is a physics-based model that accounts for Earth's gravity, atmospheric drag, and other factors. 

The output of SGP4 is a position vector in the **TEME (True Equator Mean Equinox)** reference frame—an Earth-centered inertial coordinate system. However, for plotting on a map, I need latitude and longitude. The conversion involves:

1. Calculating **Greenwich Mean Sidereal Time (GMST)** to account for Earth's rotation
2. Rotating from TEME to an Earth-fixed frame
3. Converting Cartesian (x, y, z) to geodetic coordinates using the **WGS84** ellipsoid model

The geodetic conversion uses an iterative algorithm to handle Earth's oblateness (it's not a perfect sphere).

## Satellite Health Status

Beyond just position, the app shows whether each satellite is actually operational. For GPS satellites, I fetch real-time health data from the **U.S. Coast Guard Navigation Center (NAVCEN)**, which publishes which satellites are currently under maintenance or marked unusable.

This data is cross-referenced with each satellite's PRN (Pseudo-Random Noise) number extracted from the TLE name field.

## Technical Implementation

**Backend (Python/FastAPI):**
- Fetches TLE data from CelesTrak with caching and rate-limit handling
- Propagates positions using the `sgp4` library
- Calculates ±60 minute orbit paths for trajectory visualization
- Integrates NAVCEN health status for GPS constellation

**Frontend (Vue.js/Leaflet):**
- Interactive map with satellite markers color-coded by constellation
- Toggleable orbit path visualization
- Constellation filter in sidebar
- Live position updates with smooth marker animations

## What I Learned

- **Deployment is harder than development.** Getting code to run on my laptop was the easy part. Getting it to run on cloud servers took just as long—debugging build errors, wiring services together, and dealing with configuration differences between local and production environments. All of which I had never done before.

- **External APIs will push back.** The satellite data, specifically the TLE data from CelesTrak, started blocking my requests when I hit them too often. I had to add caching and "back off and retry" logic to keep the app from breaking.

- **Edge cases hide at the edges.** Satellites near the North Pole or crossing the International Date Line broke the map in subtle ways. Real-world data doesn't stay inside the happy path.


## Future Work

While this project was a great learning experience, there are several features I would consider adding if I were to continue working on it:
- 3D visualization with a Three.js globe
- Pass predictions for specific observer locations
- Support for additional satellite types (Starlink, weather satellites)
    - However, these satellites are numerous and would require a different approach to data management and visualization.

## References

[1] F. R. Hoots and R. L. Roehrich, "Spacetrack Report No. 3: Models for Propagation of NORAD Element Sets," U.S. Air Force Aerospace Defense Command, Colorado Springs, CO, Tech. Rep., Dec. 1980.

[2] D. A. Vallado, P. Crawford, R. Hujsak, and T. S. Kelso, "Revisiting Spacetrack Report #3," in *AIAA/AAS Astrodynamics Specialist Conference*, Keystone, CO, 2006, Paper AIAA 2006-6753.

[3] National Imagery and Mapping Agency, "Department of Defense World Geodetic System 1984: Its Definition and Relationships with Local Geodetic Systems," NIMA Tech. Rep. TR8350.2, 3rd ed., Jan. 2000.

[4] T. S. Kelso, "CelesTrak: NORAD Two-Line Element Sets," [Online]. Available: https://celestrak.org/NORAD/elements/. [Accessed: Feb. 2, 2026].

[5] U.S. Coast Guard Navigation Center, "GPS Constellation Status," [Online]. Available: https://www.navcen.uscg.gov/gps-constellation. [Accessed: Feb. 2, 2026].
