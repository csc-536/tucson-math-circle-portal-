from mongoengine import (
    Document,
    QuerySet,
    StringField,
    IntField,
    UUIDField,
    DictField,
)


from backend.main.db.models.student_models import (
    StudentModel,
)


# TODO: What does QuerySet do?
class StudentQuerySet(QuerySet):
    pass


def document(model: StudentModel):
    doc = StudentDocument(**model.dict())
    return doc


class StudentDocument(Document):
    _model = StudentModel

    profile_uuid = UUIDField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    grade = StringField(required=True)
    age = IntField(required=True)
    # dictionary of the form (meeting uuid, attended (True/False))
    meetings_registered = DictField()
    meeting_counts = DictField(required=True)

    meta = {
        "db_alias": "student-db",
    }

    def dict(self):
        return {
            "id": str(self.id),
            "profile_uuid": self.profile_uuid,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "grade": self.grade,
            "age": self.age,
            "meetings_registered": self.meetings_registered,
            "meeting_counts": self.meeting_counts,
        }
