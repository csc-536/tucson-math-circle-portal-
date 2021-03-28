from typing import List

from pydantic import BaseModel, Field, EmailStr, UUID4

from backend.main.db.mixins import SessionLevel, PydanticObjectId
from backend.main.db.models.student_models import StudentCreateModel, StudentModel


class Guardian(BaseModel):
    first_name: str = Field()
    last_name: str = Field()
    phone_number: str = Field()
    email: EmailStr = Field()


# this is the model for the API since
# we will use the uuid from the token
# for the StudentProfileModel
class StudentProfileCreateModel(BaseModel):
    email: EmailStr = Field()
    students: List[StudentCreateModel] = Field()
    guardians: List[Guardian] = Field()
    mailing_lists: List[SessionLevel] = Field()


class StudentProfileModel(BaseModel):
    uuid: UUID4 = Field()
    students: List[PydanticObjectId] = Field()
    guardians: List[Guardian] = Field()
    mailing_lists: List[SessionLevel] = Field()
