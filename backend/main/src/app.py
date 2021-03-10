from fastapi import FastAPI
from backend.main.src.routers import user_router, meeting_router
from backend.connect_to_mongodb import connect_to_mongodb
import uvicorn
from backend.main.db.docs.auth_doc import AuthDocument
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from backend.auth.dependencies import Token, create_access_token, authenticate_user, ACCESS_TOKEN_EXPIRE_MIN
from datetime import timedelta


app = FastAPI()


app.include_router(user_router.router, prefix=f"/user_router", tags=["Users"])
app.include_router(meeting_router.router, prefix=f"/meetings_router", tags=["Meetings"])


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # OAuth2PasswordRequestForm does not have an email field, only username
    # TODO: this flow of execution could be cleaned up
    user = AuthDocument.objects(email=form_data.username)[0]
    if user:
        user = authenticate_user(user, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MIN)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

if __name__ == "__main__":
    connect_to_mongodb()
    uvicorn.run(app, host="0.0.0.0", port=9000)
