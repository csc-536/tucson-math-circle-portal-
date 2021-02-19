from fastapi import FastAPI
from backend.src.routers import user_router
import uvicorn

app = FastAPI()

app.include_router(user_router.router,
                   prefix=f'/user_router',
                   tags=['User Router'])

if __name__ == '__main__':
    # connect to mongo
    uvicorn.run(app, host="0.0.0.0", port=9000)
