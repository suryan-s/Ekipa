"""
This is the backend package support for Ekipa
"""
from fastapi import FastAPI

app = FastAPI()


from backend.register import router as register_router
from backend.api import router as api_router
from backend.task import router as task_router

app.include_router(register_router, prefix="/register")
app.include_router(api_router, prefix="/api")
app.include_router(task_router, prefix="/task")