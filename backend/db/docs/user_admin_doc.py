from backend.db.models.user_admin_model import AdminModel
from mongoengine import Document, EmailField, StringField, ListField, BooleanField


class AdminDocument(Document):
    _model = AdminModel

    email = EmailField(required=False)
    phone_number = StringField(required=False)
    username = StringField(required=True)
    password = StringField(required=True)
    admin_privileges = BooleanField(required=True)
    section_access = ListField(required=True)

    meta = {
        'db_alias': 'admin-db'
    }
