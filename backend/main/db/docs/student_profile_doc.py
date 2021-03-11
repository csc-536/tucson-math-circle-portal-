from typing import List

from mongoengine import Document, ListField, EmailField, QuerySet, UUIDField

from backend.main.db.models.student_profile_model import (
    Guardian,
    Student,
    StudentProfileModel,
)


class StudentProfileQuerySet(QuerySet):
    pass


def document(
    model: StudentProfileModel,
    guardians: List[Guardian],
    students: List[Student],
):
    # REMARK: it seems like creating the list manually isnt needed
    # security_contact_list = []
    # for contact in security_contacts:
    #     security_contact_list.append(contact.dict())
    # student_list = []
    # for student in students:
    #     student_list.append(student.dict())
    doc = StudentProfileDocument(
        **model.dict(), guardians=guardians, student_list=students
    )
    return doc


# SUGGESTION: change student_list to students?
class StudentProfileDocument(Document):
    _model = StudentProfileModel

    uuid = UUIDField(required=True)
    email = EmailField(required=True)
    student_list = ListField(required=True)
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
            "student_list": self.student_list,
            "guardians": self.guardians,
        }
