from fastapi import APIRouter, Depends, HTTPException
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_200_OK

from backend.api import get_current_token
from backend.database.master import get_all_task
from backend.register import get_user_id_from_token

router = APIRouter()


@router.get('/allTaskList')
async def get_all_task_list(token: str = Depends(get_current_token)):
    """
    Returns all the tasks in the database.
    Args:
        token:
    """
    user_id = await get_user_id_from_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing authorization token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    result = await get_all_task()
    if isinstance(result, Exception):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from result
    if result is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="No tasks found",
        )
    return {"status": HTTP_200_OK, "message": "Tasks found", "data": result}


@router.get('/myTaskList')
async def get_my_task_list(token: str = Depends(get_current_token)):
    """
    Returns all the tasks done by the user from the database.
    Args:
        token:
    """
    user_id = await get_user_id_from_token(token)
    if user_id is None:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing authorization token",
            headers={"WWW-Authenticate": "Bearer"},
        )