from typing import Optional
from datetime import datetime, date
from pydantic import Field
from backend.main.db.mixins import IdMixin


class MeetingModel(IdMixin):

    meeting_date: date = Field()
    meeting_time: datetime = Field()
    zoom_link: str = Field()
    meeting_password: Optional[str] = Field()
    attendees: Optional[list] = Field()
