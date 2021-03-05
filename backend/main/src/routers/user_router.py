from fastapi import APIRouter
from backend.main.db.models.student_profile_model import StudentProfileModel
from backend.main.db.docs.student_profile_doc import (
    document as StudentDoc,
    StudentProfileDocument,
)
from backend.main.db.docs.admin_profile_doc import document as AdminDoc
from backend.main.db.models.admin_profile_model import AdminProfileModel
from backend.main.db.models.student_profile_model import SecurityContact

router = APIRouter()


@router.post("/add_student_profile")
async def add_student_profile(
    student_profile: StudentProfileModel, security_contacts: list[SecurityContact]
):
    doc = StudentDoc(student_profile, security_contacts)
    doc.save()
    return doc.dict()


@router.put("/update_student_profile")
async def update_student_profile(_id: str, student_profile: StudentProfileModel):
    user_doc = None
    try:
        user_doc = StudentProfileDocument.objects(id=_id)[0]
    except:
        print("Could not find the user.")
    if user_doc.email != student_profile.email:
        user_doc.email = student_profile.email
    if user_doc.phone_number != student_profile.phone_number:
        user_doc.phone_number = student_profile.phone_number
    user_doc.save()
    return user_doc.dict()


@router.put("/update_student_security")
async def update_student_security(_id: str, security_contacts: list[SecurityContact]):
    user_doc = None
    try:
        user_doc = StudentProfileDocument.objects(id=_id)[0]
    except:
        print("Could not find the user.")
    user_doc_contacts = set()
    for contact in user_doc.security_contact_list:
        user_doc_contacts.update(contact.security_contact_name)
    for contact in security_contacts:
        if user_doc_contacts.__contains__(contact.security_contact_name):
            contact.security_contact_email = updated_contacts["security_contact_email"]
            contact.security_contact_number = updated_contacts[
                "security_contact_number"
            ]
        else:
            user_doc.security_contact_list.append()
    user_doc.save()
    return user_doc.dict()


@router.post("/add_admin_profile")
async def add_user_profile(admin_profile: AdminProfileModel):
    doc = AdminDoc(admin_profile)
    doc.save()
    return doc.dict()
