from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel, Field, validator
from bson.objectid import ObjectId


class SessionLevel(str, Enum):
    junior_a = "junior_a"
    junior_b = "junior_b"
    senior = "senior"


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not isinstance(v, ObjectId):
            raise TypeError("ObjectId required")
        return str(v)


class IdMixin(BaseModel):
    id: Optional[Any] = Field()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.id == "None":
            self.id = None

    @validator("id")
    def validate_id(cls, id):
        return str(id)
