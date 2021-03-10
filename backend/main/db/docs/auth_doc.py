from backend.auth.db.models.users import User
from mongoengine import Document, ListField, EmailField, QuerySet, UUIDField, StringField, BooleanField
from backend.main.db.models.student_profile_model import SecurityContact, Student


class AuthQuerySet(QuerySet):
    pass


class AuthDocument(Document):
    _model = User

    id = UUIDField(required=True, primary_key=True)
    email = EmailField(required=True)
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    hashed_password = StringField(required=True)
    disabled = BooleanField(required=True)

    meta = {
        "query_class": AuthQuerySet,
        "db_alias": "user-db",
        "indexes": ["email"],
    }

    def dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "hashed_password": self.hashed_password,
            "disabled": self.disabled
        }