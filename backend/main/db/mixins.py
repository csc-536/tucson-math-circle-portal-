from typing import Any, Optional

from pydantic import BaseModel, Field, validator


class IdMixin(BaseModel):
    id: Optional[Any] = Field()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.id == "None":
            self.id = None

    @validator("id")
    def validate_id(cls, id):
        return str(id)
