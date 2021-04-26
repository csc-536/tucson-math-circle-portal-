# hack to add project directory to path and make modules work nicely
import sys
from pathlib import Path

PROJECTS_DIR = Path(__file__).resolve().parents[1]
print("Appending PROJECTS_DIR to PATH:", PROJECTS_DIR)
sys.path.append(str(PROJECTS_DIR))
# end hack

import toml
import asyncio

from mongoengine import connect
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import BaseModel, EmailStr, Field
from backend.main.db.docs.meeting_doc import MeetingDocument
from typing import List
import datetime

# get the config file path
CONFIG_PATH = Path(__file__).resolve().parent.joinpath("auth/db-config.toml")
print("Using CONFIG_PATH:", CONFIG_PATH)

config = toml.load(str(CONFIG_PATH))

db_username = config["atlas-username"]
db_password = config["atlas-password"]
db_uri = config["connection-uri"]
meeting_db = config["meeting-db"]
student_db = config["student-db"]

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

email_username = config["email-username"]
email_password = config["email-password"]
admin_email = config["admin-email"]

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


async def send_reminders():
    print("Running")
    meetings = MeetingDocument.objects()
    curr_date = datetime.datetime.now().date()
    day_later = curr_date + datetime.timedelta(days=1)
    for meeting in meetings:
        if meeting.date_and_time.date() == day_later:
            meeting_time = meeting.date_and_time.strftime("%I:%M")
            meeting_date = meeting.date_and_time.date()
            meeting_end = meeting.date_and_time + datetime.timedelta(
                minutes=meeting.duration
            )
            meeting_end = meeting_end.strftime("%I:%M")
            body = (
                """
                    <html>
                        <body>
                        <h3>Please join us for the Tucson Math Circle meeting tomorrow!</h3>
                            <p>Please see below for the meeting information.</p>
                    """
                + f"<p>Date: {meeting_date}"
                + f"<br>Time: {meeting_time} -- {meeting_end}"
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
            await reminder_email(meeting, body)


async def reminder_email(meeting: MeetingDocument, body: str):
    receivers = []
    for student in meeting.students:
        receivers.append(student["email"])

    email = EmailSchema(
        receivers=receivers, subject="Tucson Math Circle Meeting Reminder", body=body
    )

    message = MessageSchema(
        subject=email.subject,
        recipients=email.receivers,  # List of recipients, as many as you can pass
        body=email.body,
        subtype="html",
    )

    fm = FastMail(conf)

    await fm.send_message(message)

    # return JSONResponse(status_code=200, content={"message": "email has been sent"})


if __name__ == "__main__":
    asyncio.run(send_reminders())
