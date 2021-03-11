from fastapi import APIRouter, Depends

from backend.main.db.docs.student_profile_doc import StudentProfileDocument
from backend.main.db.models.meeting_model import MeetingModel
from backend.main.db.docs.meeting_doc import MeetingDocument, document
from backend.main.db.password_generator import generate_random_password
from backend.main.src.routers.user_router import get_current_user_profile
from backend.main.db.models.meeting_model import StudentMeetingInfo

router = APIRouter()


@router.post("/add_meeting")
async def add_meeting(meeting: MeetingModel):
    password = generate_random_password()
    meeting.meeting_password = password
    meeting.students = []
    doc = document(meeting)
    doc.save()
    return doc.dict()

# get meeting by id
# get meeting by filters
# get all meetings


@router.post("/add_student")
async def add_student(
    meeting_id: str,
    student_name: str,
    current_user: StudentProfileDocument = Depends(get_current_user_profile),
):
    try:
        meeting = MeetingDocument.objects(id=meeting_id)[0]
    except Exception:
        return {"details": "could not find meeting form id"}

    add_student = None
    for add in current_user.student_list:
        if add.first_name == student_name:
            add_student = add

    if add_student is None:
        return {"details": "The student could not be found"}

    student = StudentMeetingInfo(
        first_name=add_student.first_name,
        last_name=add_student.last_name,
        email=current_user.email,
        guardians=current_user.guardian_contact_list,
    )
    meeting.students.append(student)
    meeting.save()
    return {"details": "Student added to meeting list"}
