from fastapi import Depends, APIRouter
from backend.main.src.routers.student import get_student_meeting_index

# main db imports
from backend.main.db.docs.student_profile_doc import (
    StudentProfileDocument,
)
from backend.main.db.models.meeting_model import (
    CreateMeetingModel,
    MeetingSearchModel,
    MeetingModel,
    StudentMeetingRegistration,
    UpdateMeeting,
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
    return doc.admin_dict()


@router.delete("/delete_meeting")
async def delete_meeting(update_meeting_model: UpdateMeeting):
    try:
        meeting_doc = MeetingDocument.objects(uuid=update_meeting_model.meeting_id)[0]
    except Exception:
        return "Could not find the meeting"
    meeting_doc.remove(meeting_doc)

# TODO: Update!
@router.put("/check_student_attended")
async def check_student_attended(
    registration: StudentMeetingRegistration,
):
    try:
        meeting_doc = MeetingDocument.objects(uuid=registration.meeting_id)[0]
    except Exception:
        return "Could not find the meeting"
    i = get_student_meeting_index(
        meeting_doc, registration.first_name, registration.last_name
    )

    if i == len(meeting_doc.students):
        return "That student is not on the RSVP list"
    if meeting_doc.students[i].attended:
        meeting_doc.students[i].attended = False
    else:
        meeting_doc.students[i].attended = True
    return {"details": "Updated student attendance"}


@router.put("/update_meeting")
async def update_meeting(update_meeting_model: UpdateMeeting):
    meeting_doc = None
    try:
        meeting_doc = MeetingDocument.objects(uuid=update_meeting_model.meeting_id)[0]
    except Exception:
        print("Could not find the meeting")
    meeting_doc.date_and_time = update_meeting_model.date_and_time
    meeting_doc.duration = update_meeting_model.duration
    meeting_doc.zoom_link = update_meeting_model.zoom_link
    meeting_doc.session_level = update_meeting_model.session_level
    meeting_doc.topic = update_meeting_model.topic
    meeting_doc.miro_link = update_meeting_model.miro_link
    meeting_doc.coordinator_notes = update_meeting_model.coordinator_notes
    meeting_doc.student_notes = update_meeting_model.student_notes
    meeting_doc.materials_link = update_meeting_model.materials_link
    meeting_doc.save()
    return meeting_doc.admin_dict()
