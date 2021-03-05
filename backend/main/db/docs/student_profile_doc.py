from backend.main.db.models.student_profile_model import StudentProfileModel
from mongoengine import Document, StringField, ListField, EmailField, QuerySet
from backend.main.db.models.student_profile_model import SecurityContact


class StudentProfileQuerySet(QuerySet):
    pass


def document(model: StudentProfileModel, security_contacts: list[SecurityContact]):
    security_contact_list = []
    for contact in security_contacts:
        security_contact_list.append(contact.dict())
    doc = StudentProfileDocument(
        **model.dict(), security_contact_list=security_contact_list
    )
    return doc


class StudentProfileDocument(Document):
    _model = StudentProfileModel

    first_name = StringField(required=True)
    last_name = StringField(required=True)
    phone_number = StringField(required=True)
    security_contact_list = ListField(required=True)
    email = EmailField(required=True)

    meta = {
        "query_class": StudentProfileQuerySet,
        "db_alias": "student-db",
        "indexes": ["email"],
    }

    def dict(self):
        return {
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "security_contact_list": self.security_contact_list,
        }
