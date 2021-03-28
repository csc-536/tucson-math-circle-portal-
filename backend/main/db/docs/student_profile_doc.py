from mongoengine import (
    Document,
    ListField,
    EmailField,
    QuerySet,
    UUIDField,
    ReferenceField,
)

from backend.main.db.models.student_profile_model import (
    StudentProfileModel,
)

from backend.main.db.docs.student_docs import StudentDocument


class StudentProfileQuerySet(QuerySet):
    pass


def document(model: StudentProfileModel):
    print("------------------")
    print("StudentProfileModel.dict():", model.dict())
    print("------------------")
    doc = StudentProfileDocument(**model.dict())
    return doc


class StudentProfileDocument(Document):
    _model = StudentProfileModel

    uuid = UUIDField(required=True)
    email = EmailField(required=True)
    students = ListField(ReferenceField(StudentDocument))
    guardians = ListField(required=True)

    meta = {
        "query_class": StudentProfileQuerySet,
        "db_alias": "student-db",
        "indexes": ["email", "uuid"],
    }

    def dict(self):
        return {
            "uuid": self.uuid,
            "email": self.email,
            "student_list": self.students,
            "guardians": self.guardians,
        }
