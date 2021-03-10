from typing import Optional
from datetime import datetime, date
from pydantic import Field, BaseModel, EmailStr
from backend.main.db.mixins import IdMixin
from backend.main.db.models.student_profile_model import SecurityContact


class StudentMeetingInfo(BaseModel):
    first_name: str = Field()
    last_name: str = Field()
    email: EmailStr = Field()
    guardian: list[SecurityContact] = Field()


class MeetingModel(IdMixin):

    meeting_date: date = Field()
    meeting_time: datetime = Field()
    zoom_link: str = Field()
    session_level: str = Field()
    topic: str = Field()
    miro_link: str = Field()
    meeting_password: Optional[str] = Field()
    students: Optional[list] = Field()
