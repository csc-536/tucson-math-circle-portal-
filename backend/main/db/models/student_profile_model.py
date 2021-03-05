from typing import Optional
from pydantic import BaseModel

from pydantic import Field, EmailStr

from backend.main.db.mixins import IdMixin


class SecurityContact(BaseModel):
    security_contact_name: str = Field()
    security_contact_number: str = Field()
    security_contact_email: EmailStr = Field()


class StudentProfileModel(IdMixin):
    email: EmailStr = Field()
    phone_number: Optional[str] = Field()
    first_name: str = Field()
    last_name: str = Field()
