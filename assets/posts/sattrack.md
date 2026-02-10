I wanted to learn more about orbital mechanics and coordinate transformations, so I built a satellite tracker. It was a good way to get hands-on with orbital mechanics, refresh myself on reference frame conversions, and Frontend development concepts. I had been hearing and reading about but had not applied to a live system.

Additionally, I was dissatisfied with existing satellite tracking websites. Most of them feel like they were built in the early 2000s: you search for a satellite, view it, but then have to go back and search again to look at another one. There is no sidebar to browse or filter, no smooth navigation. I wanted something modern: a single map view where you can toggle constellations, click on any satellite, and explore without constant page reloads.

![SatTrack App](img/sattrack_demo.gif)

While the GIF doesn't do it justice, the app is fully functional and can be found [here](https://sattrack.live/).

## Understanding GNSS Satellites

**GNSS** stands for **Global Navigation Satellite System**—the umbrella term for all satellite navigation systems. GPS is the American one, but GNSS includes all four major constellations:

| Constellation | Country | # of Satellites | Altitude |
| :--- | :---: | :---: | :---: |
| **GPS** | USA | ~31 | ~20,200 km |
| **GLONASS** | Russia | ~24 | ~19,100 km |
| **Galileo** | EU | ~30 | ~23,222 km |
| **BeiDou** | China | ~35 | ~21,528 km |

In the field of satellite navigation, the term "constellations" refers to the group of satellites that make up a particular navigation system. All of these orbit in Medium Earth Orbit (MEO) and are used for positioning, navigation, and timing services, used in devices like smartphones and smartwatches.

## How It Works

Satellite positions are calculated from **Two-Line Element (TLE)** data using the **SGP4 propagation algorithm**, which models orbital physics including gravity and atmospheric drag. The output is converted from the TEME reference frame to latitude/longitude coordinates via GMST rotation and WGS84 geodetic conversion.

For GPS satellites, the app also displays operational status by fetching real-time health data from **NAVCEN** (U.S. Coast Guard Navigation Center), cross-referenced with each satellite's PRN identifier.

## Technical Stack

The **backend** is built with Python and FastAPI, handling TLE data fetching from CelesTrak, SGP4 position propagation, orbit path calculation (±60 minutes), and GPS health status integration from NAVCEN.

The **frontend** uses Vue.js and Leaflet to render an interactive map with constellation filtering, color-coded satellite markers, toggleable orbit paths, and live position updates.

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
