from fastapi import FastAPI
from src.user.routes import router as user_router
from src.auth.routes import router as auth_router

app = FastAPI()

app.include_router(user_router)
app.include_router(auth_router)
