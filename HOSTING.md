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

## Frontend hosting
- Located at `https://tucson-math-circle-frontend.herokuapp.com`

#### Initial frontend setup for Heroku
- Use Monorepo [buildpack](https://elements.heroku.com/buildpacks/lstoll/heroku-buildpack-monorepo)
- Create heroku app: `heroku create -a tucson-math-circle-frontend`
- Add monorepo buildpacks: `heroku buildpacks:add -a {app_name}  https://github.com/lstoll/heroku-buildpack-monorepo`
- Add node.js buildpack: `heroku buildpack:add -a {app_name} heroku/nodejs`
- Set APP_BASE location: `heroku config:set -a {app_name} APP_BASE={path/to/frontend}`

#### Deploying updates
- `git push https://git.heroku.com/tucson-math-circle-auth HEAD:master`
- `git push https://git.heroku.com/tucson-math-circle-main HEAD:master`
- `git push https://git.heroku.com/tucson-math-circle-frontend HEAD:master`

