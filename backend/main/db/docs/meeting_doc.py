from backend.main.db.models.meeting_model import MeetingModel
from mongoengine import (
    Document,
    StringField,
    ListField,
    DateTimeField,
    QuerySet,
    UUIDField,
)


class MeetingQuerySet(QuerySet):
    pass


def document(model: MeetingModel):
    doc = MeetingDocument(**model.dict())
    return doc


class MeetingDocument(Document):
    _model = MeetingModel

    uuid = UUIDField(required=True)
    date_and_time = DateTimeField(required=True)
    duration = DateTimeField(required=True)
    zoom_link = StringField(required=True)
    topic = StringField(required=True)
    session_level = StringField(required=True)
    miro_link = StringField(required=True)
    password = StringField(required=True)
    students = ListField(required=False)

    meta = {
        "query_class": MeetingQuerySet,
        "db_alias": "meeting-db",
        "indexes": ["session_level"],
    }

    def student_dict(self):
        return {
            "uuid": self.uuid,
            "date_and_time": self.date_and_time,
            "duration": self.duration,
            "zoom_link": self.zoom_link,
            "topic": self.topic,
            "session_level": self.session_level,
        }

    def admin_dict(self):
        return {
            "uuid": self.uuid,
            "date_and_time": self.date_and_time,
            "duration": self.duration,
            "zoom_link": self.zoom_link,
            "topic": self.topic,
            "session_level": self.session_level,
            "password": self.password,
            "students": self.students,
        }

    def dict(self):
        return {
            "uuid": self.uuid,
            "date_and_time": self.date_and_time,
            "duration": self.duration,
            "zoom_link": self.zoom_link,
            "topic": self.topic,
            "session_level": self.session_level,
            "password": self.password,
            "students": self.students,
        }
