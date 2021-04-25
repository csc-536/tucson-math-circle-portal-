from mongoengine import connect
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import BaseModel, EmailStr, Field
from backend.main.db.docs.meeting_doc import MeetingDocument
from typing import List
import datetime


db_username = "dbtesting"
db_password = "9bsvzutjWZfjgaxE"
db_uri = "mongodb+srv://{username}:{password}@cluster0.wjvcq.mongodb.net/{database}?retryWrites=true&w=majority"
student_db = "student_db"
meeting_db = "meeting_db"

connect(
    alias="student-db",
    db=student_db,
    host=db_uri.format(username=db_username, password=db_password, database=student_db),
    uuidRepresentation="standard",
)
connect(
    alias="meeting-db",
    db=meeting_db,
    host=db_uri.format(username=db_username, password=db_password, database=meeting_db),
    uuidRepresentation="standard",
)

email_username = "admin@gmail.com"
email_password = "password"
admin_email = "admin@gmail.com"

conf = ConnectionConfig(
    MAIL_USERNAME=email_username,
    MAIL_PASSWORD=email_password,
    MAIL_FROM=admin_email,
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_TLS=True,
    MAIL_SSL=False,
)


class EmailSchema(BaseModel):
    receivers: List[EmailStr] = Field()
    subject: str = Field()
    body: str = Field()


def send_reminders():
    meetings = MeetingDocument.objects()
    curr_time = datetime.datetime.now()
    day_later = curr_time + datetime.timedelta(days=1)
    for meeting in meetings:
        if curr_time < meeting.date_and_time < day_later:
            body = (
                """
                    <html>
                        <body>
                            <p>This is a reminder that there is a meeting today that you are RSVP to.
                            <br>The following meeting information is provided below.</p>
                    """
                + f"<p>Date: {meeting.date_and_time.date}"
                + f"<br>Time: {meeting.date_and_time.time}-{meeting.duration.time}"
                + f"<br>Topic: {meeting.topic}"
                + f"<br>Zoom Link: {meeting.zoom_link}"
                + f"<br>Zoom Password: {meeting.password}"
                + f"<br>Miro Link: {meeting.miro_link}"
                + f"<br>Session Level: {meeting.session_level}</p>"
                + """
                        </body>
                    </html>
                    """
            )
            reminder_email(meeting, body)


def reminder_email(
    meeting: MeetingDocument, body: str
) -> JSONResponse:
    receivers = []
    for student in meeting.students:
        receivers.append(student.email)

    email = EmailSchema(receivers=receivers, subject="Meeting Reminder", body=body)

    message = MessageSchema(
        subject=email.subject,
        recipients=email.receivers,  # List of recipients, as many as you can pass
        body=email.body,
        subtype="html",
    )

    fm = FastMail(conf)

    fm.send_message(message)

    return JSONResponse(status_code=200, content={"message": "email has been sent"})


if __name__ == "__main__":
    send_reminders()
