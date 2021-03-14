from fastapi import Depends, APIRouter

# main db imports
from backend.main.db.docs.student_profile_doc import (
    StudentProfileDocument,
)
from backend.main.db.models.meeting_model import (
    CreateMeetingModel,
    MeetingSearchModel,
    MeetingModel,
)
from backend.main.db.docs.meeting_doc import (
    document as MeetingDoc,
    MeetingDocument,
)
from backend.main.db.password_generator import generate_random_password

# auth db imports
from backend.auth.dependencies import (
    TokenData,
    get_admin_token_data,
)

router = APIRouter()


# GET routes
@router.get("/get_student_profiles")
def get_student_profiles(token_data: TokenData = Depends(get_admin_token_data)):
    all_profiles = []
    for profile in StudentProfileDocument.objects():
        all_profiles.append(profile.dict())
    return all_profiles


# POST routes
@router.post("/get_meetings")
async def get_meetings_by_filter(
    search: MeetingSearchModel, token_data: TokenData = Depends(get_admin_token_data)
):
    # TODO: Use the dates field from MeetingSearchModel
    meetings = []
    try:
        for level in search.session_levels:
            for meeting in MeetingDocument.objects(session_level=level):
                meetings.append(meeting.admin_dict())
    except Exception:
        return {"details": "Error finding meeting"}
    return meetings


@router.post("/create_meeting")
async def create_meeting(create_meeting: CreateMeetingModel):
    password = generate_random_password()
    meeting = MeetingModel(**create_meeting.dict(), password=password, students=[])
    doc = MeetingDoc(meeting)
    doc.save()
    return doc.dict()
