"""
This is the backend package support for Ekipa
"""
from fastapi import FastAPI
from backend.register import router as register_router
from backend.user_op import router as user_router
from backend.task import router as task_router
from backend.chat import router as chat_router

app = FastAPI(
    title="Ekipa",
    description='Ekipa is a comprehensive team management and task allocation platform designed to streamline '
                'collaboration and enhance productivity within teams. With Ekipa, you can efficiently create'
                ' and manage teams, assign tasks, and track their progress, all in one centralized platform.',
    version="0.1.9",
    # docs_url="/",
    redoc_url=None
)


app.include_router(register_router, prefix="/register")
app.include_router(user_router, prefix="/user")
app.include_router(task_router, prefix="/task")
app.include_router(chat_router, prefix="/chat")