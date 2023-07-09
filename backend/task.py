from fastapi import APIRouter, Depends, HTTPException, Request
from starlette.status import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_200_OK

from backend.user_op import get_current_token
from backend.database.master import get_all_task, get_my_task
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
    task_list = await get_all_task()
    if isinstance(task_list, Exception):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from task_list
    if task_list is None or len(task_list) == 0:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="No tasks found",
        )
    result = []
    for task in task_list:
        result.append({
            "id": task[0],
            "title": task[1],
            "status": task[2],
            "label": task[3],
            "priority": task[4]
        })

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
    task_list = await get_my_task(user_id)
    if isinstance(task_list, Exception):
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        ) from task_list
    if task_list is None or len(task_list) == 0:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="No tasks found",
        )
    result = []
    return {"status": HTTP_200_OK, "message": "Tasks found", "data": task_list}


# @router.get('/taskAllocator')
# async def get_task_allocator(token: str = Depends(get_current_token)):
#     """
#     Returns all the tasks allocated by the user from the database.
#     Algorithm priority: 1. Skills of members
#     Args:
#         token:
#     """
#     user_id = await get_user_id_from_token(token)
#     if user_id is None:
#         raise HTTPException(
#             status_code=HTTP_401_UNAUTHORIZED,
#             detail="Invalid or missing authorization token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#
#
# @router.get('/putTask')
# async def put_task_api(request: Request, token: str = Depends(get_current_token)):
#     """
#     Insert new task into the database.
#     Args:
#         request:
#         token:
#     """
#     user_id = await get_user_id_from_token(token)
#     if user_id is None:
#         raise HTTPException(
#             status_code=HTTP_401_UNAUTHORIZED,
#             detail="Invalid or missing authorization token",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     incoming_data = await request.json()