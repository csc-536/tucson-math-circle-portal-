from pydantic import BaseModel, EmailStr, Field
from backend.main.db.models.student_profile_model import StudentProfileModel
from backend.main.db.docs.student_profile_doc import document as StudentDoc, StudentProfileDocument
from backend.main.db.models.student_profile_model import SecurityContact, Student
from backend.auth.main import get_current_user
from backend.auth.db.models.users import UserCreate
from backend.main.db.docs.auth_doc import AuthDocument
from fastapi import Depends, APIRouter
from backend.auth.dependencies import TokenData, get_current_token_data, get_password_hash
from backend.auth.db.models.users import User, UserInDB
router = APIRouter()


class Email(BaseModel):
    new_email: EmailStr = Field()


def get_current_user_profile(token_data: TokenData = Depends(get_current_token_data)):
    user_doc = None
    try:
        user_doc = StudentProfileDocument.objects(id=token_data.id)[0]
    except:
        print("Could not find the user profile.")
    return user_doc


@router.post("/create_user")
async def create_user(user: UserCreate) -> User:

    hashed_password = get_password_hash(user.password)
    db_user = UserInDB(**user.dict(), hashed_password=hashed_password)

    print(db_user.dict())
    doc = AuthDocument(**db_user.dict())
    doc.save()
    return doc.dict()


@router.get("/get_my_profile")
def get_current_user_profile(token_data: TokenData = Depends(get_current_token_data)):
    user_doc = None
    try:
        user_doc = StudentProfileDocument.objects(id=token_data.id)[0]
    except:
        print("Could not find the user profile.")
    return user_doc.dict()


@router.post("/add_student_profile")
async def add_student_profile(
    security_contacts: list[SecurityContact],
    student_list: list[Student],
    current_user: User = Depends(get_current_user)
):
    model = StudentProfileModel(id=current_user.id, email=current_user.email)
    doc = StudentDoc(model, security_contacts, student_list)
    doc.save()
    return doc.dict()


@router.put("/update_student_profile")
async def update_main_email(email: Email, current_user: StudentProfileDocument = Depends(get_current_user_profile)):
    if current_user.email != email.new_email:
        current_user.email = email.new_email
    current_user.save()
    return current_user.dict()


@router.put("/update_student_guardian")
async def update_student_guardian(security_contact: SecurityContact,
                                  current_user: StudentProfileDocument = Depends(get_current_user_profile)):
    updated_contact = None
    for contact in current_user.guardian_contact_list:
        if contact.guardian_first_name == security_contact.guardian_first_name:
            updated_contact = contact

    if updated_contact is None:
        return {"details": "The contact could not be found."}

    updated_contact.guardian_email = security_contact.guardian_email
    updated_contact.guardian_phone_number = security_contact.guardian_phone_number

    current_user.save()
    return current_user.dict()


@router.put("/add_student_guardian")
async def add_student_guardian(security_contact: SecurityContact,
                               current_user: StudentProfileDocument = Depends(get_current_user_profile)):
    updated_contact = None
    for contact in current_user.guardian_contact_list:
        if contact.guardian_first_name == security_contact.guardian_first_name:
            updated_contact = contact

    if updated_contact is None:
        return {"details": "The contact is already in the list"}

    current_user.guardian_contact_list.append(security_contact.dict())
    current_user.save()
    return current_user.dict()


@router.put("/add_student")
async def add_student(student: Student,
                      current_user: StudentProfileDocument = Depends(get_current_user_profile)):
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
async def update_student(student: Student,
                         current_user: StudentProfileDocument = Depends(get_current_user_profile)):
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
