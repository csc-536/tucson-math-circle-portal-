from pydantic import BaseModel

from pydantic import Field, EmailStr, UUID4

from backend.main.db.mixins import IdMixin


class Guardian(BaseModel):
    first_name: str = Field()
    last_name: str = Field()
    phone_number: str = Field()
    email: EmailStr = Field()


class Student(BaseModel):
    first_name: str = Field()
    last_name: str = Field()
    grade: int = Field()
    age: str = Field()
    section: list = Field()


class StudentProfileModel(IdMixin):
    uuid: UUID4 = Field()
    email: EmailStr = Field()
