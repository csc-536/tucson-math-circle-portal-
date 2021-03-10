from datetime import datetime, timedelta
from typing import Optional

import toml
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, UUID4

from backend.auth.db.models.users import UserInDB, UserCreate, User

from backend.auth.db.main import get_user_by_email, add_user

# this is assuming the app is run from `backend` directory
# config = toml.load("backend/auth/db-config.toml")
SECRET_KEY = "9e9db18a0160cf4549453b4613e48fa21f537f015c6f50ddb0a7e2180debf383"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MIN = 30


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[UUID4]


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(user: UserInDB, password: str):
    if not verify_password(password, user.hashed_password):
        return False
    return user


async def create_user(user: UserCreate) -> User:
    existing_user = await get_user_by_email(user.email)

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )

    hashed_password = get_password_hash(user.password)
    db_user = UserInDB(**user.dict(), hashed_password=hashed_password)

    await add_user(db_user)
    return User(**user.dict())


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MIN)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_token_data(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        uuid = payload.get("sub")
        if uuid is None:
            raise credentials_exception
        token_data = TokenData(id=UUID4(uuid))
    except JWTError:
        raise credentials_exception

    return token_data
