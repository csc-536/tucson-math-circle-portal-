from fastapi import Depends, APIRouter, HTTPException, status

# main db imports
from backend.main.db.models.student_profile_model import (
    StudentProfileModel,
    StudentProfileCreateModel,
    StudentProfileUpdateModel,
)
from backend.main.db.models.student_models import (
    StudentModel,
    StudentUpdateModel,
)
from backend.main.db.docs.student_doc import (
    document as StudentDoc,
    StudentDocument,
)
from backend.main.db.docs.student_profile_doc import (
    document as ProfileDoc,
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


def get_student_meeting_index(meeting_doc, first, last):
    i = 0
    while i < len(meeting_doc.students):
        if (
            meeting_doc.students[i].first_name == first
            and meeting_doc.students[i].last_name == last
        ):
            return i
        i += 1
    return i


def remove_student_from_meeting(meeting_doc, student_id):
    # TODO: Update StudentDocument meeting info to reflect changes!
    index = -1
    for i, registration in enumerate(meeting_doc.students):
        if registration["student_id"] == student_id:
            index = i
            break

    del meeting_doc.students[index]
    meeting_doc.save()


def update_student_document(student_doc: StudentDocument, updates: StudentUpdateModel):
    student_doc.first_name = updates.first_name
    student_doc.last_name = updates.last_name
    student_doc.grade = updates.grade
    student_doc.age = updates.age
    student_doc.save()


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
    # raise exception if profile already exists
    existing_user = get_current_user_doc(token_data)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A Profile for that account already exists",
        )

    profile_uuid = token_data.id
    # create StudentModels for each student in the student profile
    student_models = []
    for student_create in profile.students:
        student = StudentModel(**student_create.dict(), profile_uuid=profile_uuid)
        student_models.append(student)

    student_profile = StudentProfileModel(
        uuid=token_data.id,
        email=profile.email,
        students=student_models,
        guardians=profile.guardians,
        mailing_lists=profile.mailing_lists,
    )

    # ProfileDoc handles creating StudentDocuments and saving them
    doc = ProfileDoc(student_profile)
    doc.save()
    return doc.dict()


@router.post("/get_meetings")
async def get_meetings_by_filter(
    search: MeetingSearchModel, token_data: TokenData = Depends(get_student_token_data)
):
    current_user = get_current_user_doc(token_data)
    if not current_user:
        print("This account has no profile!")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account has no profile",
        )
    current_students = current_user.students
    student_ids = [str(s.id) for s in current_students]

    # keep track of registrations for students from this profile
    # this is a dict so it is easier to use with the registration seach
    meeting_registrations = {}
    for i, st in enumerate(current_students):
        meeting_registrations[str(st.id)] = {
            "id": str(st.id),
            "first_name": st.first_name,
            "last_name": st.last_name,
            "registered": False,
        }

    # TODO: Use the dates field from MeetingSearchModel
    meetings = []
    try:
        for level in search.session_levels:
            for meeting in MeetingDocument.objects(session_level=level):
                for registration in meeting.students:
                    reg_id = registration["student_id"]
                    if reg_id in student_ids:
                        meeting_registrations[reg_id]["registered"] = True

                meeting_info = meeting.student_dict()
                meeting_info["registrations"] = [
                    meeting_registrations[sid] for sid in meeting_registrations.keys()
                ]
                meetings.append(meeting_info)
    except Exception as e:
        print("Exception type:", type(e))
        return {"details": "Problem in get_meetings_by_filter"}
    return meetings


@router.post("/update_student_for_meeting")
async def update_student(
    registration: StudentMeetingRegistration,
    token_data: TokenData = Depends(get_student_token_data),
):

    current_user = get_current_user_doc(token_data)
    # FIXME: This assumes that the student id given in `registration`
    # is a valid student id for this account
    try:
        student = StudentDocument.objects(id=registration.student_id)[0]
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid student id",
        )

    try:
        meeting_doc = MeetingDocument.objects(uuid=registration.meeting_id)[0]
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid meeting id",
        )

    if not registration.registered:
        # TODO: Update StudentDocument meeting info to reflect changes!
        remove_student_from_meeting(meeting_doc, registration.student_id)
        return {
            "details": f"Student with id {registration.student_id} removed from meeting list"
        }

    student_info = StudentMeetingInfo(
        student_id=registration.student_id,
        email=current_user.email,
        guardians=current_user.guardians,
        account_uuid=token_data.id,
    )
    meeting_doc.students.append(student_info.dict())
    meeting_doc.save()

    # Update StudentDocument
    student.meetings_registered[str(registration.meeting_id)] = True
    student.save()
    return {
        "details": f"Student with id {registration.student_id} added to meeting list"
    }


# PUT routes
@router.put("/update_profile")
async def update_profile(
    new_profile: StudentProfileUpdateModel,
    token_data: TokenData = Depends(get_student_token_data),
):
    current_user = get_current_user_doc(token_data)
    current_user.email = new_profile.email
    current_user.guardians = [g.dict() for g in new_profile.guardians]
    current_user.mailing_lists = new_profile.mailing_lists
    # update StudentDocuments
    # `new_profile.students` is a `List[StudentUpdateModel]`
    for student_update in new_profile.students:
        # add a new student if id is None
        if not student_update.id:
            new_student = StudentModel(**student_update.dict(), profile_uuid=current_user.id)
            student_document = StudentDoc(new_student)
            student_document.save()
            current_user.students.append(student_document)

        else:
            query = StudentDocument.objects(id=student_update.id)
            # if the student already existed update it
            if len(query) > 0:
                student_doc = query[0]
                update_student_document(student_doc, student_update)
            # otherwise we need to create a new student
            else:
                print("ERROR: could not find student id in update_profile")

    # current_user["students"] = [s.dict() for s in new_profile.students]
    current_user.save()
    return current_user.dict()
