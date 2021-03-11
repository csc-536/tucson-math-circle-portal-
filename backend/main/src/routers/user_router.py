from typing import List

from pydantic import BaseModel, EmailStr, Field
from fastapi import Depends, APIRouter

# main db imports
from backend.main.db.models.student_profile_model import StudentProfileModel
from backend.main.db.docs.student_profile_doc import (
    document as StudentDoc,
    StudentProfileDocument,
)
from backend.main.db.models.student_profile_model import Guardian, Student

# auth db imports
from backend.auth.dependencies import (
    TokenData,
    get_current_token_data,
)

router = APIRouter()


class Email(BaseModel):
    new_email: EmailStr = Field()


@router.get("/get_my_profile")
def get_current_user_profile(token_data: TokenData = Depends(get_current_token_data)):
    user_doc = None
    try:
        user_doc = StudentProfileDocument.objects(uuid=token_data.id)[0]
    except Exception as e:
        print("Exception type:", type(e))
        print("Could not find the user profile.")
    return user_doc.dict()


# SUGGESTION: change student_list to students?
@router.post("/add_student_profile")
async def add_student_profile(
    email: EmailStr,
    guardians: List[Guardian],
    student_list: List[Student],
    token_data: TokenData = Depends(get_current_token_data),
):
    model = StudentProfileModel(uuid=token_data.id, email=email)
    doc = StudentDoc(model, guardians, student_list)
    doc.save()
    return doc.dict()


@router.put("/update_student_profile")
async def update_main_email(
    email: Email,
    current_user: StudentProfileDocument = Depends(get_current_user_profile),
):
    if current_user.email != email.new_email:
        current_user.email = email.new_email
    current_user.save()
    return current_user.dict()


@router.put("/update_student_guardian")
async def update_student_guardian(
    guardian: Guardian,
    current_user: StudentProfileDocument = Depends(get_current_user_profile),
):
    updated_contact = None
    for contact in current_user.guardians:
        if contact.first_name == guardian.first_name:
            updated_contact = contact

    if updated_contact is None:
        return {"details": "The contact could not be found."}

    updated_contact.email = guardian.email
    updated_contact.phone_number = guardian.phone_number

    current_user.save()
    return current_user.dict()


@router.put("/add_student_guardian")
async def add_student_guardian(
    guardian: Guardian,
    current_user: StudentProfileDocument = Depends(get_current_user_profile),
):
    updated_contact = None
    for contact in current_user.guardians:
        if contact.first_name == guardian.first_name:
            updated_contact = contact

    if updated_contact is None:
        return {"details": "The contact is already in the list"}

    current_user.guardians.append(guardian.dict())
    current_user.save()
    return current_user.dict()


@router.put("/add_student")
async def add_student(
    student: Student,
    current_user: StudentProfileDocument = Depends(get_current_user_profile),
):
    add_student = None
    for add in current_user.student_list:
        if add.first_name == student.first_name:
            add_student = add

    if add_student is None:
        return {"details": "The student is already in the list"}

    current_user.student_list.append(student.dict())
    current_user.save()
    return current_user.dict()


@router.put("/update_student")
async def update_student(
    student: Student,
    current_user: StudentProfileDocument = Depends(get_current_user_profile),
):
    add_student = None
    for add in current_user.student_list:
        if add.first_name == student.first_name:
            add_student = add

    if add_student is None:
        return {"details": "The student could not be found"}

    add_student.grade = student.grade
    add_student.age = student.age
    add_student.section = student.section
    current_user.save()
    return current_user.dict()
