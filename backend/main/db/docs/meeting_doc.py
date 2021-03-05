from backend.main.db.models.meeting_model import MeetingModel
from mongoengine import Document, StringField, ListField, DateField, DateTimeField


def document(model: MeetingModel):
    doc = MeetingDocument(**model.dict())
    return doc


class MeetingDocument(Document):
    _model = MeetingModel

    meeting_date = DateField(required=True)
    meeting_time = DateTimeField(required=True)
    zoom_link = StringField(required=True)
    meeting_password = StringField(required=True)
    attendees = ListField(required=True)

    meta = {"db_alias": "meeting-db"}

    def dict(self):
        return {
            "meeting_date": self.meeting_date,
            "meeting_time": self.meeting_time,
            "zoom_link": self.zoom_link,
            "meeting_password": self.meeting_password,
            "attendees": self.attendees,
        }
