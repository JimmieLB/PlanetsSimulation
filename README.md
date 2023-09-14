# PlanetsSimulation

This is a project that I worked on around my sophomore year in high school.
I've made very minor changes to it since then and I thought I should show it.

This was made using THREEjs and originally also used p5.js for displaying the
text but I've refactored it to only use HTML dom elements.

This is a simulation of the 8 planets orbiting the sun.
You can click any of the planets to focus the camera on it and see a short description about them.
I believe I got the desriptions from NASA.gov but I don't completely remember.
If you double click the background the descriptions go away and the camera focuses on the sun.
There is a slider that controls time in the simulation.

The orbits, rotations, and tilt angles are to scale. In real life, Neptune takes about 165x longer to revolve
around the sun than Earth, and this is reflected in the simulation.

I originally wanted the sizes of the planets to be to scale but it would be too hard for the user
to click some of the smaller planets so instead I decided to use a scaler function to determine the size.
The function I used is (1 + (radius - 1)) * 5 / 3