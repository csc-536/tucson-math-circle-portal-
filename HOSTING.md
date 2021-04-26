## Backend hosting
- Main server located at `https://tucson-math-circle-main.herokuapp.com`
- Auth server located at `https://tucson-math-circle-auth.herokuapp.com`
- Go to `/docs` if you would like to see FastAPI docs 

#### Initial backend setup for Heroku
- Use Multi-Procfile [buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile)
- Create two heroku apps: `heroku create -a tucson-math-circle-auth` and `heroku create -a tucson-math-circle-main`
- Add python buildpack: `heroku buildpack:add -a {app_name} heroku/python`
- Add multi-procfile buildpacks: `heroku buildpacks:add -a {app_name} heroku-community/multi-procfile`
- Set Procfile locations: `heroku config:set -a {app_name} PROCFILE={path/to/Procfile}`


#### Deploying updates
- `git push https://git.heroku.com/tucson-math-circle-auth HEAD:master`
- `git push https://git.heroku.com/tucson-math-circle-main HEAD:master`

