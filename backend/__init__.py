"""
This is the backend package support for Ekipa
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS settings
origins = [
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

from backend.register import router as register_router
from backend.api import router as api_router
from backend.task import router as task_router

app.include_router(register_router, prefix="/register")
app.include_router(api_router, prefix="/api")
app.include_router(task_router, prefix="/task")