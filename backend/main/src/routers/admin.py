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


@router.delete("/delete_meeting")
async def delete_meeting(meeting_uuid: str):
    try:
        meeting_doc = MeetingDocument.objects(uuid=meeting_uuid)[0]
    except Exception:
        return "Could not find the meeting"
    meeting_doc.remove(meeting_doc)


@router.put("/check_student_attended")
async def check_student_attended(
    meeting_uuid: str,
    student_first: str,
    student_last: str,
    update_meeting: CreateMeetingModel,
):
    try:
        meeting_doc = MeetingDocument.objects(uuid=meeting_uuid)[0]
    except Exception:
        return "Could not find the meeting"
    i = 0
    while i < len(meeting_doc.students):
        if (
            meeting_doc.students[i].first_name == student_first
            and meeting_doc.students[i].last_name == student_last
        ):
            break
        i += 1
    if i == len(meeting_doc.students):
        return "That student is not on the RSVP list"
    if meeting_doc.students[i].attended:
        meeting_doc.students[i].attended = False
    else:
        meeting_doc.students[i].attended = True
    return {"details": "Updated student attendance"}


@router.put("/update_meeting")
async def update_meeting(meeting_uuid: str, update_meeting: CreateMeetingModel):
    meeting_doc = None
    try:
        meeting_doc = MeetingDocument.objects(uuid=meeting_uuid)[0]
    except Exception:
        print("Could not find the meeting")
    meeting_doc.dat_and_time = update_meeting.date_and_time
    meeting_doc.duration = update_meeting.duration
    meeting_doc.zoom_link = update_meeting.zoom_link
    meeting_doc.session_level = update_meeting.session_level
    meeting_doc.topic = update_meeting.topic
    meeting_doc.miro_link = update_meeting.miro_link
    meeting_doc.save()
    return meeting_doc.admin_dict()
