from fastapi import APIRouter
from backend.db.models.user_admin_model import AdminModel
from backend.db.docs.user_admin_doc import AdminDocument

router = APIRouter()


@router.post("/add_user_admin")
async def add_admin_user(admin: AdminModel):
    doc = AdminDocument.Document(admin)
    doc.save()
    return doc.dict()
