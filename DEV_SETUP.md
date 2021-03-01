### Git Setup 
You can follow this guide to prevent ever accidentally pushing onto the main repository branch

1. Fork the csc-536/tucson-math-circle-portal repository
2. Run `git clone https://github.com/YOUR_USERNAME/tucson-math-circle-portal` 
3. Run `git remote add -f upstream https://github.com/csc-536/tucson-math-circle-portal`
4. Run `git remote set-url --push upstream no_push` (this makes it so you cannot push to upstream)

### Basic git workflow
1. Run `git checkout main`
2. Run `git pull --ff-only upstream master` (updates your local copy from upstream repository)
3. Create branch and checkout
  - `git checkout -b new_branch_name`
4. Edit code and commit
5. Push changes to your copy of the repository
  - `git push origin new_branch_name`
6. On Github, make a pull request from you repository to the csc-536 repository

### Frontend setup
0. (Optional) install node manager like [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm)
1. Install `npm` version `14.15.5` 
  - can do `fnm use` or `nvm use` in the frontend directory if you installed those
2. Run `npm install` in frontend directory
3. Before committing run `npm lint` in the frontend directory

### Backend setup
0. **Important** you need to use Python 3's version of pip for the following commands. 
If `pip` defaults to the Python 2 version, make sure to use `pip3` as the command.
You can check which version of Python `pip` is using by running `pip --version`.
1. Run `pip install pipenv`. If you have permission errors instead do `pip install --user pipenv`.  **Replace `pip` with `pip3` if needed.**
2. In backend directory run `pipenv install --dev`
3. Run `pipenv shell` to enter virtualenv 
  - alternatively you can do `pipenv run $command` to run `$command$` in the virtualenv
4. Before committing
  - run `flake8 .` in backend directory and fix any thing it complains about
  - run `black .` in backend directory for formatting

#### Running Auth server (possible updates in the future)
1. Follow the above steps to install dependencies and enter the virtualenv with `pipenv shell`.
2. In backend directory run `uvicorn auth.main:app --reload`
3. By default, server runs at `127.0.0.1:8000`
4. To interact with a web interface (and see the routes etc) go to `127.0.0.1:8000/docs`
