import os.path
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

from backend import app
from backend.database.master import create_tables

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TODO -
# 1. Sign in / Sign up page
# 2. User profile page
# 3. User settings page
# 4. Team dashboard page


@app.on_event("startup")
async def startup():
    """
    Performs startup tasks.

    This function is executed when the application starts up. It calls the `create_tables` function
    to create necessary database tables.

    Args:
        None

    Returns:
        None
    """
    if os.path.exists(os.path.join("backend", "database", "ekipa.db")):
        pass
    else:
        sqlite3.connect(os.path.join("backend", "database", "ekipa.db"))
    await create_tables()


@app.get("/")
async def root():
    """
    Returns a simple message.
    Returns:None
    """
    return {"message": "Hello World"}


# Path: main.py
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", reload=True)