# Steps for creating this project
- Create a new empty folder which will be your project's folder

`mkdir my_project`

- Inside this folder initiate a new package.json file

`npm init`

- Start monitoring your changes with git

`git init`

- Create a git ignore file
  `touch .gitignore`
  Inside that file you can add any folders/files you don't want to include in your github repo.
  For example if you are using Webstorm IDE you will see a `.idea` folder
  created.You don't want every time this folder changes to include
  it in you repo, since probably these changes don't have anything to do with your work.

  Add any files/folders you don't want to watch inside the `.gitignore` file like:
```gitignore
# IDE folders
.idea
```

Now we need to initialize this project using `npm` so that we will be able to track in the future any dependencies used.

We can initialize it by just typing `npm init` and filling all the necessary information in every step.

What's next?

I tried to create a new file for each step I took so that I wouldn't end up creating a huge instructions file.So next steps would be: 
- [Dockerizing it](dockerizing.md)
- [Using docker-compose](adding-docker-compose.md)
- [Adding simple server with nodemon and es6](create-server-with-babel.md)
