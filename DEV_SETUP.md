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

### Python setup
1. Run `pip install pipenv`
2. In directory with `Pipfile` run `pipenv install --dev`
3. Run `pipenv shell` to enter virtualenv
