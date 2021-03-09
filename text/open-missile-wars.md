### OpenMissileWars

OpenMissileWars is a free and open source implementation of the popular [MissileWars Minecraft plugin](https://www.youtube.com/watch?v=wMCrEs1yW9w).
In it's persuit of accuracy, configurability and accessability, the complexity of the project has exploded.
Most notably, the OpenMissileWars project includes its own custom graphical launcher, an automated testing system which verifies the game's playability through bots, and advanced Java techniques that tweak the game's core mechanics. Think runtime bytecode rewritting.

I used the OpenMissileWars project as an opportunity to learn Travis CI and used it to create a strong CI/CD pipeline for the project.
Every change that gets checked in automatically causes a test server to spin up where custom bots will actually play the game to ensure the core mechanics work.
Then, if the change is checked into master, the continuous deployment pipeline automatically packages up the server and launcher into a new GitHub release.