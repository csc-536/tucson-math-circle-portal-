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
0. **Important** you need to use Python 3's version of pip for the following commands. To be safe, I have changed the commands to `pip3` instead of `pip`.  If you know `pip` is the Python 3 version, you can use `pip` instead of `pip3` and save one character!
(If you are interested, you can check which version of Python `pip` is using by running `pip --version`.)
1. Run `pip3 install pipenv`. If you have permission errors instead do `pip3 install --user pipenv`.
2. In backend directory run `pipenv install --dev`
3. Run `pipenv shell` in backend directory to enter virtualenv 
  - alternatively you can do `pipenv run $command` to run `$command` in the virtualenv
4. Before committing
  - In virtualenv, run `flake8 .` in backend directory and fix anything it complains about
  - In virtualenv, run `black .` in backend directory for formatting

### Backend running tests with code coverage
1. In virtualenv and in backend directory run `pytest --cov=dir tests/` where `dir` is either `auth`, `main` or `.`.  The `dir` controls what files are tracked for code coverage.

#### Running Auth server
- **New alternative method:** from `frontend` directory run `npm run auth`
1. Follow the above steps to install dependencies and enter the virtualenv with `pipenv shell`.
2. Run `python auth/main.py`
3. By default, server runs at `127.0.0.1:8000`
4. To interact with a web interface (and see the routes etc) go to `127.0.0.1:8000/docs`

#### Running Main server
- **New alternative method:** from `frontend` directory run `npm run main`
1. Follow the above steps to install dependencies and enter the virtualenv with `pipenv shell`.
2. Run `python main/src/app.py`
3. By default, server runs at `127.0.0.1:9000` 
4. To interact with a web interface (and see the routes etc) go to `127.0.0.1:9000/docs`
