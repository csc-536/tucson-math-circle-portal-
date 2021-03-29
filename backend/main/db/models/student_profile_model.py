from typing import List

from pydantic import BaseModel, Field, EmailStr, UUID4
from enum import Enum


class SessionLevel(str, Enum):
    junior_a = "junior_a"
    junior_b = "junior_b"
    senior = "senior"


class Guardian(BaseModel):
    first_name: str = Field()
    last_name: str = Field()
    phone_number: str = Field()
    email: EmailStr = Field()


class Student(BaseModel):
    first_name: str = Field()
    last_name: str = Field()
    grade: int = Field()
    age: int = Field()
    section: List[SessionLevel] = Field()


# this is the model for the API since
# we will use the uuid from the token
# for the StudentProfileModel
class StudentProfileCreateModel(BaseModel):
    email: EmailStr = Field()
    students: List[Student]
    guardians: List[Guardian]


class StudentProfileModel(StudentProfileCreateModel):
    uuid: UUID4 = Field()
