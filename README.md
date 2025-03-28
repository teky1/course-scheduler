# ScheduleTerp ([scheduleterp.com](https://scheduleterp.com))

A platform to build your UMD schedule using data from Testudo and PlanetTerp—complete with walking and biking times between classes, all in one smart interface.

ScheduleTerp scrapes the [Testudo Schedule of Classes](https://app.testudo.umd.edu/soc/) and interfaces with the [PlanetTerp API](https://planetterp.com/api/) to maintain up-to-date information on course/section data, seat information, professor ratings, and grade data which is all stored in MongoDB.

In order to calculate the travel time between different classes ScheduleTerp uses open-sourced map data from [OpenStreetMap](https://www.openstreetmap.org/) and calculates routes using the [Graphhopper](https://github.com/graphhopper/graphhopper) routing engine.

## Features
- ⚡ Dynamic indicators in the section list that show whether a section fits in your schedule (✅), intersects with another class (❌), or has a travel time conflict (⚠️) so you don't have to hover over every single one

- 🚶‍♂️🚴‍♀️ ScheduleTerp automatically calculates how long it takes to travel between classes—whether you're walking or biking—and flags any travel time conflicts

- ⏱️ Travel time conflicts appear directly on your schedule, showing both the time between classes and the travel time ScheduleTerp calculates you’ll need

- 👀 Key section information (ratings, GPA, low seat count) is 🟢dynamically🟡colored🔴 so you can analyze a section with a single glance

- 📊 GPA data by professor so you can choose which professor to take for a course not only by their ratings, but also by the average GPA students had with them in the past

- 🌈 Customizable section colors so you personalize your schedule

- 📅 Export schedules to your calendar (.ics file)

- 🔗 Share your schedule with your friends by link!

- 📱 Mobile-friendly user interface!
