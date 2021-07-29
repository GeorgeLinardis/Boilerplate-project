# Steps for creating this project

Create an empty `.gitignore` file and add inside `node_modules` and every file that you wouldn't like to monitor
through git.

We are choosing to add `node_modules` inside the gitignore file because we don't want to include it our git repo.
Except from the fact that `node_modules` can always be recreated based on a `package.json` file just by typing `npm install` it also
has some other advantages like:
- Switching between branches is affected by repo size, by excluding `node_modules` we are reducing repo size
- Since we are not adding `node_modules` in our repo, we 'll need to record a list of our app's dependencies through `package.json` file, which can
  help us understand what's needed for our app.
- By submitting `node_modules` we are also submitting dev dependencies which should not be included in production.Why?
  Because dev dependencies are packages needed when we are developing our app e.g testing packages and are not needed on production level.

Now we need to initialize this project using `npm` so that we will be able to track in the future any dependencies used.

We can initialize it by just typing `npm init` and filling all the necessary information in every step.

What's next?

I tried to create a new file for each step I took so that I wouldn't end up creating a huge instructions file.So next steps would be: 
- [Dockerizing it](dockerizing.md)
- [Using docker-compose](adding-docker-compose.md)
