from backend.main.db.models.student_profile_model import StudentProfileModel
from mongoengine import Document, ListField, EmailField, QuerySet, UUIDField
from backend.main.db.models.student_profile_model import SecurityContact, Student


class StudentProfileQuerySet(QuerySet):
    pass


def document(model: StudentProfileModel, security_contacts: list[SecurityContact], students: list[Student]):
    security_contact_list = []
    for contact in security_contacts:
        security_contact_list.append(contact.dict())
    student_list = []
    for student in students:
        student_list.append(student.dict())
    doc = StudentProfileDocument(
        **model.dict(), guardian_contact_list=security_contact_list, student_list=student_list
    )
    return doc


class StudentProfileDocument(Document):
    _model = StudentProfileModel

    id = UUIDField(required=True, primary_key=True)
    email = EmailField(required=True)
    student_list = ListField(required=True)
    guardian_contact_list = ListField(required=True)

    meta = {
        "query_class": StudentProfileQuerySet,
        "db_alias": "student-db",
        "indexes": ["email"],
    }

    def dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "student_list": self.student_list,
            "guardians": self.guardian_contact_list,
        }
