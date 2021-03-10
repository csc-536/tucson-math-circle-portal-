from datetime import timedelta

import toml
import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

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
from backend.auth.db.main import connect_to_db, add_user, get_user_by_id, get_user_by_email
from backend.auth.db.models.users import User, UserInDB

# this is assuming app is run from `backend` directory
# config = toml.load(os.fspath("backend/auth/db-config.toml"))

username = "dbtesting"
password = "9bsvzutjWZfjgaxE"
uri = "mongodb+srv://{username}:{password}@cluster0.wjvcq.mongodb.net/{default_database}?retryWrites=true&w=majority"
default_database = "auth_db"

app = FastAPI()


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
    if user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user


@app.on_event("startup")
async def startup():
    connect_to_db(
        uri.format(
            username=username, password=password, default_database=default_database
        )
    )
    # await create_dummy_users()


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # OAuth2PasswordRequestForm does not have an email field, only username
    # TODO: this flow of execution could be cleaned up
    user = await get_user_by_email(form_data.username)
    if user:
        user = authenticate_user(user, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MIN)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
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
