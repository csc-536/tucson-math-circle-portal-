# hack to add project directory to path and make modules work nicely
import sys
from pathlib import Path

PROJECTS_DIR = Path(__file__).resolve().parents[2]
print("Appending PROJECTS_DIR to PATH:", PROJECTS_DIR)
sys.path.append(str(PROJECTS_DIR))

from datetime import timedelta

import toml
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.auth.dependencies import (
    Token,
    TokenData,
    create_access_token,
    get_current_token_data,
    get_password_hash,
    authenticate_user,
    create_user,
    ACCESS_TOKEN_EXPIRE_MIN,
)
from backend.auth.db.main import (
    connect_to_db,
    add_user,
    get_user_by_id,
    get_user_by_email,
)
from backend.auth.db.models.users import User, UserInDB, UserUpdate

# TODO: get project directory
# this is assuming app is run from `backend` directory
config = toml.load("auth/db-config.toml")

username = config["atlas-username"]
password = config["atlas-password"]
uri = config["connection-uri"]
auth_db = config["auth-db"]

app = FastAPI()

# TODO: make a list of origins, for now the server allows requests from everywhere
# possible a origin_regex could be used instead which matches anything that starts with
# localhost
# origin_regex = "https?://localhost
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def create_dummy_users():
    users = [
        {"email": "luna@google.com", "hashed_password": get_password_hash("luna")},
        {"email": "harley@google.com", "hashed_password": get_password_hash("harley")},
    ]
    for user in users:
        await add_user(UserInDB(**user))
        await add_user(UserInDB(**user))


async def get_current_user(token_data: TokenData = Depends(get_current_token_data)):
    user = await get_user_by_id(id=token_data.id)
    print('Role: ', token_data.role)
    if user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user


@app.on_event("startup")
async def startup():
    connect_to_db(uri.format(username=username, password=password, database=auth_db))
    # await create_dummy_users()


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # OAuth2PasswordRequestForm does not have an email field, only username
    user = await get_user_by_email(form_data.username)
    if user:
        user = authenticate_user(user, form_data.password)

    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MIN)
    access_token = create_access_token(
            data={"sub": str(user.id), "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@app.get("/users/me/item/")
async def read_own_items(current_user: User = Depends(get_current_user)):
    return [{"data": "junk", "owner": current_user.email}]


@app.post("/register")
async def register(user: User = Depends(create_user)):
    return user

# @app.put("/update")
# async def update_email_or_pass(current_user: User = Depends(get_current_user), 
#         updates: UserUpdate = Body(...)):
    

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

