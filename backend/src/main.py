from fastapi import FastAPI
from src.user.routes import router as user_router
from src.auth.routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(user_router)
app.include_router(auth_router)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Allow credentials (cookies, authorization headers)
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)