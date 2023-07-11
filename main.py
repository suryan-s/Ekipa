import os.path
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR

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

app.mount(
    "/", StaticFiles(directory="./frontend/dist", html=True)
)


@app.on_event("startup")
async def startup():
    """
    Performs startup tasks.

    This function is executed when the application starts up. It calls the `create_tables` function
    to create necessary database tables.
    """
    if os.path.exists(os.path.join("backend", "database", "ekipa.db")):
        pass
    else:
        sqlite3.connect(os.path.join("backend", "database", "ekipa.db"))
    await create_tables()


@app.get("/")
async def read_index():
    """
    Redirects to the static folder.
    Returns:
    """
    try:
        return RedirectResponse(url="/")
    except Exception as error:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error"
        ) from error


# Path: main.py
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", reload=True)