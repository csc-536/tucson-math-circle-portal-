from typing import Optional
from pydantic import Field, EmailStr
from backend.db.mixins import IdMixin


class AdminModel(IdMixin):
    email: Optional[EmailStr] = Field()
    phone_number: Optional[str] = Field()
    username: str = Field()
    password: str = Field()
    admin_privileges: bool = Field()
    section_access: list = Field()
