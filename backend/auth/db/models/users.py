from typing import Optional

from uuid import uuid4
from pydantic import BaseModel, Field, EmailStr, UUID4, validator


class User(BaseModel):
    id: UUID4 = Field(default_factory=uuid4)
    email: Optional[EmailStr]
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    disabled: Optional[bool] = None


class UserCreate(User):
    password: str

    @validator("password")
    def valid_password(cls, v: str):
        if len(v) < 6:
            raise ValueError("Password should be at least 6 characters")
        return v


class UserInDB(User):
    hashed_password: str

    class Config:
        orm_mode = True
