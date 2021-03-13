from mongoengine import Document, ListField, EmailField, QuerySet, UUIDField

from backend.main.db.models.student_profile_model import (
    StudentProfileModel,
)


class StudentProfileQuerySet(QuerySet):
    pass


def document(model: StudentProfileModel):
    doc = StudentProfileDocument(**model.dict())
    return doc


class StudentProfileDocument(Document):
    _model = StudentProfileModel

    uuid = UUIDField(required=True)
    email = EmailField(required=True)
    students = ListField(required=True)
    guardians = ListField(required=True)

    # QUESTION: should we add uuid to indexes?
    meta = {
        "query_class": StudentProfileQuerySet,
        "db_alias": "student-db",
        "indexes": ["email"],
    }

    def dict(self):
        return {
            "uuid": self.uuid,
            "email": self.email,
            "student_list": self.students,
            "guardians": self.guardians,
        }
