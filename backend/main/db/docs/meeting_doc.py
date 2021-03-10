from backend.main.db.models.meeting_model import MeetingModel
from mongoengine import (
    Document,
    StringField,
    ListField,
    DateField,
    DateTimeField,
    QuerySet,
)


class MeetingQuerySet(QuerySet):
    pass


def document(model: MeetingModel):
    doc = MeetingDocument(**model.dict())
    return doc


class MeetingDocument(Document):
    _model = MeetingModel

    meeting_date = DateField(required=True)
    meeting_time = DateTimeField(required=True)
    zoom_link = StringField(required=True)
    topic = StringField(required=True)
    session_level = StringField(required=True)
    miro_link = StringField(required=True)
    meeting_password = StringField(required=True)
    students = ListField(required=False)

    meta = {
        "query_class": MeetingQuerySet,
        "db_alias": "meeting-db",
        "indexes": ["topic"],
    }

    def dict(self):
        return {
            "meeting_date": self.meeting_date,
            "meeting_time": self.meeting_time,
            "zoom_link": self.zoom_link,
            "topic": self.topic,
            "session_level": self.session_level,
            "meeting_password": self.meeting_password,
            "students": self.students,
        }
