from fastapi import APIRouter
from backend.main.db.models.meeting_model import MeetingModel
from backend.main.db.docs.meeting_doc import document
from backend.db.password_generator import generate_random_password

router = APIRouter()


@router.post("/add_meeting")
async def add_meeting(meeting: MeetingModel):
    password = generate_random_password()
    meeting.meeting_password = password
    meeting.attendees = []
    doc = {}
    try:
        doc = document(meeting)
        doc.save()
    except:
        print("could not save new meeting")
    return doc.dict()


@router.post("/add_attendee/{user_id}")
async def add_attendee(meeting_id: str, user_id: str):
    # find user in the database. if notfound return error.
    # find the meeting if there is not one then return error.
    return {"details": "User added to meeting list"}
