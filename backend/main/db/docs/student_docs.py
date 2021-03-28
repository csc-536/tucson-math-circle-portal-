from mongoengine import Document, ListField, QuerySet, StringField, IntField, UUIDField

# TODO: What does QuerySet do?

from backend.main.db.models.student_models import (
    StudentModel,
)


def document(model: StudentModel):
    print("------------------")
    print("Student.dict():", model.dict())
    print("------------------")
    doc = StudentDocument(**model.dict())
    return doc


class StudentDocument(Document):
    _model = StudentModel

    profile_uuid = UUIDField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    grade = StringField(required=True)
    age = IntField(required=True)
    meetings_registered = ListField(required=True)
    meeting_counts = ListField(required=True)

    meta = {
        "db_alias": "student-db",
        "indexes": ["email", "uuid"],
    }

    def dict(self):
        return {
            "profile_uuid": self.profile_uuid,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "grade": self.grade,
            "age": self.age,
            "meetings_registered": self.meetings_registered,
            "meeting_counts": self.meeting_counts,
        }

