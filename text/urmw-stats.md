### URMW Stats

URMW Stats is a website that aggregates match and player data from a competitive video game Discord sever into a clean web interface.
The server runs a Dockerized Spring Boot backend that serves the web page itself as well as a feature packed Discord bot for scraping data and assisting in administration.

The frontend of the website is a single-page application written in ReactJS capable of updating statistics in realtime without a page refresh. The frontend communicates with the server using a public, documented API suitable for 3rd party consumption.

The URMW Stats system has deep integration into Discord, including OAuth authentication for accessing a staff panel backed by MongoDB. Beyond that, URMW Stats is capable of providing statistical summaries in Discord, performing powerful message templating, backing up channels and recording audio.
