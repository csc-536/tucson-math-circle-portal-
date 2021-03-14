from fastapi import Depends, APIRouter

# main db imports
from backend.main.db.models.student_profile_model import (
    StudentProfileModel,
    StudentProfileCreateModel,
)
from backend.main.db.docs.student_profile_doc import (
    document as StudentDoc,
    StudentProfileDocument,
)
from backend.main.db.models.meeting_model import (
    MeetingSearchModel,
    StudentMeetingRegistration,
    StudentMeetingInfo,
)
from backend.main.db.docs.meeting_doc import (
    MeetingDocument,
)


# auth db imports
from backend.auth.dependencies import (
    TokenData,
    get_student_token_data,
)

router = APIRouter()


def get_current_user_doc(token_data: TokenData):
    current_user = None
    try:
        current_user = StudentProfileDocument.objects(uuid=token_data.id)[0]
    # TODO: raise an HTTP exception instead of just returning details
    except Exception as e:
        print("Exception type:", type(e))
        print("Could not find the user profile.")
    return current_user


# GET routes
@router.get("/get_my_profile")
def get_current_user_profile(token_data: TokenData = Depends(get_student_token_data)):
    current_user = get_current_user_doc(token_data)
    return current_user.dict()


@router.get("/get_students")
def get_student_names(token_data: TokenData = Depends(get_student_token_data)):
    current_user = get_current_user_doc(token_data)
    return current_user["students"]


# POST routes
@router.post("/add_profile")
async def add_profile(
    profile: StudentProfileCreateModel,
    token_data: TokenData = Depends(get_student_token_data),
):
    model = StudentProfileModel(**profile.dict(), uuid=token_data.id)
    doc = StudentDoc(model)
    doc.save()
    return doc.dict()


@router.post("/get_meetings")
async def get_meetings_by_filter(
    search: MeetingSearchModel, token_data: TokenData = Depends(get_student_token_data)
):
    # TODO: Use the dates field from MeetingSearchModel
    meetings = []
    try:
        for level in search.session_levels:
            for meeting in MeetingDocument.objects(session_level=level):
                meetings.append(meeting.student_dict())
    # TODO: raise an HTTP exception instead of just returning details
    except Exception:
        return {"details": "Error finding meeting"}
    return meetings


@router.post("/register_for_meeting")
async def register_student(
    registration: StudentMeetingRegistration,
    token_data: TokenData = Depends(get_student_token_data),
):
    current_user = get_current_user_doc(token_data)
    try:
        meeting = MeetingDocument.objects(uuid=registration.meeting_id)[0]
    # TODO: raise an HTTP exception instead of just returning details
    except Exception:
        return {"details": "could not find meeting from meeting_id"}

    student_info = StudentMeetingInfo(
        first_name=registration.first_name,
        last_name=registration.last_name,
        email=current_user["email"],
        guardians=current_user["guardians"],
        account_uuid=token_data.id,
    )

    meeting.students.append(student_info.dict())
    meeting.save()
    return {
        "details": f"Student {student_info.first_name} {student_info.last_name} added to meeting list"
    }


# PUT routes
@router.put("/update_profile")
async def update_profile(
    new_profile: StudentProfileCreateModel,
    token_data: TokenData = Depends(get_student_token_data),
):
    current_user = get_current_user_doc(token_data)
    current_user["email"] = new_profile.email
    current_user["guardians"] = new_profile.guardians
    current_user["students"] = new_profile.students
    current_user.save()
    return current_user.dict()
